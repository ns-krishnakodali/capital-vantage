package com.capitalvantage.backend;

import com.capitalvantage.backend.repository.UserConfigRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import java.lang.reflect.Proxy;
import java.util.Optional;

@SpringBootTest
class BackendApplicationTests {

    @Test
    void contextLoads() {
    }

    @TestConfiguration
    static class TestConfig {
        @Bean
        UserConfigRepository userConfigRepository() {
            return (UserConfigRepository) Proxy.newProxyInstance(
                    UserConfigRepository.class.getClassLoader(),
                    new Class[]{UserConfigRepository.class},
                    (proxy, method, args) -> switch (method.getName()) {
                        case "count" -> 0L;
                        case "findById" -> Optional.empty();
                        case "save" -> args[0];
                        case "existsById" -> false;
                        case "toString" -> "UserConfigRepositoryTestProxy";
                        case "hashCode" -> System.identityHashCode(proxy);
                        case "equals" -> proxy == args[0];
                        default -> throw new UnsupportedOperationException(method.getName());
                    }
            );
        }
    }

}
