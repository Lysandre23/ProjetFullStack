package org.example.repository;

import org.example.model.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CenterRepository extends JpaRepository<Center, Integer> {
    @Query("SELECT c FROM Center c WHERE LOWER(c.city) LIKE LOWER(CONCAT('%', :city, '%'))")
    public List<Center> findByCityLike(@Param("city") String city);
    @Query("SELECT c FROM Center c WHERE c.id == :id")
    public Center findById(@Param("id") int id);
}
