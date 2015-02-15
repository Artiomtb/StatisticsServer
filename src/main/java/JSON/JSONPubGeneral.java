package JSON;

import items.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

public class JSONPubGeneral implements JSONHandler {
    private Pub pub;
    private Map<Node, Integer> materialAttendance;
    private Map<Student, Integer> studentAttendance;
    private Collection<Trend> trendAttendance;
    private JSONObject jsonObject = new JSONObject();
    private Map<Node, Collection<Trend>> materialTrendAttendance;
    private LinkContainer linkContainer;

    public JSONPubGeneral(GeneralPubContainer generalPubContainer) {
        if (generalPubContainer != null) {
            Pub pub = generalPubContainer.getPub();
            if (pub != null) {
                this.pub = pub;
                this.materialAttendance = generalPubContainer.getMaterialAttendance();
                this.studentAttendance = generalPubContainer.getStudentAttendance();
                this.trendAttendance = generalPubContainer.getTrendAttendance();
                this.materialTrendAttendance = generalPubContainer.getMaterialTrendAttendance();
                this.linkContainer = generalPubContainer.getLinkContainer();
                setJSONObject();
            }
        }
    }

    private void setJSONObject() {
        jsonObject.put("pub_id", pub.getId());
        jsonObject.put("pub_name", pub.getTitle());
        final JSONArray materialsArray = new JSONArray();
        for (final Map.Entry entry : materialAttendance.entrySet()) {
            final Node node = (Node) entry.getKey();
            materialsArray.add(new JSONObject() {
                {
                    put("material_id", node.getNodeId());
                    put("material_name", node.getNodeTitle());
                    put("total_attendance", entry.getValue());
                }
            });
        }
        jsonObject.put("materials", materialsArray);
        JSONArray studentArray = new JSONArray();
        for (final Map.Entry entry : studentAttendance.entrySet()) {
            final Student student = (Student) entry.getKey();
            studentArray.add(new JSONObject() {
                {
                    put("party_id", student.getId());
                    put("party_name", student.getTitle());
                    put("total_attendance", entry.getValue());
                }
            });
        }
        jsonObject.put("students", studentArray);
        JSONArray trendArray = new JSONArray();
        for (final Trend trend : this.trendAttendance) {
            trendArray.add(new JSONObject() {
                {
                    put("date", trend.getDate().toString());
                    put("time", trend.getAttendance());
                }
            });
        }
        jsonObject.put("trend", trendArray);
        JSONArray materialTrendArray = new JSONArray();
        for (final Map.Entry entry : materialTrendAttendance.entrySet()) {
            final Node currentNode = (Node) entry.getKey();
            final Collection<Trend> currentMaterialTrend = (Collection<Trend>) entry.getValue();
            final JSONArray currentMaterialArray = new JSONArray();
            for (final Trend trend : currentMaterialTrend) {
                currentMaterialArray.add(new JSONObject() {
                    {
                        put("date", trend.getDate().toString());
                        put("time", trend.getAttendance());
                    }
                });
            }
            materialTrendArray.add(new JSONObject() {
                {
                    put("material_name", currentNode.getNodeTitle());
                    put("trend", currentMaterialArray);
                }
            });

        }
        jsonObject.put("materials_trends", materialTrendArray);
        final JSONArray nodesArray = new JSONArray();
        for (final Node node : linkContainer.getNodes()) {
            nodesArray.add(new JSONObject() {
                {
                    put("name", node.getNodeTitle());
                    put("group", 1);
                }
            });
        }
        final JSONArray linksArray = new JSONArray();
        for (Map.Entry entry : linkContainer.getNodeLinks().entrySet()) {
            final int nodeA = (Integer) entry.getKey();
            Set<Integer> nodesB = (Set<Integer>) entry.getValue();
            for (final int nodeB : nodesB) {
                linksArray.add(new JSONObject() {
                    {
                        put("source", nodeA);
                        put("target", nodeB);
                    }
                });
            }
        }
        jsonObject.put("transitions", new JSONLinks(linkContainer).getJSONObject());
    }

    @Override
    public String getJSONString() {
        return this.jsonObject.toJSONString();
    }

    @Override
    public JSONObject getJSONObject() {
        return this.jsonObject;
    }
}
