package JSON;

import items.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Collection;
import java.util.Map;

public class JSONPubGeneral implements JSONHandler {
    private Pub pub;
    private Map<Node, Integer> materialAttendance;
    private Map<Student, Integer> studentAttendance;
    private Collection<Trend> trendAttendance;
    private JSONObject jsonObject = new JSONObject();

    public JSONPubGeneral(Pub pub, Map<Node, Integer> materialAttendance, Map<Student, Integer> studentAttendance, Collection<Trend> trendAttendance) {
        if (pub != null) {
            this.pub = pub;
            this.materialAttendance = materialAttendance;
            this.studentAttendance = studentAttendance;
            this.trendAttendance = trendAttendance;
            setJSONObject();
        }
    }

    public JSONPubGeneral(GeneralPubContainer generalPubContainer) {
        if (generalPubContainer != null) {
            Pub pub = generalPubContainer.getPub();
            if (pub != null) {
                this.pub = pub;
                this.materialAttendance = generalPubContainer.getMaterialAttendance();
                this.studentAttendance = generalPubContainer.getStudentAttendance();
                this.trendAttendance = generalPubContainer.getTrendAttendance();
                setJSONObject();
            }
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
        JSONArray trendArray = new JSONArray();
        for(final Trend trend : this.trendAttendance) {
            trendArray.add(new JSONObject(){
                {
                    put("date", trend.getDate());
                    put("time", trend.getAttendance());
                }
            });
        }
        jsonObject.put("trend", trendArray);
    }

    @Override
    public String getJSONString() {
        return this.jsonObject.toJSONString();
    }
}
