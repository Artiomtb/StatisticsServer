package JSON;

import items.Material;
import items.Pub;
import items.Student;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Map;

public class JSONPubGeneral implements JSONHandler {
    private Pub pub;
    private Map<Material, Integer> materialAttendance;
    private Map<Student, Integer> studentAttendance;
    private JSONObject jsonObject = new JSONObject();

    public JSONPubGeneral(Pub pub, Map<Material, Integer> materialAttendance, Map<Student, Integer> studentAttendance) {
        if (pub != null) {
            this.pub = pub;
            this.materialAttendance = materialAttendance;
            this.studentAttendance = studentAttendance;
            setJSONObject();
        }
    }

    private void setJSONObject() {
        jsonObject.put("node_id", pub.getPubId());
        jsonObject.put("node_name", pub.getPubTitle());
        final JSONArray materialsArray = new JSONArray();
        for (final Map.Entry entry : materialAttendance.entrySet()) {
            final Material material = (Material) entry.getKey();
            materialsArray.add(new JSONObject() {
                {
                    put("material_id", material.getMaterialId());
                    put("material_name", material.getMaterialTitle());
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
