package com.mngsolution.sellam.service;

import com.mngsolution.sellam.service.dto.RoleEmployeDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mngsolution.sellam.domain.RoleEmploye}.
 */
public interface RoleEmployeService {
    /**
     * Save a roleEmploye.
     *
     * @param roleEmployeDTO the entity to save.
     * @return the persisted entity.
     */
    RoleEmployeDTO save(RoleEmployeDTO roleEmployeDTO);

    /**
     * Updates a roleEmploye.
     *
     * @param roleEmployeDTO the entity to update.
     * @return the persisted entity.
     */
    RoleEmployeDTO update(RoleEmployeDTO roleEmployeDTO);

    /**
     * Partially updates a roleEmploye.
     *
     * @param roleEmployeDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<RoleEmployeDTO> partialUpdate(RoleEmployeDTO roleEmployeDTO);

    /**
     * Get all the roleEmployes.
     *
     * @return the list of entities.
     */
    List<RoleEmployeDTO> findAll();

    /**
     * Get the "id" roleEmploye.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RoleEmployeDTO> findOne(Long id);

    /**
     * Delete the "id" roleEmploye.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
