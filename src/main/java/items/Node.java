package items;

public class Node {
    private int nodeId;
    private String nodeTitle;

    public Node(int nodeId, String nodeTitle) {
        this.nodeId = nodeId;
        this.nodeTitle = nodeTitle;
    }

    public int getNodeId() {
        return nodeId;
    }

    public void setNodeId(int nodeId) {
        this.nodeId = nodeId;
    }

    public String getNodeTitle() {
        return nodeTitle;
    }

    public void setNodeTitle(String nodeTitle) {
        this.nodeTitle = nodeTitle;
    }
}
