package com.mngsolution.sellam.repository;

import com.mngsolution.sellam.domain.CmdClient;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CmdClient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmdClientRepository extends JpaRepository<CmdClient, Long> {}
