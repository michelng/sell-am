package com.mngsolution.sellam.service;

import com.mngsolution.sellam.service.dto.VenteDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mngsolution.sellam.domain.Vente}.
 */
public interface VenteService {
    /**
     * Save a vente.
     *
     * @param venteDTO the entity to save.
     * @return the persisted entity.
     */
    VenteDTO save(VenteDTO venteDTO);

    /**
     * Updates a vente.
     *
     * @param venteDTO the entity to update.
     * @return the persisted entity.
     */
    VenteDTO update(VenteDTO venteDTO);

    /**
     * Partially updates a vente.
     *
     * @param venteDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<VenteDTO> partialUpdate(VenteDTO venteDTO);

    /**
     * Get all the ventes.
     *
     * @return the list of entities.
     */
    List<VenteDTO> findAll();

    /**
     * Get the "id" vente.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VenteDTO> findOne(Long id);

    /**
     * Delete the "id" vente.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
