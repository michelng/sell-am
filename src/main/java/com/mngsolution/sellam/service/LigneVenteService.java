package com.mngsolution.sellam.service;

import com.mngsolution.sellam.service.dto.LigneVenteDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mngsolution.sellam.domain.LigneVente}.
 */
public interface LigneVenteService {
    /**
     * Save a ligneVente.
     *
     * @param ligneVenteDTO the entity to save.
     * @return the persisted entity.
     */
    LigneVenteDTO save(LigneVenteDTO ligneVenteDTO);

    /**
     * Updates a ligneVente.
     *
     * @param ligneVenteDTO the entity to update.
     * @return the persisted entity.
     */
    LigneVenteDTO update(LigneVenteDTO ligneVenteDTO);

    /**
     * Partially updates a ligneVente.
     *
     * @param ligneVenteDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LigneVenteDTO> partialUpdate(LigneVenteDTO ligneVenteDTO);

    /**
     * Get all the ligneVentes.
     *
     * @return the list of entities.
     */
    List<LigneVenteDTO> findAll();

    /**
     * Get the "id" ligneVente.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LigneVenteDTO> findOne(Long id);

    /**
     * Delete the "id" ligneVente.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
