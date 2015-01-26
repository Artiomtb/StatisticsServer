package model;

import items.*;
import model.QueryParameter.ParameterType;
import org.apache.log4j.Logger;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

public class DatabaseHandler {

    private static final String JNDI = "java:jboss/datasources/PostgreSQLDS";
    private final Logger log = Logger.getLogger("DatabaseHandler.class");
    private static InitialContext context;
    private static DataSource dataSource;
    private Connection conn;
    private static DatabaseHandler databaseHandler;
    private static final int PUBS_PER_PAGE = 20;
    private static final int STUDENTS_PER_PAGE = 20;
    private static final int DAYS_TO_PUB_TREND = 20;
    private static final int DAYS_TO_PUB_MATERIAL_TREND = 5;
    private static final int DAYS_TO_PUB_STUDENT_TREND = 10;
    private static final int DAYS_TO_PUB_NODE_STUDENT_TREND = 12;
    private static final String PUBS_QUERY = "SELECT DISTINCT pt.pub_id, pt.title FROM attendence a, pub_to_title pt where a.pub_id = pt.pub_id LIMIT " + PUBS_PER_PAGE + " OFFSET ?";
    private static final String STUDENTS_QUERY = "SELECT party_id, title FROM party_to_title LIMIT " + STUDENTS_PER_PAGE + "OFFSET ?";
    private static final String PUB_BY_ID_QUERY = "SELECT pub_id, title FROM pub_to_title WHERE pub_id = ?";
    private static final String MATERIALS_BY_PUB_ID_QUERY = "SELECT nt.node_id, nt.title, n.attendance\n" +
            "FROM (SELECT node_id, sum(floor(extract(EPOCH FROM (updated_at - created_at)) / 60)) AS attendance\n" +
            "      FROM attendence\n" +
            "      WHERE pub_id = ?\n" +
            "      GROUP BY node_id) n, node_to_title nt\n" +
            "WHERE n.node_id = nt.node_id";
    private static final String STUDENTS_TREND_BY_PUB_ID_QUERY = "SELECT pt.party_id, pt.title, p.attendance\n" +
            "FROM (SELECT party_id, sum(floor(extract(EPOCH FROM (updated_at - created_at)) / 60)) AS attendance\n" +
            "      FROM attendence\n" +
            "      WHERE pub_id = ?\n" +
            "      GROUP BY party_id) p, party_to_title pt\n" +
            "WHERE p.party_id = pt.party_id";
    private static final String TREND_BY_PUB_ID_QUERY = "SELECT *\n" +
            "FROM (\n" +
            "  SELECT\n" +
            "  DATE (updated_at) AS upd,\n" +
            "  sum(floor(extract(EPOCH FROM (updated_at - created_at)) / 60)) AS attendance\n" +
            "  FROM attendence\n" +
            "  WHERE pub_id = ?\n" +
            "  GROUP BY DATE(updated_at)\n" +
            "  ORDER BY DATE(updated_at) DESC\n" +
            "  LIMIT " + DAYS_TO_PUB_TREND + ") trend\n" +
            "ORDER BY trend.upd";
    private static final String STUDENT_BY_ID_QUERY = "SELECT party_id, title FROM party_to_title WHERE party_id = ?";
    private static final String PUBS_BY_ST_ID_QUERY = "SELECT DISTINCT pt.pub_id, pt.title FROM attendence a, pub_to_title pt WHERE a.party_id = ? AND a.pub_id = pt.pub_id";
    private static final String NODES_BY_PUB_ID_QUERY = "SELECT DISTINCT nt.node_id, nt.title FROM attendence a, node_to_title nt WHERE pub_id = ? AND a.node_id = nt.node_id ORDER BY node_id";
    private static final String TREND_BY_PUB_ID_AND_NODE_ID_QUERY = "SELECT *\n" +
            "FROM\n" +
            "  (SELECT\n" +
            "   DATE (updated_at) AS upd,\n" +
            "  sum(floor(extract(EPOCH FROM (updated_at - created_at)) / 60)) AS attendance\n" +
            "   FROM attendence\n" +
            "   WHERE pub_id = ?\n" +
            "   AND node_id = ?\n" +
            "   GROUP BY DATE(updated_at)\n" +
            "   ORDER BY DATE(updated_at) DESC\n" +
            "   LIMIT " + DAYS_TO_PUB_MATERIAL_TREND + ") trend\n" +
            "ORDER BY trend.upd";
    private static final String TREND_BY_PUB_ID_AND_STUDENT_QUERY = "SELECT *\n" +
            "FROM (\n" +
            "  SELECT\n" +
            "  DATE (updated_at) AS upd,\n" +
            "  sum(floor(extract(EPOCH FROM (updated_at - created_at)) / 60)) AS attendance\n" +
            "  FROM attendence\n" +
            "  WHERE party_id = ? AND pub_id = ?\n" +
            "  GROUP BY DATE(updated_at)\n" +
            "  ORDER BY DATE(updated_at) DESC\n" +
            "  LIMIT " + DAYS_TO_PUB_STUDENT_TREND + ") trend\n" +
            "ORDER BY trend.upd";
    private static final String NODE_TOTAL_BY_PUB_ID_AND_STUDENT_QUERY = "SELECT\n" +
            "  nt.node_id,\n" +
            "  nt.title,\n" +
            "  nodes.attendance\n" +
            "FROM (\n" +
            "       SELECT\n" +
            "         node_id,\n" +
            "         sum(floor(extract(EPOCH FROM (updated_at - created_at)) / 60)) AS attendance\n" +
            "       FROM attendence\n" +
            "       WHERE party_id = ? AND pub_id = ?\n" +
            "       GROUP BY node_id) nodes, node_to_title nt\n" +
            "WHERE nodes.node_id = nt.node_id";
    private static final String TREND_BY_PUB_ID_AND_NODE_ID_AND_STUDENT_QUERY = "SELECT *\n" +
            "FROM (SELECT\n" +
            "      DATE (updated_at) AS upd,\n" +
            "sum(floor(extract(EPOCH FROM (updated_at - created_at)) / 60)) AS attendance\n" +
            "      FROM attendence\n" +
            "      WHERE party_id = ? AND pub_id = ? AND node_id = ?\n" +
            "      GROUP BY DATE(updated_at)\n" +
            "      ORDER BY DATE(updated_at) DESC\n" +
            "      LIMIT " + DAYS_TO_PUB_NODE_STUDENT_TREND + ") trend\n" +
            "ORDER BY trend.upd";
    private static final String NODES_SUBSCRIBE_LINK_IN_PUB_QUERY = "SELECT DISTINCT\n" +
            "  link.node_a,\n" +
            "  num_a.num - 1 as num_a,\n" +
            "  link.node_b,\n" +
            "  num_b.num - 1 as num_b\n" +
            "FROM (\n" +
            "       SELECT\n" +
            "         y.node_id AS node_a,\n" +
            "         t.node_id AS node_b\n" +
            "       FROM\n" +
            "         (SELECT\n" +
            "            row_number()\n" +
            "            OVER (\n" +
            "              ORDER BY created_at DESC) num,\n" +
            "            a.*\n" +
            "          FROM attendence a\n" +
            "          WHERE pub_id = ?\n" +
            "          ORDER BY created_at DESC) t,\n" +
            "         (SELECT\n" +
            "            row_number()\n" +
            "            OVER (\n" +
            "              ORDER BY created_at DESC) - 1 num,\n" +
            "            a.*\n" +
            "          FROM attendence a\n" +
            "          WHERE pub_id = ?\n" +
            "          ORDER BY created_at DESC) y\n" +
            "       WHERE y.num = t.num AND y.node_id != t.node_id AND y.party_id = t.party_id AND\n" +
            "             floor(extract(EPOCH FROM (t.created_at - y.updated_at)) / 60) < ?) link,\n" +
            "  (SELECT\n" +
            "     row_number()\n" +
            "     OVER (\n" +
            "       ORDER BY node_id) num,\n" +
            "     node_id\n" +
            "   FROM (SELECT DISTINCT\n" +
            "           nt.node_id,\n" +
            "           nt.title\n" +
            "         FROM attendence a, node_to_title nt\n" +
            "         WHERE pub_id = ? AND a.node_id = nt.node_id\n" +
            "         ORDER BY node_id) a) num_a,\n" +
            "  (SELECT\n" +
            "     row_number()\n" +
            "     OVER (\n" +
            "       ORDER BY node_id) num,\n" +
            "     node_id\n" +
            "   FROM (SELECT DISTINCT\n" +
            "           nt.node_id,\n" +
            "           nt.title\n" +
            "         FROM attendence a, node_to_title nt\n" +
            "         WHERE pub_id = ? AND a.node_id = nt.node_id\n" +
            "         ORDER BY node_id) a) num_b\n" +
            "WHERE link.node_a = num_a.node_id AND link.node_b = num_b.node_id\n" +
            "ORDER BY num_a, num_b";
    private static final String PUB_PAGES_QUERY = "SELECT ceil(count(DISTINCT pt.pub_id) :: DOUBLE PRECISION / " + PUBS_PER_PAGE + ") AS pages\n" +
            "FROM attendence a, pub_to_title pt\n" +
            "WHERE a.pub_id = pt.pub_id";
    private static final String STUDENT_PAGES_QUERY = "SELECT ceil(count(party_id) :: DOUBLE PRECISION / " + STUDENTS_PER_PAGE + ")\n" +
            "FROM party_to_title";


