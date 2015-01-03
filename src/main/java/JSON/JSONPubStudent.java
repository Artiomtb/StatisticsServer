package JSON;

import items.MaterialStatContainer;
import items.Pub;
import items.PubStudentContainer;
import items.Trend;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Collection;

public class JSONPubStudent implements JSONHandler {

    private Pub pub;
    private Collection<Trend> totalTrend;
    private Collection<MaterialStatContainer> materialTrend;
    private JSONObject jsonObject = new JSONObject();

    public JSONPubStudent(PubStudentContainer pubStudentContainer) {
        if (pubStudentContainer != null) {
            this.pub = pubStudentContainer.getPub();
            if (pub != null) {
                this.totalTrend = pubStudentContainer.getTotalTrend();
                this.materialTrend = pubStudentContainer.getMaterialTrend();
                setJSONObject();
            }
        }
    }

    private void setJSONObject() {
        jsonObject.put("pub_name", this.pub.getPubTitle());
        JSONArray totalTrendArray = new JSONArray();
        for (final Trend trend : totalTrend) {
            totalTrendArray.add(new JSONObject() {
                {
                    put("date", trend.getDate());
                    put("time", trend.getAttendance());
                }
            });
        }
        jsonObject.put("pub_stats", totalTrendArray);
        JSONArray materialsArray = new JSONArray();
        for (final MaterialStatContainer materialStatContainer : this.materialTrend) {
            final JSONArray currentMaterialTrend = new JSONArray();
            for (final Trend trend : materialStatContainer.getTrend()) {
                currentMaterialTrend.add(new JSONObject() {
                    {
                        put("date", trend.getDate());
                        put("time", trend.getAttendance());
                    }
                });
            }
            materialsArray.add(new JSONObject() {
                {
                    put("material_name", materialStatContainer.getNode().getNodeTitle());
                    put("total_attendance", materialStatContainer.getTotalAttendance());
                    put("trend", currentMaterialTrend);
                }
            });
        }
        jsonObject.put("materials", materialsArray);
    }

    @Override
    public String getJSONString() {
        return this.jsonObject.toJSONString();
    }
}
