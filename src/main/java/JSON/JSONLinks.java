package JSON;

import items.LinkContainer;
import items.Node;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.ArrayList;
import java.util.Map;
import java.util.Set;

public class JSONLinks implements JSONHandler {

    private JSONObject jsonObject = new JSONObject();
    private Map<Integer, Set<Integer>> nodeLinks;
    private int linkTime;
    private ArrayList<Node> nodes;

    public JSONLinks(LinkContainer linkContainer) {
        if (linkContainer != null) {
            this.nodeLinks = linkContainer.getNodeLinks();
            this.linkTime = linkContainer.getLinkTime();
            this.nodes = linkContainer.getNodes();
        }
        setJsonObject();
    }

    private void setJsonObject() {
        final JSONArray nodesArray = new JSONArray();
        for (final Node node : nodes) {
            nodesArray.add(new JSONObject() {
                {
                    put("name", node.getNodeTitle());
                    put("group", 1);
                }
            });
        }
        final JSONArray linksArray = new JSONArray();
        for (Map.Entry entry : nodeLinks.entrySet()) {
            final int nodeA = (Integer) entry.getKey();
            Set<Integer> nodesB = (Set<Integer>) entry.getValue();
            for (final int nodeB : nodesB) {
                linksArray.add(new JSONObject() {
                    {
                        put("source", nodeA);
                        put("target", nodeB);
                    }
                });
            }
        }
        jsonObject.put("link_time", linkTime);
        jsonObject.put("nodes", nodesArray);
        jsonObject.put("links", linksArray);
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
