package com.mngsolution.sellam.repository;

import com.mngsolution.sellam.domain.LigneCmdClient;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the LigneCmdClient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LigneCmdClientRepository extends JpaRepository<LigneCmdClient, Long> {}
