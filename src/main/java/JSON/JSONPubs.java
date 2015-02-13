package JSON;

import items.Pub;
import items.Pubs;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Collection;

public class JSONPubs implements JSONHandler {
    private Collection<Pub> pubs;
    private int currentPage;
    private int totalPages;
    private JSONObject jsonObject = new JSONObject();


    public JSONPubs(Pubs pubs) {
        this.pubs = pubs.getPubs();
        this.currentPage = pubs.getCurrentPage();
        this.totalPages = pubs.getTotalPages();
        setJSONObject();
    }

    private void setJSONObject() {
        jsonObject.put("current_page", this.currentPage);
        jsonObject.put("pages", this.totalPages);
        JSONArray nodesArray = new JSONArray();
        for (final Pub pub : this.pubs) {
            nodesArray.add(new JSONObject() {
                {
                    put("pub_name", pub.getTitle());
                    put("pub_id", pub.getId());
                }
            });
        }
        jsonObject.put("pubs", nodesArray);
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
