package com.mngsolution.sellam.service;

import com.mngsolution.sellam.service.dto.LigneCmdFournisseurDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mngsolution.sellam.domain.LigneCmdFournisseur}.
 */
public interface LigneCmdFournisseurService {
    /**
     * Save a ligneCmdFournisseur.
     *
     * @param ligneCmdFournisseurDTO the entity to save.
     * @return the persisted entity.
     */
    LigneCmdFournisseurDTO save(LigneCmdFournisseurDTO ligneCmdFournisseurDTO);

    /**
     * Updates a ligneCmdFournisseur.
     *
     * @param ligneCmdFournisseurDTO the entity to update.
     * @return the persisted entity.
     */
    LigneCmdFournisseurDTO update(LigneCmdFournisseurDTO ligneCmdFournisseurDTO);

    /**
     * Partially updates a ligneCmdFournisseur.
     *
     * @param ligneCmdFournisseurDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LigneCmdFournisseurDTO> partialUpdate(LigneCmdFournisseurDTO ligneCmdFournisseurDTO);

    /**
     * Get all the ligneCmdFournisseurs.
     *
     * @return the list of entities.
     */
    List<LigneCmdFournisseurDTO> findAll();

    /**
     * Get the "id" ligneCmdFournisseur.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LigneCmdFournisseurDTO> findOne(Long id);

    /**
     * Delete the "id" ligneCmdFournisseur.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
