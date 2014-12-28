package servlet;

import JSON.JSONNodesByStudent;
import model.DatabaseHandler;
import org.apache.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class StudentNodesServlet extends HttpServlet {

    private static final Logger log = Logger.getLogger("StudentNodesServlet.class");

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int partyId = 0;
        String partyParameter = req.getParameter("party_id");
        try {
            partyId = Integer.valueOf(partyParameter);
        } catch (NumberFormatException e) {
            log.warn("Incorrect parameter \"party_id\" (expected integer got " + partyParameter + ")");
        }
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.addHeader("Access-Control-Allow-Origin", "*");
        PrintWriter pw = resp.getWriter();
        DatabaseHandler databaseHandler = DatabaseHandler.initialize();
        pw.println(new JSONNodesByStudent(databaseHandler.getStudentById(partyId), databaseHandler.getNodesByStudent(partyId)).getJSONString());
        pw.close();
    }
}
