package com.mngsolution.sellam.repository;

import com.mngsolution.sellam.domain.LigneVente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the LigneVente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LigneVenteRepository extends JpaRepository<LigneVente, Long> {}
