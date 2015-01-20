package items;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.Set;

public class GeneralPubContainer {
    private Pub pub;
    private Map<Node, Integer> materialAttendance;
    private Map<Student, Integer> studentAttendance;
    private Collection<Trend> trendAttendance;
    private Map<Node, Collection<Trend>> materialTrendAttendance;
    private ArrayList<Node> nodes;
    private Map<Integer, Set<Integer>> nodeLinks;

    public GeneralPubContainer(Pub pub, Map<Node, Integer> materialAttendance, Map<Student, Integer> studentAttendance, Collection<Trend> trendAttendance, Map<Node, Collection<Trend>> materialTrendAttendance, ArrayList<Node> nodes, Map<Integer, Set<Integer>> nodeLinks) {
        this.pub = pub;
        this.materialAttendance = materialAttendance;
        this.studentAttendance = studentAttendance;
        this.trendAttendance = trendAttendance;
        this.materialTrendAttendance = materialTrendAttendance;
        this.nodes = nodes;
        this.nodeLinks = nodeLinks;
    }

    public Pub getPub() {
        return pub;
    }

    public void setPub(Pub pub) {
        this.pub = pub;
    }

    public Map<Node, Integer> getMaterialAttendance() {
        return materialAttendance;
    }

    public void setMaterialAttendance(Map<Node, Integer> materialAttendance) {
        this.materialAttendance = materialAttendance;
    }

    public Map<Student, Integer> getStudentAttendance() {
        return studentAttendance;
    }

    public void setStudentAttendance(Map<Student, Integer> studentAttendance) {
        this.studentAttendance = studentAttendance;
    }

    public Collection<Trend> getTrendAttendance() {
        return trendAttendance;
    }

    public void setTrendAttendance(Collection<Trend> trendAttendance) {
        this.trendAttendance = trendAttendance;
    }

    public Map<Node, Collection<Trend>> getMaterialTrendAttendance() {
        return materialTrendAttendance;
    }

    public void setMaterialTrendAttendance(Map<Node, Collection<Trend>> materialTrendAttendance) {
        this.materialTrendAttendance = materialTrendAttendance;
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
}
