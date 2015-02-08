package items;

import java.util.ArrayList;
import java.util.Map;
import java.util.Set;

public class LinkContainer {

    private ArrayList<Node> nodes;
    private Map<Integer, Set<Integer>> nodeLinks;
    private int linkTime;

    public LinkContainer(ArrayList<Node> nodes, Map<Integer, Set<Integer>> nodeLinks, int linkTime) {
        this.nodes = nodes;
        this.nodeLinks = nodeLinks;
        this.linkTime = linkTime;
    }

    public ArrayList<Node> getNodes() {
        return nodes;
    }

    public void setNodes(ArrayList<Node> nodes) {
        this.nodes = nodes;
    }

    public Map<Integer, Set<Integer>> getNodeLinks() {
        return nodeLinks;
    }

    public void setNodeLinks(Map<Integer, Set<Integer>> nodeLinks) {
        this.nodeLinks = nodeLinks;
    }

    public int getLinkTime() {
        return linkTime;
    }

    public void setLinkTime(int linkTime) {
        this.linkTime = linkTime;
    }
}
