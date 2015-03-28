package model;

public class Utils {
    public static final int PUBS_PER_PAGE = 20;
    public static final int STUDENTS_PER_PAGE = 20;
    public static final int DAYS_TO_PUB_TREND = 20;
    public static final int DAYS_TO_PUB_MATERIAL_TREND = 5;
    public static final int DAYS_TO_PUB_STUDENT_TREND = 10;
    public static final int DAYS_TO_PUB_NODE_STUDENT_TREND = 12;
    public static final String PUBS_QUERY = "SELECT DISTINCT pt.pub_id, pt.title FROM attendence a, pub_to_title pt where a.pub_id = pt.pub_id LIMIT " + PUBS_PER_PAGE + " OFFSET ?";
    public static final String STUDENTS_QUERY = "SELECT party_id, title FROM party_to_title LIMIT " + STUDENTS_PER_PAGE + "OFFSET ?";
    public static final String PUB_BY_ID_QUERY = "SELECT pub_id, title FROM pub_to_title WHERE pub_id = ?";
    public static final String MATERIALS_BY_PUB_ID_QUERY = "SELECT nt.node_id, nt.title, n.attendance\n" +
            "FROM (SELECT node_id, sum(floor(extract(EPOCH FROM (updated_at - created_at)) / 60)) AS attendance\n" +
            "      FROM attendence\n" +
            "      WHERE pub_id = ?\n" +
            "      GROUP BY node_id) n, node_to_title nt\n" +
            "WHERE n.node_id = nt.node_id";
    public static final String STUDENTS_TREND_BY_PUB_ID_QUERY = "SELECT pt.party_id, pt.title, p.attendance\n" +
            "FROM (SELECT party_id, sum(floor(extract(EPOCH FROM (updated_at - created_at)) / 60)) AS attendance\n" +
            "      FROM attendence\n" +
            "      WHERE pub_id = ?\n" +
            "      GROUP BY party_id) p, party_to_title pt\n" +
            "WHERE p.party_id = pt.party_id";
    public static final String TREND_BY_PUB_ID_QUERY = "SELECT *\n" +
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
    public static final String STUDENT_BY_ID_QUERY = "SELECT party_id, title FROM party_to_title WHERE party_id = ?";
    public static final String PUBS_BY_ST_ID_QUERY = "SELECT DISTINCT pt.pub_id, pt.title FROM attendence a, pub_to_title pt WHERE a.party_id = ? AND a.pub_id = pt.pub_id";
    public static final String NODES_BY_PUB_ID_QUERY = "SELECT DISTINCT nt.node_id, nt.title FROM attendence a, node_to_title nt WHERE pub_id = ? AND a.node_id = nt.node_id ORDER BY node_id";
    public static final String TREND_BY_PUB_ID_AND_NODE_ID_QUERY = "SELECT *\n" +
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
    public static final String TREND_BY_PUB_ID_AND_STUDENT_QUERY = "SELECT *\n" +
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
    public static final String NODE_TOTAL_BY_PUB_ID_AND_STUDENT_QUERY = "SELECT\n" +
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
    public static final String TREND_BY_PUB_ID_AND_NODE_ID_AND_STUDENT_QUERY = "SELECT *\n" +
            "FROM (SELECT\n" +
            "      DATE (updated_at) AS upd,\n" +
            "sum(floor(extract(EPOCH FROM (updated_at - created_at)) / 60)) AS attendance\n" +
            "      FROM attendence\n" +
            "      WHERE party_id = ? AND pub_id = ? AND node_id = ?\n" +
            "      GROUP BY DATE(updated_at)\n" +
            "      ORDER BY DATE(updated_at) DESC\n" +
            "      LIMIT " + DAYS_TO_PUB_NODE_STUDENT_TREND + ") trend\n" +
            "ORDER BY trend.upd";
    public static final String NODES_SUBSCRIBE_LINK_IN_PUB_QUERY = "SELECT DISTINCT\n" +
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
    public static final String PUB_PAGES_QUERY = "SELECT ceil(count(DISTINCT pt.pub_id) :: DOUBLE PRECISION / " + PUBS_PER_PAGE + ") AS pages\n" +
            "FROM attendence a, pub_to_title pt\n" +
            "WHERE a.pub_id = pt.pub_id";
    public static final String STUDENT_PAGES_QUERY = "SELECT ceil(count(party_id) :: DOUBLE PRECISION / " + STUDENTS_PER_PAGE + ")\n" +
            "FROM party_to_title";
    public static final int PUB_AUTOCOMPLETE_LIMIT = 10;
    public static final int PUB_SEARCH_PAGE_LIMIT = 20;
    public static final String PUBS_AUTOCOMPLETE_QUERY = "SELECT pub_id, title FROM pub_to_title WHERE lower(title) LIKE ?";
    public static final int STUDENT_AUTOCOMLETE_LIMIT = 10;
    public static final int STUDENT_SEARCH_PAGE_LIMIT = 20;
    public static final String STUDENTS_AUTOCOMPLETE_QUERY = "SELECT party_id, title FROM party_to_title WHERE lower(title) LIKE ?";
    public static final String STUDENTS_AUTOCOMPLETE_EQUALS_QUERY = "SELECT party_id, title FROM party_to_title WHERE lower(title) = ? LIMIT " + STUDENT_AUTOCOMLETE_LIMIT;
    public static final String STUDENTS_AUTOCOMPLETE_LIKE_QUERY = "SELECT party_id, title FROM party_to_title WHERE lower(title) like ? LIMIT " + STUDENT_AUTOCOMLETE_LIMIT;
    public static final String B_CHAR_START = "<=-b";
    public static final String B_CHAR_END = "b-=>";

}
