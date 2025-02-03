package org.example.repository;

import org.example.model.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CenterRepository extends JpaRepository<Center, Integer> {
    @Query("SELECT c FROM Center c WHERE LOWER(c.city) LIKE LOWER(CONCAT('%', :city, '%'))")
    List<Center> findByCityLike(@Param("city") String city);
    Center findById(@Param("id") int id);
}
