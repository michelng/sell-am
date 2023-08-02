package com.mngsolution.sellam.repository;

import com.mngsolution.sellam.domain.RoleEmploye;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the RoleEmploye entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoleEmployeRepository extends JpaRepository<RoleEmploye, Long> {}
