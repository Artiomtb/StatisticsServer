package JSON;

import items.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Map;

public class JSONPubGeneral implements JSONHandler {
    private Pub pub;
    private Map<Node, Integer> materialAttendance;
    private Map<Student, Integer> studentAttendance;
    private JSONObject jsonObject = new JSONObject();

    public JSONPubGeneral(Pub pub, Map<Node, Integer> materialAttendance, Map<Student, Integer> studentAttendance) {
        if (pub != null) {
            this.pub = pub;
            this.materialAttendance = materialAttendance;
            this.studentAttendance = studentAttendance;
            setJSONObject();
        }
    }

    public JSONPubGeneral(GeneralPubContainer generalPubContainer) {
        Pub pub = generalPubContainer.getPub();
        if(pub != null) {
            this.pub = pub;
            this.materialAttendance = generalPubContainer.getMaterialAttendance();
            this.studentAttendance = generalPubContainer.getStudentAttendance();
            setJSONObject();
        }
    }

    private void setJSONObject() {
        jsonObject.put("node_id", pub.getPubId());
        jsonObject.put("node_name", pub.getPubTitle());
        final JSONArray materialsArray = new JSONArray();
        for (final Map.Entry entry : materialAttendance.entrySet()) {
            final Node node = (Node) entry.getKey();
            materialsArray.add(new JSONObject() {
                {
                    put("material_id", node.getNodeId());
                    put("material_name", node.getNodeTitle());
                    put("total_attendance", entry.getValue());
                }
            });
        }
        jsonObject.put("materials", materialsArray);
        JSONArray studentArray = new JSONArray();
        for (final Map.Entry entry : studentAttendance.entrySet()) {
            final Student student = (Student) entry.getKey();
            studentArray.add(new JSONObject() {
                {
                    put("party_id", student.getStudentId());
                    put("party_name", student.getStudentTitle());
                    put("total_attendance", entry.getValue());
                }
            });
        }
        jsonObject.put("students", studentArray);
    }

    @Override
    public String getJSONString() {
        return this.jsonObject.toJSONString();
    }
}
