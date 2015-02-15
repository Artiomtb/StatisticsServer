package items;

public class Pub implements Searchable {
    private int pubId;
    private String pubTitle;

    public Pub(int pubId, String pubTitle) {
        this.pubId = pubId;
        this.pubTitle = pubTitle;
    }

    @Override
    public int getId() {
        return pubId;
    }

    @Override
    public void setId(int pubId) {
        this.pubId = pubId;
    }

    @Override
    public String getTitle() {
        return pubTitle;
    }

    @Override
    public void setTitle(String pubTitle) {
        this.pubTitle = pubTitle;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Pub other = (Pub) obj;
        if ((this.getTitle() == null) ? (other.getTitle() != null) : !this.getTitle().equals(other.getTitle())) {
            return false;
        }
        if (this.getId() != other.getId()) {
            return false;
        }
        return true;
    }
}
