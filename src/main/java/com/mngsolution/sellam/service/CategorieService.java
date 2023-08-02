package com.mngsolution.sellam.service;

import com.mngsolution.sellam.service.dto.CategorieDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mngsolution.sellam.domain.Categorie}.
 */
public interface CategorieService {
    /**
     * Save a categorie.
     *
     * @param categorieDTO the entity to save.
     * @return the persisted entity.
     */
    CategorieDTO save(CategorieDTO categorieDTO);

    /**
     * Updates a categorie.
     *
     * @param categorieDTO the entity to update.
     * @return the persisted entity.
     */
    CategorieDTO update(CategorieDTO categorieDTO);

    /**
     * Partially updates a categorie.
     *
     * @param categorieDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CategorieDTO> partialUpdate(CategorieDTO categorieDTO);

    /**
     * Get all the categories.
     *
     * @return the list of entities.
     */
    List<CategorieDTO> findAll();

    /**
     * Get the "id" categorie.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CategorieDTO> findOne(Long id);

    /**
     * Delete the "id" categorie.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
