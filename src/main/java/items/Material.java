package items;

public class Material {
    private int materialId;
    private String materialTitle;

    public Material(int materialId, String materialTitle) {
        this.materialId = materialId;
        this.materialTitle = materialTitle;
    }

    public int getMaterialId() {
        return materialId;
    }

    public void setMaterialId(int materialId) {
        this.materialId = materialId;
    }

    public String getMaterialTitle() {
        return materialTitle;
    }

    public void setMaterialTitle(String materialTitle) {
        this.materialTitle = materialTitle;
    }
}
