package items;

import java.util.Collection;

public class PubStudentContainer {
    private Pub pub;
    private Collection<Trend> totalTrend;
    private Collection<MaterialStatContainer> materialTrend;

    public PubStudentContainer(Pub pub, Collection<Trend> totalTrend, Collection<MaterialStatContainer> materialTrend) {
        this.pub = pub;
        this.totalTrend = totalTrend;
        this.materialTrend = materialTrend;
    }

    public Pub getPub() {
        return pub;
    }

    public void setPub(Pub pub) {
        this.pub = pub;
    }

    public Collection<Trend> getTotalTrend() {
        return totalTrend;
    }

    public void setTotalTrend(Collection<Trend> totalTrend) {
        this.totalTrend = totalTrend;
    }

    public Collection<MaterialStatContainer> getMaterialTrend() {
        return materialTrend;
    }

    public void setMaterialTrend(Collection<MaterialStatContainer> materialTrend) {
        this.materialTrend = materialTrend;
    }
}
