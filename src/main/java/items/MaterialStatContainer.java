package items;

import java.util.Collection;

public class MaterialStatContainer {
    private Node node;
    private int totalAttendance;
    private Collection<Trend> trend;

    public MaterialStatContainer(Node node, int totalAttendance, Collection<Trend> trend) {
        this.node = node;
        this.totalAttendance = totalAttendance;
        this.trend = trend;
    }

    public Node getNode() {
        return node;
    }

    public void setNode(Node node) {
        this.node = node;
    }

    public int getTotalAttendance() {
        return totalAttendance;
    }

    public void setTotalAttendance(int totalAttendance) {
        this.totalAttendance = totalAttendance;
    }

    public Collection<Trend> getTrend() {
        return trend;
    }

    public void setTrend(Collection<Trend> trend) {
        this.trend = trend;
    }
}
