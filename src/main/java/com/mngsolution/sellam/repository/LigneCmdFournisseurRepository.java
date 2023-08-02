package com.mngsolution.sellam.repository;

import com.mngsolution.sellam.domain.LigneCmdFournisseur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the LigneCmdFournisseur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LigneCmdFournisseurRepository extends JpaRepository<LigneCmdFournisseur, Long> {}
