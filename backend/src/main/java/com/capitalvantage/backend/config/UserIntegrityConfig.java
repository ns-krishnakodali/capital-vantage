package com.capitalvantage.backend.config;

import com.capitalvantage.backend.exception.UserConfigIntegrityException;
import com.capitalvantage.backend.repository.UserConfigRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(
        value = "app.database.verify-on-startup",
        havingValue = "true",
        matchIfMissing = true
)
public class UserIntegrityConfig implements ApplicationRunner {
    private final UserConfigRepository userConfigRepository;

    public UserIntegrityConfig(UserConfigRepository userConfigRepository) {
        this.userConfigRepository = userConfigRepository;
    }

    @Override
    public void run(@NonNull ApplicationArguments args) {
        long count = userConfigRepository.count();
        if (count > 1) {
            throw new UserConfigIntegrityException("Multiple user configuration rows found.");
        }
        if (count == 1 && userConfigRepository.findById(1).isEmpty()) {
            throw new UserConfigIntegrityException("User configuration must use the fixed ID 1.");
        }
    }
}
