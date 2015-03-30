package JSON;

import org.json.simple.JSONObject;

public class JSONSearchResults implements JSONHandler {

    private JSONObject jsonObject = new JSONObject();
    private JSONSearchItems jsonSearchResults;
    private int currentPage;
    private int totalPages;

    public JSONSearchResults(JSONSearchItems jsonSearchResults, int currentPage, int totalPages) {
        this.jsonSearchResults = jsonSearchResults;
        this.currentPage = currentPage;
        System.out.println(totalPages);
        this.totalPages = totalPages;
        setJSONObject();
    }

    private void setJSONObject() {
        jsonObject.put("current_page", this.currentPage);
        jsonObject.put("pages", this.totalPages);
        jsonObject.put("results", this.jsonSearchResults.getJSONObject());
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