    private DatabaseHandler() {
        try {
            context = new InitialContext();
            dataSource = (DataSource) this.context.lookup(JNDI);
            databaseHandler = this;
            log.info("Created DatabaseHandler");
        } catch (NamingException e) {
            log.error(e);
        }
    }

    public static DatabaseHandler initialize() {
        if (databaseHandler == null) return new DatabaseHandler();
        else return databaseHandler;
    }

    private boolean connect() throws SQLException {
        log.info("Trying to connect to datasource...");
        this.conn = dataSource.getConnection();
        log.info("Set connection success");
        return conn != null;
    }

    private void disconnect() throws SQLException {
        if (conn != null) {
            conn.close();
            conn = null;
            log.info("Connection closed");
        }
    }

    public Pubs getPubs(final int page) {
        log.info("Trying to get nodes from page " + page);
        Pubs pubs = new Pubs();
        ConnectionsHandler connectionsHandler = null;
        ConnectionsHandler connectionsHandlerPages = null;
        Collection<Pub> pubsCollection = new ArrayList<Pub>();
        int totalPages = 0;
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return pubs;
                }
            }
            connectionsHandler = new ConnectionsHandler(conn, PUBS_QUERY, new QueryParameter(ParameterType.INT, ((page - 1) * PUBS_PER_PAGE)));
            ResultSet rs = connectionsHandler.getResultSet();
            while (rs.next()) {
                pubsCollection.add(new Pub(rs.getInt(1), rs.getString(2)));
            }
            connectionsHandlerPages = new ConnectionsHandler(conn, PUB_PAGES_QUERY);
            ResultSet rsPages = connectionsHandlerPages.getResultSet();
            if (rsPages.next()) {
                totalPages = rsPages.getInt(1);
            }
            pubs.setPubs(pubsCollection);
            pubs.setCurrentPage(page);
            pubs.setTotalPages(totalPages);
        } catch (SQLException e) {
            log.error("Exception during getting nodes list :", e);
        } finally {
            try {
                if (connectionsHandler != null)
                    connectionsHandler.closeHandlerConnections();
                if (connectionsHandlerPages != null)
                    connectionsHandlerPages.closeHandlerConnections();
                disconnect();
            } catch (SQLException e) {
                log.error("Exception during closing connection after getting nodes list");
            }
        }
        return pubs;
    }

    public Students getStudents(final int page) {
        log.info("Trying to get students from page " + page);
        Students students = new Students();
        ConnectionsHandler connectionsHandler = null;
        ConnectionsHandler connectionsHandlerPages = null;
        int totalPages = 0;
        final Collection<Student> studentsCollection = new ArrayList<Student>();
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return students;
                }
            }
            connectionsHandler = new ConnectionsHandler(conn, STUDENTS_QUERY, new QueryParameter(ParameterType.INT, ((page - 1) * STUDENTS_PER_PAGE)));
            ResultSet rs = connectionsHandler.getResultSet();
            while (rs.next()) {
                studentsCollection.add(new Student(rs.getInt(1), rs.getString(2)));
            }
            connectionsHandlerPages = new ConnectionsHandler(conn, STUDENT_PAGES_QUERY);
            ResultSet rsPages = connectionsHandlerPages.getResultSet();
            if (rsPages.next()) {
                totalPages = rsPages.getInt(1);
            }
            students.setStudents(studentsCollection);
            students.setCurrentPage(page);
            students.setTotalPages(totalPages);
        } catch (SQLException e) {
            log.error("Exception during getting students list :", e);
        } finally {
            try {
                if (connectionsHandler != null)
                    connectionsHandler.closeHandlerConnections();
                disconnect();
            } catch (SQLException e) {
                log.error("Exception during closing connection after getting students list");
            }
        }
        return students;
    }

    public GeneralPubContainer getPubGeneral(final int pubId, int linkTime) {
        log.info("Trying to get pub by pub_id = " + pubId);
        ConnectionsHandler pubConnectionHandler = null;
        ConnectionsHandler materialAttendanceConnectionHandler = null;
        ConnectionsHandler studentsAttendanceConnectionHandler = null;
        ConnectionsHandler trendAttendanceConnectionHandler = null;
        ConnectionsHandler materialListConnectionHandler = null;
        ConnectionsHandler trendMaterialConnectionHandler = null;
        ConnectionsHandler studentsPubConnectionHandler = null;
        ConnectionsHandler nodesLinksConnectionHandler = null;
        GeneralPubContainer generalPubContainer = null;
        Pub pub = null;
        Map<Node, Integer> materialAttendance = new HashMap<Node, Integer>();
        Map<Student, Integer> studentsAttendance = new HashMap<Student, Integer>();
        Collection<Trend> trendAttendance = new ArrayList<Trend>();
        Map<Node, Collection<Trend>> materialsAttendance = new HashMap<Node, Collection<Trend>>();
        ArrayList<Node> nodes = new ArrayList<Node>();
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return generalPubContainer;
                }
            }
            QueryParameter pubQP = new QueryParameter(ParameterType.INT, pubId);
            pubConnectionHandler = new ConnectionsHandler(conn, PUB_BY_ID_QUERY, pubQP);
            materialAttendanceConnectionHandler = new ConnectionsHandler(conn, MATERIALS_BY_PUB_ID_QUERY, pubQP);
            studentsAttendanceConnectionHandler = new ConnectionsHandler(conn, STUDENTS_TREND_BY_PUB_ID_QUERY, pubQP);
            trendAttendanceConnectionHandler = new ConnectionsHandler(conn, TREND_BY_PUB_ID_QUERY, pubQP);
            ResultSet pubResultSet = pubConnectionHandler.getResultSet();
            if (pubResultSet.next()) {
                pub = new Pub(pubResultSet.getInt(1), pubResultSet.getString(2));
            }
            ResultSet materialResultSet = materialAttendanceConnectionHandler.getResultSet();
            while (materialResultSet.next()) {
                materialAttendance.put(new Node(materialResultSet.getInt(1), materialResultSet.getString(2)), materialResultSet.getInt(3));
            }
            ResultSet studentsResultSet = studentsAttendanceConnectionHandler.getResultSet();
            while (studentsResultSet.next()) {
                studentsAttendance.put(new Student(studentsResultSet.getInt(1), studentsResultSet.getString(2)), studentsResultSet.getInt(3));
            }
            ResultSet trendResultSet = trendAttendanceConnectionHandler.getResultSet();
            while (trendResultSet.next()) {
                trendAttendance.add(new Trend(trendResultSet.getDate(1), trendResultSet.getInt(2)));
            }
            materialListConnectionHandler = new ConnectionsHandler(conn, NODES_BY_PUB_ID_QUERY, pubQP);
            ResultSet materialResults = materialListConnectionHandler.getResultSet();
            while (materialResults.next()) {
                Collection<Trend> materialTrendAttendance = new ArrayList<Trend>();
                Node currentNode = new Node(materialResults.getInt(1), materialResults.getString(2));
                nodes.add(currentNode);
                trendMaterialConnectionHandler = new ConnectionsHandler(conn, TREND_BY_PUB_ID_AND_NODE_ID_QUERY, new QueryParameter[]{pubQP, new QueryParameter(ParameterType.INT, currentNode.getNodeId())});
                ResultSet trendResultS = trendMaterialConnectionHandler.getResultSet();
                while (trendResultS.next()) {
                    materialTrendAttendance.add(new Trend(trendResultS.getDate(1), trendResultS.getInt(2)));
                }
                materialsAttendance.put(currentNode, materialTrendAttendance);
                trendMaterialConnectionHandler.closeHandlerConnections();
            }
            Map<Integer, Set<Integer>> nodeLinks = calculateLinks(conn, pubId, linkTime);
            generalPubContainer = new GeneralPubContainer(pub, materialAttendance, studentsAttendance, trendAttendance, materialsAttendance, new LinkContainer(nodes, nodeLinks, linkTime));
        } catch (SQLException e) {
            log.error("Exception while getting pub general information", e);
        } finally {
            try {
                if (pubConnectionHandler != null)
                    pubConnectionHandler.closeHandlerConnections();
                if (materialAttendanceConnectionHandler != null)
                    materialAttendanceConnectionHandler.closeHandlerConnections();
                if (studentsAttendanceConnectionHandler != null)
                    studentsAttendanceConnectionHandler.closeHandlerConnections();
                if (trendMaterialConnectionHandler != null)
                    trendMaterialConnectionHandler.closeHandlerConnections();
                if (trendAttendanceConnectionHandler != null)
                    trendAttendanceConnectionHandler.closeHandlerConnections();
                if (materialListConnectionHandler != null)
                    materialListConnectionHandler.closeHandlerConnections();
                if (studentsPubConnectionHandler != null)
                    studentsPubConnectionHandler.closeHandlerConnections();
                if (nodesLinksConnectionHandler != null)
                    nodesLinksConnectionHandler.closeHandlerConnections();
                disconnect();
            } catch (SQLException e) {
                log.error("Exception while closing connection of general pub information");
            }
        }
        return generalPubContainer;
    }

    public Student getStudentById(int studentId) {
        log.info("Trying to get student by id = " + studentId);
        Student student = null;
        ConnectionsHandler connectionsHandler = null;
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return student;
                }
            }
            connectionsHandler = new ConnectionsHandler(conn, STUDENT_BY_ID_QUERY, new QueryParameter(ParameterType.INT, studentId));
            ResultSet rs = connectionsHandler.getResultSet();
            if (rs.next()) {
                student = new Student(rs.getInt(1), rs.getString(2));
            }
        } catch (SQLException e) {
            log.error("Exception during getting student :", e);
        } finally {
            try {
                if (connectionsHandler != null)
                    connectionsHandler.closeHandlerConnections();
                disconnect();
            } catch (SQLException e) {
                log.error("Exception during closing connection after getting student");
            }
        }
        return student;
    }

    public Collection<Pub> getPubsByStudent(int studentId) {
        log.info("Trying to get pubs of student " + studentId);
        ConnectionsHandler connectionsHandler = null;
        Collection<Pub> pubs = new ArrayList<Pub>();
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return pubs;
                }
            }
            connectionsHandler = new ConnectionsHandler(conn, PUBS_BY_ST_ID_QUERY, new QueryParameter(ParameterType.INT, studentId));
            ResultSet rs = connectionsHandler.getResultSet();
            while (rs.next()) {
                pubs.add(new Pub(rs.getInt(1), rs.getString(2)));
            }
        } catch (SQLException e) {
            log.error("Exception during getting nodes list :", e);
        } finally {
            try {
                if (connectionsHandler != null)
                    connectionsHandler.closeHandlerConnections();
                disconnect();
            } catch (SQLException e) {
                log.error("Exception during closing connection after getting nodes list");
            }
        }
        return pubs;
    }

    public PubStudentContainer getStudentPub(int partyId, int pubId) {
        log.info("Trying to get information about student and pub");
        ConnectionsHandler pubConnectionHandler = null;
        ConnectionsHandler pubTrendConnectionHandler = null;
        ConnectionsHandler nodeTotalConnectionHandler = null;
        Pub pub = null;
        Collection<Trend> pubTrend = new ArrayList<Trend>();
        Collection<MaterialStatContainer> materialStatContainers = new ArrayList<MaterialStatContainer>();
        PubStudentContainer pubStudentContainer = null;
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return pubStudentContainer;
                }
            }
            pubConnectionHandler = new ConnectionsHandler(conn, PUB_BY_ID_QUERY, new QueryParameter(ParameterType.INT, pubId));
            ResultSet pubResultSet = pubConnectionHandler.getResultSet();
            if (pubResultSet.next()) {
                pub = new Pub(pubResultSet.getInt(1), pubResultSet.getString(2));
            }
            pubTrendConnectionHandler = new ConnectionsHandler(conn, TREND_BY_PUB_ID_AND_STUDENT_QUERY,
                    new QueryParameter[]{new QueryParameter(ParameterType.INT, partyId), new QueryParameter(ParameterType.INT, pubId)});
            ResultSet pubTrendResultSet = pubTrendConnectionHandler.getResultSet();
            while (pubTrendResultSet.next()) {
                pubTrend.add(new Trend(pubTrendResultSet.getDate(1), pubTrendResultSet.getInt(2)));
            }
            nodeTotalConnectionHandler = new ConnectionsHandler(conn, NODE_TOTAL_BY_PUB_ID_AND_STUDENT_QUERY,
                    new QueryParameter[]{new QueryParameter(ParameterType.INT, partyId), new QueryParameter(ParameterType.INT, pubId)});
            ResultSet nodeTotalResultSet = nodeTotalConnectionHandler.getResultSet();
            while (nodeTotalResultSet.next()) {
                Node currentNode = new Node(nodeTotalResultSet.getInt(1), nodeTotalResultSet.getString(2));
                int currentTotalAttendance = nodeTotalResultSet.getInt(3);
                Collection<Trend> currentNodeTrend = new ArrayList<Trend>();
                ConnectionsHandler currentNodeTrendConnectionHandler = new ConnectionsHandler(conn, TREND_BY_PUB_ID_AND_NODE_ID_AND_STUDENT_QUERY,
                        new QueryParameter[]{new QueryParameter(ParameterType.INT, partyId), new QueryParameter(ParameterType.INT, pubId),
                                new QueryParameter(ParameterType.INT, currentNode.getNodeId())});
                ResultSet currentNodeResultSet = currentNodeTrendConnectionHandler.getResultSet();
                while (currentNodeResultSet.next()) {
                    currentNodeTrend.add(new Trend(currentNodeResultSet.getDate(1), currentNodeResultSet.getInt(2)));
                }
                materialStatContainers.add(new MaterialStatContainer(currentNode, currentTotalAttendance, currentNodeTrend));
                currentNodeTrendConnectionHandler.closeHandlerConnections();
            }
            pubStudentContainer = new PubStudentContainer(pub, pubTrend, materialStatContainers);
        } catch (SQLException e) {
            log.error("Exception while getting information about student and pub", e);
        } finally {
            try {
                if (pubConnectionHandler != null)
                    pubConnectionHandler.closeHandlerConnections();
                if (pubTrendConnectionHandler != null)
                    pubTrendConnectionHandler.closeHandlerConnections();
                if (nodeTotalConnectionHandler != null)
                    nodeTotalConnectionHandler.closeHandlerConnections();
                disconnect();
            } catch (SQLException e) {
                log.error("Exception during closing connection after getting student pub information", e);
            }
        }
        return pubStudentContainer;
    }

    public LinkContainer getLinks(int pubId, int linkTime) {
        LinkContainer linkContainer = null;
        Map<Integer, Set<Integer>> nodeLinks = new HashMap<Integer, Set<Integer>>();
        ArrayList<Node> nodes = new ArrayList<Node>();
        ConnectionsHandler materialListConnectionHandler = null;
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return linkContainer;
                }
            }
            materialListConnectionHandler = new ConnectionsHandler(conn, NODES_BY_PUB_ID_QUERY, new QueryParameter(ParameterType.INT, pubId));
            ResultSet materialResults = materialListConnectionHandler.getResultSet();
            while (materialResults.next()) {
                nodes.add(new Node(materialResults.getInt(1), materialResults.getString(2)));
            }
            nodeLinks = calculateLinks(conn, pubId, linkTime);
            linkContainer = new LinkContainer(nodes, nodeLinks, linkTime);
        } catch (SQLException e) {
            log.error("Exception during getting links list :", e);
        } finally {
            try {
                disconnect();
                if (materialListConnectionHandler != null)
                    materialListConnectionHandler.closeHandlerConnections();
            } catch (SQLException e) {
                log.error("Exception during closing connection after getting links list");
            }
        }
        return linkContainer;
    }

    private Map<Integer, Set<Integer>> calculateLinks(Connection conn, int pubId, int linkTime) throws SQLException {
        Map<Integer, Set<Integer>> nodeLinks = new HashMap<Integer, Set<Integer>>();
        log.info("Starting getting links for pub_id=" + pubId + " and link_time=" + linkTime + "...");
        ConnectionsHandler nodesLinksConnectionHandler = null;
        QueryParameter pubQP = new QueryParameter(ParameterType.INT, pubId);
        QueryParameter[] params = new QueryParameter[]{pubQP, pubQP, new QueryParameter(ParameterType.INT, linkTime), pubQP, pubQP};
        try {
            nodesLinksConnectionHandler = new ConnectionsHandler(conn, NODES_SUBSCRIBE_LINK_IN_PUB_QUERY, params);
            ResultSet links = nodesLinksConnectionHandler.getResultSet();
            while (links.next()) {
                int nodeA = links.getInt(2);
                int nodeB = links.getInt(4);
                if (nodeLinks.containsKey(nodeA)) {
                    nodeLinks.get(nodeA).add(nodeB);
                } else {
                    Set<Integer> nodeASet = new HashSet<Integer>();
                    nodeASet.add(nodeB);
                    nodeLinks.put(nodeA, nodeASet);
                }
            }
            log.info("Getting links finished");
            for (Map.Entry e : nodeLinks.entrySet()) {
                Set s = (Set) e.getValue();
                Integer k = (Integer) e.getKey();
                log.info(k + " " + s);

            }
        } finally {
            if (nodesLinksConnectionHandler != null)
                nodesLinksConnectionHandler.closeHandlerConnections();
        }
        return nodeLinks;
    }
}