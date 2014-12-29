package items;

import java.util.Map;

public class GeneralPubContainer {
    private Pub pub;
    private Map<Node, Integer> materialAttendance;
    private Map<Student, Integer> studentAttendance;

    public GeneralPubContainer(Pub pub, Map<Node, Integer> materialAttendance, Map<Student, Integer> studentAttendance) {
        this.pub = pub;
        this.materialAttendance = materialAttendance;
        this.studentAttendance = studentAttendance;
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
}
