package com.mngsolution.sellam.service;

import com.mngsolution.sellam.service.dto.CmdFournisseurDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mngsolution.sellam.domain.CmdFournisseur}.
 */
public interface CmdFournisseurService {
    /**
     * Save a cmdFournisseur.
     *
     * @param cmdFournisseurDTO the entity to save.
     * @return the persisted entity.
     */
    CmdFournisseurDTO save(CmdFournisseurDTO cmdFournisseurDTO);

    /**
     * Updates a cmdFournisseur.
     *
     * @param cmdFournisseurDTO the entity to update.
     * @return the persisted entity.
     */
    CmdFournisseurDTO update(CmdFournisseurDTO cmdFournisseurDTO);

    /**
     * Partially updates a cmdFournisseur.
     *
     * @param cmdFournisseurDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CmdFournisseurDTO> partialUpdate(CmdFournisseurDTO cmdFournisseurDTO);

    /**
     * Get all the cmdFournisseurs.
     *
     * @return the list of entities.
     */
    List<CmdFournisseurDTO> findAll();

    /**
     * Get the "id" cmdFournisseur.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CmdFournisseurDTO> findOne(Long id);

    /**
     * Delete the "id" cmdFournisseur.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
