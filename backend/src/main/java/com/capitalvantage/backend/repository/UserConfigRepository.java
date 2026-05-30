package com.capitalvantage.backend.repository;

import com.capitalvantage.backend.model.UserConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserConfigRepository extends JpaRepository<UserConfig, Integer> {
}
