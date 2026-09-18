package com.capitalvantage.backend.config;

import org.jspecify.annotations.NonNull;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@Component
@ConditionalOnProperty(
        value = "app.database.verify-on-startup",
        havingValue = "true",
        matchIfMissing = true
)
public class DatabaseConnection implements ApplicationRunner {

    private final DataSource dataSource;

    public DatabaseConnection(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(@NonNull ApplicationArguments args) {
        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement()) {
            statement.execute("SELECT 1");
        } catch (SQLException exception) {
            throw new IllegalStateException("Failed to connect to the database.", exception);
        }
    }
}
