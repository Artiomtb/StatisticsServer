package model;

import java.sql.*;
import java.util.ArrayList;

public class ConnectionsHandler {
    private PreparedStatement preparedStatement;
    private ResultSet resultSet;

    public ConnectionsHandler(Connection connection, String query, ArrayList<QueryParameter> params) throws SQLException {
        this.preparedStatement = connection.prepareStatement(query);
        int index = 1;
        for (QueryParameter parameter : params) {
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
            index++;
        }
        this.resultSet = this.preparedStatement.executeQuery();
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
