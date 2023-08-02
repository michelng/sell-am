package com.mngsolution.sellam.service;

import com.mngsolution.sellam.service.dto.MvtStckDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mngsolution.sellam.domain.MvtStck}.
 */
public interface MvtStckService {
    /**
     * Save a mvtStck.
     *
     * @param mvtStckDTO the entity to save.
     * @return the persisted entity.
     */
    MvtStckDTO save(MvtStckDTO mvtStckDTO);

    /**
     * Updates a mvtStck.
     *
     * @param mvtStckDTO the entity to update.
     * @return the persisted entity.
     */
    MvtStckDTO update(MvtStckDTO mvtStckDTO);

    /**
     * Partially updates a mvtStck.
     *
     * @param mvtStckDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<MvtStckDTO> partialUpdate(MvtStckDTO mvtStckDTO);

    /**
     * Get all the mvtStcks.
     *
     * @return the list of entities.
     */
    List<MvtStckDTO> findAll();

    /**
     * Get the "id" mvtStck.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MvtStckDTO> findOne(Long id);

    /**
     * Delete the "id" mvtStck.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
