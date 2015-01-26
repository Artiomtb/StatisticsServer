package JSON;

import items.Student;
import items.Students;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Collection;

public class JSONStudents implements JSONHandler {
    private Collection<Student> students;
    private int currentPage;
    private int totalPages;
    private JSONObject jsonObject = new JSONObject();

    public JSONStudents(Students students) {
        this.students = students.getStudents();
        this.currentPage = students.getCurrentPage();
        this.totalPages = students.getTotalPages();
        setJSONObject();
    }

    private void setJSONObject() {
        jsonObject.put("current_page", this.currentPage);
        jsonObject.put("pages", this.totalPages);
        JSONArray studentsArray = new JSONArray();
        for (final Student student : this.students) {
            studentsArray.add(new JSONObject() {
                {
                    put("party_name", student.getStudentTitle());
                    put("party_id", student.getStudentId());
                }
            });
        }
        jsonObject.put("students", studentsArray);
    }

    @Override
    public String getJSONString() {
        return this.jsonObject.toJSONString();
    }

    @Override
    public JSONObject getJSONObject() {
        return this.jsonObject;
    }
}
