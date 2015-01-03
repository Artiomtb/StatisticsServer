package servlet;

import JSON.JSONPubStudent;
import model.DatabaseHandler;
import org.apache.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class StudentsPubServlet extends HttpServlet {

    private static final Logger log = Logger.getLogger("StudentsPubServlet.class");

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int partyId = 0;
        int pubId = 0;
        String partyParameter = req.getParameter("party_id");
        String pubParameter = req.getParameter("pub_id");
        System.out.println(partyParameter + " " + pubParameter);
        try {
            partyId = Integer.valueOf(partyParameter);
        } catch (NumberFormatException e) {
            log.warn("Incorrect parameter \"party_id\" (expected integer got " + partyParameter + ")");
        }
        try {
            pubId = Integer.valueOf(pubParameter);
        } catch (NumberFormatException e) {
            log.warn("Incorrect parameter \"pub_id\" (expected integer got " + partyParameter + ")");
        }
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.addHeader("Access-Control-Allow-Origin", "*");
        PrintWriter pw = resp.getWriter();
        pw.println(new JSONPubStudent(DatabaseHandler.initialize().getStudentPub(partyId, pubId)).getJSONString());
        pw.close();
    }
}
