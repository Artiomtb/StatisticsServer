package items;

public class Pub {
    private int pubId;
    private String pubTitle;

    public Pub(int pubId, String pubTitle) {
        this.pubId = pubId;
        this.pubTitle = pubTitle;
    }

    public int getPubId() {
        return pubId;
    }

    public void setPubId(int pubId) {
        this.pubId = pubId;
    }

    public String getPubTitle() {
        return pubTitle;
    }

    public void setPubTitle(String pubTitle) {
        this.pubTitle = pubTitle;
    }
}
