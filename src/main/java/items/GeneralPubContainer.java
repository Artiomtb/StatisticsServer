package items;

import java.util.Collection;
import java.util.Map;

public class GeneralPubContainer {
    private Pub pub;
    private Map<Node, Integer> materialAttendance;
    private Map<Student, Integer> studentAttendance;
    private Collection<Trend> trendAttendance;
    private Map<Node, Collection<Trend>> materialTrendAttendance;
    private LinkContainer linkContainer;

    public GeneralPubContainer(Pub pub, Map<Node, Integer> materialAttendance, Map<Student, Integer> studentAttendance, Collection<Trend> trendAttendance, Map<Node, Collection<Trend>> materialTrendAttendance, LinkContainer linkContainer) {
        this.pub = pub;
        this.materialAttendance = materialAttendance;
        this.studentAttendance = studentAttendance;
        this.trendAttendance = trendAttendance;
        this.materialTrendAttendance = materialTrendAttendance;
        this.linkContainer = linkContainer;
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

    public LinkContainer getLinkContainer() {
        return linkContainer;
    }

    public void setLinkContainer(LinkContainer linkContainer) {
        this.linkContainer = linkContainer;
    }
}
