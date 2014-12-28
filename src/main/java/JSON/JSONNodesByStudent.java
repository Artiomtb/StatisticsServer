package JSON;

import items.Node;
import items.Student;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Collection;

public class JSONNodesByStudent implements JSONHandler {

    private Student student;
    private Collection<Node> nodes;
    private JSONObject jsonObject = new JSONObject();

    public JSONNodesByStudent(Student student, Collection<Node> nodes) {
        if (student != null) {
            this.student = student;
            this.nodes = nodes;
            setJSONObject();
        }
    }

    private void setJSONObject() {
        jsonObject.put("student_name", this.student.getStudentTitle());
        JSONArray nodesArray = new JSONArray();
        for (final Node node : nodes) {
            nodesArray.add(new JSONObject() {
                {
                    put("node_id", node.getNodeId());
                    put("node_name", node.getNodeTitle());
                }
            });
        }
        jsonObject.put("nodes", nodesArray);
    }

    @Override
    public String getJSONString() {
        return this.jsonObject.toJSONString();
    }
}
