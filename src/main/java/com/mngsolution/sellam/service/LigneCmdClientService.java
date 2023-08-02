package com.mngsolution.sellam.service;

import com.mngsolution.sellam.service.dto.LigneCmdClientDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mngsolution.sellam.domain.LigneCmdClient}.
 */
public interface LigneCmdClientService {
    /**
     * Save a ligneCmdClient.
     *
     * @param ligneCmdClientDTO the entity to save.
     * @return the persisted entity.
     */
    LigneCmdClientDTO save(LigneCmdClientDTO ligneCmdClientDTO);

    /**
     * Updates a ligneCmdClient.
     *
     * @param ligneCmdClientDTO the entity to update.
     * @return the persisted entity.
     */
    LigneCmdClientDTO update(LigneCmdClientDTO ligneCmdClientDTO);

    /**
     * Partially updates a ligneCmdClient.
     *
     * @param ligneCmdClientDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LigneCmdClientDTO> partialUpdate(LigneCmdClientDTO ligneCmdClientDTO);

    /**
     * Get all the ligneCmdClients.
     *
     * @return the list of entities.
     */
    List<LigneCmdClientDTO> findAll();

    /**
     * Get the "id" ligneCmdClient.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LigneCmdClientDTO> findOne(Long id);

    /**
     * Delete the "id" ligneCmdClient.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
