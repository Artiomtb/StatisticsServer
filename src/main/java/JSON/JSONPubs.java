package JSON;

import items.Pub;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Collection;

public class JSONPubs implements JSONHandler {
    private Collection<Pub> pubs;
    private int page;
    private JSONObject jsonObject = new JSONObject();


    public JSONPubs(Collection<Pub> pubs, int page) {
        this.pubs = pubs;
        this.page = page;
        setJSONObject();
    }

    private void setJSONObject() {
        jsonObject.put("pages", this.page);
        JSONArray nodesArray = new JSONArray();
        for (final Pub pub : this.pubs) {
            nodesArray.add(new JSONObject() {
                {
                    put("pub_name", pub.getPubTitle());
                    put("pub_id", pub.getPubId());
                }
            });
        }
        jsonObject.put("pubs", nodesArray);
    }

    @Override
    public String getJSONString() {
        return this.jsonObject.toJSONString();
    }
}
