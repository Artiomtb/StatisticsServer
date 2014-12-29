package items;

import java.util.Date;

public class Trend {
    private Date date;
    private int attendance;

    public Trend(Date date, int attendance) {
        this.date = date;
        this.attendance = attendance;
    }

    public Date getDate() {
        return date;
    }

    public int getAttendance() {
        return attendance;
    }
}
