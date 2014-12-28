package JSON;

import items.Node;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Collection;

public class JSONNodes implements JSONHandler {
    private Collection<Node> nodes;
    private int page;
    private JSONObject jsonObject = new JSONObject();


    public JSONNodes(Collection<Node> nodes, int page) {
        this.nodes = nodes;
        this.page = page;
        setJSONObject();
    }

    private void setJSONObject() {
        jsonObject.put("pages", this.page);
        JSONArray nodesArray = new JSONArray();
        for (final Node node : this.nodes) {
            nodesArray.add(new JSONObject() {
                {
                    put("node_name", node.getNodeTitle());
                    put("node_id", node.getNodeId());
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
