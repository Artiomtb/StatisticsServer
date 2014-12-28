package items;

public class Student {
    private int studentId;
    private String studentTitle;

    public Student(int studentId, String studentTitle) {
        this.studentId = studentId;
        this.studentTitle = studentTitle;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getStudentTitle() {
        return studentTitle;
    }

    public void setStudentTitle(String studentTitle) {
        this.studentTitle = studentTitle;
    }
}
