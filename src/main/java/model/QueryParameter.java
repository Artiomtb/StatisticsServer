package model;

public class QueryParameter {
    public enum ParameterType {VARCHAR, INT, DATE}

    ;

    private ParameterType type;
    private Object value;

    public QueryParameter(ParameterType type, Object value) {
        this.type = type;
        this.value = value;
    }

    public ParameterType getType() {
        return type;
    }

    public Object getValue() {
        return value;
    }

}