package com.mngsolution.sellam.service;

import com.mngsolution.sellam.service.dto.EntrepriseDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mngsolution.sellam.domain.Entreprise}.
 */
public interface EntrepriseService {
    /**
     * Save a entreprise.
     *
     * @param entrepriseDTO the entity to save.
     * @return the persisted entity.
     */
    EntrepriseDTO save(EntrepriseDTO entrepriseDTO);

    /**
     * Updates a entreprise.
     *
     * @param entrepriseDTO the entity to update.
     * @return the persisted entity.
     */
    EntrepriseDTO update(EntrepriseDTO entrepriseDTO);

    /**
     * Partially updates a entreprise.
     *
     * @param entrepriseDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<EntrepriseDTO> partialUpdate(EntrepriseDTO entrepriseDTO);

    /**
     * Get all the entreprises.
     *
     * @return the list of entities.
     */
    List<EntrepriseDTO> findAll();

    /**
     * Get the "id" entreprise.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EntrepriseDTO> findOne(Long id);

    /**
     * Delete the "id" entreprise.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
