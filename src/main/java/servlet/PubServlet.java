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
        String pubParameter = req.getParameter("pub_id");
        String linkTimeParameter = req.getParameter("link_time");
        int pub = 0;
        int linkTime = 10;
        try {
            pub = Integer.valueOf(pubParameter);
        } catch (NumberFormatException e) {
            log.warn("Incorrect parameter \"pub_id\" (expected integer got " + pubParameter + "). Set to 0");
        }
        try {
            linkTime = Integer.valueOf(linkTimeParameter);
        } catch (NumberFormatException e) {
            log.warn("Incorrect parameter \"link_time\" (expected integer got " + linkTimeParameter + "). Set to 10");
        }
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.addHeader("Access-Control-Allow-Origin", "*");
        PrintWriter pw = resp.getWriter();
        DatabaseHandler databaseHandler = DatabaseHandler.initialize();
        pw.println(new JSONPubGeneral(databaseHandler.getPubGeneral(pub, linkTime)).getJSONString());
        pw.close();
    }
}
