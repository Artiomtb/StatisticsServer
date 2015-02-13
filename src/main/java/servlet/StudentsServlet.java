package servlet;

import JSON.JSONAutocomplete;
import JSON.JSONStudents;
import model.DatabaseHandler;
import org.apache.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class StudentsServlet extends HttpServlet {

    private static final Logger log = Logger.getLogger("StudentsServlet.class");

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String actionParameter = req.getParameter("action");
        if (actionParameter == null) {
            int page = 1;
            String pageParameter = req.getParameter("page");
            try {
                page = Integer.valueOf(pageParameter);
                if (page < 1) page = 1;
            } catch (NumberFormatException e) {
                log.warn("Incorrect parameter \"page\" (expected integer got " + pageParameter + "). Set to 1");
            }
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");
            resp.addHeader("Access-Control-Allow-Origin", "*");
            PrintWriter pw = resp.getWriter();
            pw.println(new JSONStudents(DatabaseHandler.initialize().getStudents(page)).getJSONString());
            pw.close();
        } else if ("autocomplete".equals(actionParameter)) {
            String text = req.getParameter("text");
            if (text != null) {
                if (!text.isEmpty()) {
                    resp.setContentType("application/json");
                    resp.setCharacterEncoding("UTF-8");
                    resp.addHeader("Access-Control-Allow-Origin", "*");
                    resp.addHeader("Cache-Control", "no-cache");
                    PrintWriter pw = resp.getWriter();
                    pw.println(new JSONAutocomplete(DatabaseHandler.initialize().autoCompleteStudentsList(text)).getJSONString());
                    pw.close();
                }
            }
        }
    }
}
