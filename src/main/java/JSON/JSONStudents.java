package JSON;

import items.Student;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Collection;

public class JSONStudents implements JSONHandler {
    private Collection<Student> students;
    private int page;
    private JSONObject jsonObject = new JSONObject();

    public JSONStudents(Collection<Student> students, int page) {
        this.students = students;
        this.page = page;
        setJSONObject();
    }

    private void setJSONObject() {
        jsonObject.put("pages", this.page);
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
}
