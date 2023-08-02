package com.mngsolution.sellam.service;

import com.mngsolution.sellam.service.dto.CmdClientDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mngsolution.sellam.domain.CmdClient}.
 */
public interface CmdClientService {
    /**
     * Save a cmdClient.
     *
     * @param cmdClientDTO the entity to save.
     * @return the persisted entity.
     */
    CmdClientDTO save(CmdClientDTO cmdClientDTO);

    /**
     * Updates a cmdClient.
     *
     * @param cmdClientDTO the entity to update.
     * @return the persisted entity.
     */
    CmdClientDTO update(CmdClientDTO cmdClientDTO);

    /**
     * Partially updates a cmdClient.
     *
     * @param cmdClientDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CmdClientDTO> partialUpdate(CmdClientDTO cmdClientDTO);

    /**
     * Get all the cmdClients.
     *
     * @return the list of entities.
     */
    List<CmdClientDTO> findAll();

    /**
     * Get the "id" cmdClient.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CmdClientDTO> findOne(Long id);

    /**
     * Delete the "id" cmdClient.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
