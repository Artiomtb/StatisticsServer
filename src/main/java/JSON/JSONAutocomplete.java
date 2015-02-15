package JSON;

import items.Searchable;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.ArrayList;

public class JSONAutocomplete implements JSONHandler {

    private JSONObject jsonObject = new JSONObject();
    private ArrayList<Searchable> items;

    public JSONAutocomplete(ArrayList<Searchable> items) {
        this.items = items;
        setJsonObject();
    }

    private void setJsonObject() {
        JSONArray jsonArray = new JSONArray();
        for (final Searchable item : items) {
            jsonArray.add(new JSONObject() {{
                put("id", item.getId());
                put("name", item.getTitle());
            }});
        }
        jsonObject.put("items", jsonArray);
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
