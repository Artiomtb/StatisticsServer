package items;

import java.util.Collection;

public class Students {
    private Collection<Student> students;
    private int totalPages;
    private int currentPage;

    public Students() {
    }

    public Students(Collection<Student> students) {
        this.students = students;
    }

    public Collection<Student> getStudents() {
        return students;
    }

    public void setStudents(Collection<Student> students) {
        this.students = students;
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
