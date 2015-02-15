package items;

public class Student implements Searchable {
    private int studentId;
    private String studentTitle;

    public Student(int studentId, String studentTitle) {
        this.studentId = studentId;
        this.studentTitle = studentTitle;
    }

    @Override
    public int getId() {
        return studentId;
    }

    @Override
    public void setId(int studentId) {
        this.studentId = studentId;
    }

    @Override
    public String getTitle() {
        return studentTitle;
    }

    @Override
    public void setTitle(String studentTitle) {
        this.studentTitle = studentTitle;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Student other = (Student) obj;
        if ((this.getTitle() == null) ? (other.getTitle() != null) : !this.getTitle().equals(other.getTitle())) {
            return false;
        }
        if (this.getId() != other.getId()) {
            return false;
        }
        return true;
    }
}
