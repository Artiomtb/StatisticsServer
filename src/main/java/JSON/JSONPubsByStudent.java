package JSON;

import items.Node;
import items.Pub;
import items.Student;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Collection;

public class JSONPubsByStudent implements JSONHandler {

    private Student student;
    private Collection<Pub> pubs;
    private JSONObject jsonObject = new JSONObject();

    public JSONPubsByStudent(Student student, Collection<Pub> pubs) {
        if (student != null) {
            this.student = student;
            this.pubs = pubs;
            setJSONObject();
        }
    }

    private void setJSONObject() {
        jsonObject.put("student_name", this.student.getStudentTitle());
        JSONArray nodesArray = new JSONArray();
        for (final Pub pub : pubs) {
            nodesArray.add(new JSONObject() {
                {
                    put("pub_id", pub.getPubId());
                    put("pub_name", pub.getPubTitle());
                }
            });
        }
        jsonObject.put("pubs", nodesArray);
    }

    @Override
    public String getJSONString() {
        return this.jsonObject.toJSONString();
    }
}
