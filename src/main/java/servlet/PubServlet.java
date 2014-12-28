package servlet;

import JSON.JSONPubGeneral;
import model.DatabaseHandler;
import org.apache.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class PubServlet extends HttpServlet {
    private static final Logger log = Logger.getLogger("PubServlet.class");

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String nodeParameter = req.getParameter("node_id");
        int node = 0;
        try {
            node = Integer.valueOf(nodeParameter);
        } catch (NumberFormatException e) {
            log.warn("Incorrect parameter \"page\" (expected integer got " + nodeParameter + "). Set to 0");
        }
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.addHeader("Access-Control-Allow-Origin", "*");
        PrintWriter pw = resp.getWriter();
        DatabaseHandler databaseHandler = DatabaseHandler.initialize();
        pw.println(new JSONPubGeneral(databaseHandler.getPubById(node), databaseHandler.getMaterialAttendanceByPub(node), databaseHandler.getStudentsAttendanceByPub(node)).getJSONString());
        pw.close();
    }
}
