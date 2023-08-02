package com.mngsolution.sellam.repository;

import com.mngsolution.sellam.domain.CmdFournisseur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CmdFournisseur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmdFournisseurRepository extends JpaRepository<CmdFournisseur, Long> {}
