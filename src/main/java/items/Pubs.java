package items;

import java.util.ArrayList;
import java.util.Collection;

public class Pubs {

    private Collection<Pub> pubs = new ArrayList<Pub>();
    private int totalPages;
    private int currentPage;

    public Pubs() {
    }

    public Pubs(Collection<Pub> pubs) {
    }

    public Collection<Pub> getPubs() {
        return pubs;
    }

    public void setPubs(Collection<Pub> pubs) {
        this.pubs = pubs;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }
}
