package org.example.repository;

import org.example.model.Center;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CenterRepository extends JpaRepository<Center, Integer> {
}
