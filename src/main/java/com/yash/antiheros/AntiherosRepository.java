package com.yash.antiheros;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AntiherosRepository extends JpaRepository<Antihero, Long> {

    List<Antihero> findByUniverse(String universe);

    List<Antihero> findByNameContainingIgnoreCase(String name);
}
