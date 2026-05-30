package com.capitalvantage.backend.service;

import com.capitalvantage.backend.dto.request.UpsertUserConfigRequest;
import com.capitalvantage.backend.dto.response.UserConfigResponse;
import com.capitalvantage.backend.exception.InvalidUserConfigException;
import com.capitalvantage.backend.exception.UserConfigIntegrityException;
import com.capitalvantage.backend.exception.UserConfigNotFoundException;
import com.capitalvantage.backend.model.UserConfig;
import com.capitalvantage.backend.repository.UserConfigRepository;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Proxy;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class UserConfigServiceTest {

    private final StubUserConfigRepository stubUserConfigRepository = new StubUserConfigRepository();
    private final UserConfigRepository userConfigRepository = stubUserConfigRepository.createProxy();
    private final UserConfigService userConfigService = new UserConfigService(userConfigRepository);

    @Test
    void shouldReturnUserConfig() {
        stubUserConfigRepository.count = 1L;
        stubUserConfigRepository.findByIdResult = Optional.of(new UserConfig(1, "Jane Doe", "jane@example.com", "gpt-4.1"));

        UserConfigResponse response = userConfigService.getUserConfig();

        assertEquals("Jane Doe", response.name());
        assertEquals("jane@example.com", response.email());
        assertEquals("gpt-4.1", response.aiModel());
    }

    @Test
    void shouldThrowWhenUserConfigDoesNotExist() {
        stubUserConfigRepository.count = 0L;

        assertThrows(UserConfigNotFoundException.class, () -> userConfigService.getUserConfig());
    }

    @Test
    void shouldThrowWhenMultipleUserConfigRowsExist() {
        stubUserConfigRepository.count = 2L;

        assertThrows(UserConfigIntegrityException.class, () -> userConfigService.getUserConfig());
    }

    @Test
    void shouldCreateUserConfigWhenItDoesNotExist() {
        stubUserConfigRepository.count = 0L;
        stubUserConfigRepository.findByIdResult = Optional.empty();

        UserConfigResponse response = userConfigService.upsertUserConfig(
                new UpsertUserConfigRequest("Jane Doe", "jane@example.com", "gpt-4.1")
        );

        assertEquals("Jane Doe", response.name());
        assertEquals("jane@example.com", response.email());
        assertEquals("gpt-4.1", response.aiModel());
        assertEquals(1, stubUserConfigRepository.savedUserConfig.getId());
        assertEquals("Jane Doe", stubUserConfigRepository.savedUserConfig.getName());
        assertEquals("jane@example.com", stubUserConfigRepository.savedUserConfig.getEmail());
        assertEquals("gpt-4.1", stubUserConfigRepository.savedUserConfig.getAiModel());
    }

    @Test
    void shouldUpdateUserConfigWhenItExists() {
        UserConfig existingUserConfig = new UserConfig(1, "Old Name", "old@example.com", "gpt-4o");

        stubUserConfigRepository.count = 1L;
        stubUserConfigRepository.findByIdResult = Optional.of(existingUserConfig);

        UserConfigResponse response = userConfigService.upsertUserConfig(
                new UpsertUserConfigRequest("Jane Doe", "jane@example.com", "gpt-4.1")
        );

        assertEquals("Jane Doe", response.name());
        assertEquals("jane@example.com", response.email());
        assertEquals("gpt-4.1", response.aiModel());
    }

    @Test
    void shouldThrowWhenUserConfigUsesWrongId() {
        stubUserConfigRepository.count = 1L;
        stubUserConfigRepository.findByIdResult = Optional.empty();

        assertThrows(UserConfigIntegrityException.class, () -> userConfigService.getUserConfig());
    }

    @Test
    void shouldThrowWhenARequiredFieldIsBlank() {
        stubUserConfigRepository.count = 0L;

        assertThrows(InvalidUserConfigException.class, () -> userConfigService.upsertUserConfig(
                new UpsertUserConfigRequest(" ", "jane@example.com", "gpt-4.1")
        ));
    }

    private static class StubUserConfigRepository {
        private long count;
        private Optional<UserConfig> findByIdResult = Optional.empty();
        private UserConfig savedUserConfig;

        private UserConfigRepository createProxy() {
            return (UserConfigRepository) Proxy.newProxyInstance(
                    UserConfigRepository.class.getClassLoader(),
                    new Class[]{UserConfigRepository.class},
                    (proxy, method, args) -> switch (method.getName()) {
                        case "count" -> count;
                        case "findById" -> findByIdResult;
                        case "save" -> {
                            savedUserConfig = (UserConfig) args[0];
                            yield savedUserConfig;
                        }
                        case "existsById" -> findByIdResult.isPresent();
                        case "toString" -> "StubUserConfigRepository";
                        case "hashCode" -> System.identityHashCode(proxy);
                        case "equals" -> proxy == args[0];
                        default -> throw new UnsupportedOperationException(method.getName());
                    }
            );
        }
    }
}
