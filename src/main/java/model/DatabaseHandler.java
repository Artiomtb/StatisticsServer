package model;

import items.Material;
import items.Node;
import items.Pub;
import items.Student;
import org.apache.log4j.Logger;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class DatabaseHandler {

    private static final String JNDI = "java:jboss/datasources/PostgreSQLDS";
    private final Logger log = Logger.getLogger("DatabaseHandler.class");
    private static InitialContext context;
    private static DataSource dataSource;
    private Connection conn;
    private static DatabaseHandler databaseHandler;
    private static final int NODES_PER_PAGE = 20;
    private static final int STUDENTS_PER_PAGE = 20;
    private static final String NODES_QUERY = "SELECT node_id, title FROM node_to_title LIMIT " + NODES_PER_PAGE + " OFFSET ?";
    private static final String STUDENTS_QUERY = "SELECT party_id, title FROM party_to_title LIMIT " + STUDENTS_PER_PAGE + "OFFSET ?";
    private static final String PUB_BY_ID_QUERY = "SELECT pub_id, title FROM pub_to_title WHERE pub_id = ?";
    private static final String MATERIALS_BY_PUB_ID_QUERY = "SELECT nt.node_id, nt.title, n.attendance\n" +
            "FROM (SELECT node_id, sum(floor(extract(EPOCH FROM (updated_at - created_at)) / 60)) AS attendance\n" +
            "      FROM attendence\n" +
            "      WHERE pub_id = ?\n" +
            "      GROUP BY node_id) n, node_to_title nt\n" +
            "WHERE n.node_id = nt.node_id";
    private static final String STUDENTS_BY_PUB_ID_QUERY = "SELECT pt.party_id, pt.title, p.attendance\n" +
            "FROM (SELECT party_id, sum(floor(extract(EPOCH FROM (updated_at - created_at)) / 60)) AS attendance\n" +
            "      FROM attendence\n" +
            "      WHERE pub_id = ?\n" +
            "      GROUP BY party_id) p, party_to_title pt\n" +
            "WHERE p.party_id = pt.party_id";
    private static final String STUDENT_BY_ID_QUERY = "SELECT party_id, title FROM party_to_title WHERE party_id = ?";
    private static final String NODES_BY_ST_ID_QUERY = "SELECT DISTINCT nt.node_id, nt.title FROM attendence a, node_to_title nt WHERE a.party_id = ? AND a.node_id = nt.node_id";

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

    public Collection<Node> getNodes(int page) {
        log.info("Trying to get nodes from page " + page);
        PreparedStatement ps = null;
        ResultSet rs = null;
        Collection<Node> nodes = new ArrayList<Node>();
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return nodes;
                }
            }
            ps = conn.prepareStatement(NODES_QUERY);
            ps.setInt(new Integer(1), (page - 1) * NODES_PER_PAGE);
            rs = ps.executeQuery();
            while (rs.next()) {
                nodes.add(new Node(rs.getInt(1), rs.getString(2)));
            }
        } catch (SQLException e) {
            log.error("Exception during getting nodes list :", e);
        } finally {
            try {
                if (rs != null)
                    rs.close();
                if (ps != null)
                    ps.close();
                disconnect();
            } catch (SQLException e) {
                log.error("Exception during closing connection after getting nodes list");
            }
        }
        return nodes;
    }

    public Collection<Student> getStudents(int page) {
        log.info("Trying to get students from page " + page);
        PreparedStatement ps = null;
        ResultSet rs = null;
        Collection<Student> students = new ArrayList<Student>();
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return students;
                }
            }
            ps = conn.prepareStatement(STUDENTS_QUERY);
            ps.setInt(new Integer(1), (page - 1) * STUDENTS_PER_PAGE);
            rs = ps.executeQuery();
            while (rs.next()) {
                students.add(new Student(rs.getInt(1), rs.getString(2)));
            }
        } catch (SQLException e) {
            log.error("Exception during getting students list :", e);
        } finally {
            try {
                if (rs != null)
                    rs.close();
                if (ps != null)
                    ps.close();
                disconnect();
            } catch (SQLException e) {
                log.error("Exception during closing connection after getting students list");
            }
        }
        return students;
    }

    public Pub getPubById(int pubId) {
        log.info("Trying to get pub by id = " + pubId);
        PreparedStatement ps = null;
        ResultSet rs = null;
        Pub pub = null;
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return pub;
                }
            }
            ps = conn.prepareStatement(PUB_BY_ID_QUERY);
            ps.setInt(new Integer(1), pubId);
            rs = ps.executeQuery();
            if (rs.next()) {
                pub = new Pub(rs.getInt(1), rs.getString(2));
            }
        } catch (SQLException e) {
            log.error("Exception during getting pub :", e);
        } finally {
            try {
                if (rs != null)
                    rs.close();
                if (ps != null)
                    ps.close();
                disconnect();
            } catch (SQLException e) {
                log.error("Exception during closing connection after getting pub");
            }
        }
        return pub;
    }

    public Map<Material, Integer> getMaterialAttendanceByPub(int pubId) {
        log.info("Trying to get material attendance by pub = " + pubId);
        Map<Material, Integer> materialAttendance = new HashMap<Material, Integer>();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return materialAttendance;
                }
            }
            ps = conn.prepareStatement(MATERIALS_BY_PUB_ID_QUERY);
            ps.setInt(new Integer(1), pubId);
            rs = ps.executeQuery();
            while (rs.next()) {
                materialAttendance.put(new Material(rs.getInt(1), rs.getString(2)), rs.getInt(3));
            }
        } catch (SQLException e) {
            log.error("Exception during getting material attendance :", e);
        } finally {
            try {
                if (rs != null)
                    rs.close();
                if (ps != null)
                    ps.close();
                disconnect();
            } catch (SQLException e) {
                log.error("Exception during closing connection after getting material attendance");
            }
        }
        return materialAttendance;
    }

    public Map<Student, Integer> getStudentsAttendanceByPub(int pubId) {
        log.info("Trying to get students attendance by pub = " + pubId);
        Map<Student, Integer> studentsAttendance = new HashMap<Student, Integer>();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return studentsAttendance;
                }
            }
            ps = conn.prepareStatement(STUDENTS_BY_PUB_ID_QUERY);
            ps.setInt(new Integer(1), pubId);
            rs = ps.executeQuery();
            while (rs.next()) {
                studentsAttendance.put(new Student(rs.getInt(1), rs.getString(2)), rs.getInt(3));
            }
        } catch (SQLException e) {
            log.error("Exception during getting students attendance :", e);
        } finally {
            try {
                if (rs != null)
                    rs.close();
                if (ps != null)
                    ps.close();
                disconnect();
            } catch (SQLException e) {
                log.error("Exception during closing connection after getting material attendance");
            }
        }
        return studentsAttendance;
    }

    public Student getStudentById(int studentId) {
        log.info("Trying to get student by id = " + studentId);
        PreparedStatement ps = null;
        ResultSet rs = null;
        Student student = null;
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return student;
                }
            }
            ps = conn.prepareStatement(STUDENT_BY_ID_QUERY);
            ps.setInt(new Integer(1), studentId);
            rs = ps.executeQuery();
            if (rs.next()) {
                student = new Student(rs.getInt(1), rs.getString(2));
            }
        } catch (SQLException e) {
            log.error("Exception during getting student :", e);
        } finally {
            try {
                if (rs != null)
                    rs.close();
                if (ps != null)
                    ps.close();
                disconnect();
            } catch (SQLException e) {
                log.error("Exception during closing connection after getting student");
            }
        }
        return student;
    }

    public Collection<Node> getNodesByStudent(int studentId) {
        log.info("Trying to get nodes of student " + studentId);
        PreparedStatement ps = null;
        ResultSet rs = null;
        Collection<Node> nodes = new ArrayList<Node>();
        try {
            if (conn == null) {
                if (!connect()) {
                    log.error("Cannot create connection");
                    return nodes;
                }
            }
            ps = conn.prepareStatement(NODES_BY_ST_ID_QUERY);
            ps.setInt(new Integer(1), studentId);
            rs = ps.executeQuery();
            while (rs.next()) {
                nodes.add(new Node(rs.getInt(1), rs.getString(2)));
            }
        } catch (SQLException e) {
            log.error("Exception during getting nodes list :", e);
        } finally {
            try {
                if (rs != null)
                    rs.close();
                if (ps != null)
                    ps.close();
                disconnect();
            } catch (SQLException e) {
                log.error("Exception during closing connection after getting nodes list");
            }
        }
        return nodes;
    }


}