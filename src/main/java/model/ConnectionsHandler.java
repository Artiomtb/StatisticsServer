package model;

import java.sql.*;
import java.util.Collection;

public class ConnectionsHandler {
    private PreparedStatement preparedStatement;
    private ResultSet resultSet;

    public ConnectionsHandler(Connection connection, String query, Collection<QueryParameter> params) throws SQLException {
        this.preparedStatement = connection.prepareStatement(query);
        setQueryParams(params);
        this.resultSet = this.preparedStatement.executeQuery();
    }

    public ConnectionsHandler(Connection connection, String query, QueryParameter parameter) throws SQLException {
        this.preparedStatement = connection.prepareStatement(query);
        setQueryParam(parameter, 1);
        this.resultSet = this.preparedStatement.executeQuery();
    }

    public ConnectionsHandler(Connection connection, String query) throws SQLException {
        this.preparedStatement = connection.prepareStatement(query);
        this.resultSet = this.preparedStatement.executeQuery();
    }

    private void setQueryParams(Collection<QueryParameter> params) throws SQLException {
        int index = 1;
        for (QueryParameter parameter : params) {
            setQueryParam(parameter, index++);
        }
    }

    private void setQueryParam(QueryParameter parameter, int index) throws SQLException {
        QueryParameter.ParameterType currentType = parameter.getType();
        Object currentValue = parameter.getValue();
        switch (currentType) {
            case VARCHAR:
                this.preparedStatement.setString(index, (String) currentValue);
                break;
            case INT:
                this.preparedStatement.setInt(index, (Integer) currentValue);
                break;
            case DATE:
                this.preparedStatement.setDate(index, (Date) currentValue);
                break;
        }
    }

    public void closeHandlerConnections() throws SQLException {
        if (resultSet != null)
            resultSet.close();
        if (preparedStatement != null)
            preparedStatement.close();
    }

    public ResultSet getResultSet() {
        return resultSet;
    }
}
