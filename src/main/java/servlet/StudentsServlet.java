package servlet;

import JSON.JSONSearchItems;
import JSON.JSONSearchResults;
import JSON.JSONStudents;
import items.Searchable;
import items.Student;
import model.DatabaseHandler;
import org.apache.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;

import static model.Utils.*;

public class StudentsServlet extends HttpServlet {

    private static final Logger log = Logger.getLogger("StudentsServlet.class");

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        String actionParameter = req.getParameter("action");
//
//        if ("search".equals(actionParameter)) {
//            String text = req.getParameter("text");
//            if (text != null) {
//                if (!text.isEmpty()) {
//                    int page = 1;
//                    String pageParameter = req.getParameter("page");
//                    try {
//                        page = Integer.valueOf(pageParameter);
//                        if (page < 1) page = 1;
//                    } catch (NumberFormatException e) {
//                        log.warn("Incorrect parameter \"page\" (expected integer got " + pageParameter + "). Set to 1");
//                    }
//                    resp.setContentType("application/json");
//                    resp.setCharacterEncoding("UTF-8");
//                    resp.addHeader("Access-Control-Allow-Origin", "*");
//                    resp.addHeader("Cache-Control", "no-cache");
//                    PrintWriter pw = resp.getWriter();
//                    ArrayList<Searchable> students = DatabaseHandler.initialize().autocompleteStudentsList(text);
//                    int totalPages = (students.size() + (STUDENT_SEARCH_PAGE_LIMIT - 1)) / STUDENT_SEARCH_PAGE_LIMIT;
//                    pw.println(new JSONSearchResults(new JSONSearchItems(makeResultSet(students, text, (page - 1) * STUDENT_SEARCH_PAGE_LIMIT, page * STUDENT_SEARCH_PAGE_LIMIT)),
//                            page, totalPages).getJSONString());
//                    pw.close();
//                }
//            }
//        } else {


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
        }
    //}

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String actionParameter = req.getParameter("action");
        if ("autocomplete".equals(actionParameter)) {
            String text = req.getParameter("text");
            if (text != null) {
                if (!text.isEmpty()) {
                    resp.setContentType("application/json");
                    resp.setCharacterEncoding("UTF-8");
                    resp.addHeader("Access-Control-Allow-Origin", "*");
                    resp.addHeader("Cache-Control", "no-cache");
                    PrintWriter pw = resp.getWriter();
                    ArrayList<Searchable> students = DatabaseHandler.initialize().autocompleteStudentsList(text);
                    pw.println(new JSONSearchItems(makeResultSet(students, text, 0, STUDENT_AUTOCOMLETE_LIMIT)).getJSONString());
                    pw.close();
                }
            }
        } else if ("search".equals(actionParameter)) {
            String text = req.getParameter("text");
            if (text != null) {
                if (!text.isEmpty()) {
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
                    resp.addHeader("Cache-Control", "no-cache");
                    PrintWriter pw = resp.getWriter();
                    ArrayList<Searchable> students = DatabaseHandler.initialize().autocompleteStudentsList(text);
                    int totalPages = (students.size() + (STUDENT_SEARCH_PAGE_LIMIT - 1)) / STUDENT_SEARCH_PAGE_LIMIT;
                    pw.println(new JSONSearchResults(new JSONSearchItems(makeResultSet(students, text, (page - 1) * STUDENT_SEARCH_PAGE_LIMIT, page * STUDENT_SEARCH_PAGE_LIMIT)),
                            page, totalPages).getJSONString());
                    pw.close();
                }
            }
        }
    }

    private ArrayList<Searchable> makeResultSet(ArrayList<Searchable> students, String text, int downLimit, int upLimit) {
        ArrayList<Searchable> results = new ArrayList<Searchable>();
        text = text.trim().toLowerCase();
        int count = 0;
        int textLength = text.length();
        Iterator<Searchable> iterator = students.iterator();
        while (iterator.hasNext()) {
            Student student = (Student) iterator.next();
            String title = student.getTitle();
            if (title.toLowerCase().equals(text)) {
                student.setTitle(B_CHAR_START + title + B_CHAR_END);
                results.add(student);
                iterator.remove();
                if (++count >= upLimit)
                    break;
            }
        }
        if (count < upLimit) {
            iterator = students.iterator();
            while (iterator.hasNext()) {
                Student student = (Student) iterator.next();
                String title = student.getTitle();
                String searchableTitle = title.toLowerCase();
                if (searchableTitle.startsWith(text)) {
                    student.setTitle(B_CHAR_START + title.substring(0, text.length()) + B_CHAR_END + title.substring(text.length()));
                    results.add(student);
                    iterator.remove();
                    if (++count >= upLimit)
                        break;
                }
            }
            if (count < upLimit) {
                iterator = students.iterator();
                while (iterator.hasNext()) {
                    Student student = (Student) iterator.next();
                    String title = student.getTitle();
                    String searchableTitle = title.toLowerCase();
                    if (searchableTitle.contains(text)) {
                        int beginIndex = searchableTitle.indexOf(text);
                        student.setTitle(title.substring(0, beginIndex) + B_CHAR_START +
                                title.substring(beginIndex, beginIndex + textLength) + B_CHAR_END
                                + title.substring(beginIndex + textLength));
                        results.add(student);
                        iterator.remove();
                        if (++count >= upLimit)
                            break;
                    }
                }
            }
        }
        if (downLimit > 0) {
            ArrayList<Searchable> cuttedResults = new ArrayList<Searchable>();
            int resultsSize = results.size();
            if (downLimit <= resultsSize) {
                for (Searchable item : results.subList(downLimit, resultsSize)) {
                    cuttedResults.add(item);
                }
            }
            results = cuttedResults;
        }


        return results;
    }
}
