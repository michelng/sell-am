package com.mngsolution.sellam.repository;

import com.mngsolution.sellam.domain.MvtStck;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the MvtStck entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MvtStckRepository extends JpaRepository<MvtStck, Long> {}
