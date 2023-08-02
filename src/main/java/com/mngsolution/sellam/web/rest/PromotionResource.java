package com.mngsolution.sellam.web.rest;

import com.mngsolution.sellam.repository.PromotionRepository;
import com.mngsolution.sellam.service.PromotionService;
import com.mngsolution.sellam.service.dto.PromotionDTO;
import com.mngsolution.sellam.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mngsolution.sellam.domain.Promotion}.
 */
@RestController
@RequestMapping("/api")
public class PromotionResource {

    private final Logger log = LoggerFactory.getLogger(PromotionResource.class);

    private static final String ENTITY_NAME = "promotion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PromotionService promotionService;

    private final PromotionRepository promotionRepository;

    public PromotionResource(PromotionService promotionService, PromotionRepository promotionRepository) {
        this.promotionService = promotionService;
        this.promotionRepository = promotionRepository;
    }

    /**
     * {@code POST  /promotions} : Create a new promotion.
     *
     * @param promotionDTO the promotionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new promotionDTO, or with status {@code 400 (Bad Request)} if the promotion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/promotions")
    public ResponseEntity<PromotionDTO> createPromotion(@RequestBody PromotionDTO promotionDTO) throws URISyntaxException {
        log.debug("REST request to save Promotion : {}", promotionDTO);
        if (promotionDTO.getId() != null) {
            throw new BadRequestAlertException("A new promotion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PromotionDTO result = promotionService.save(promotionDTO);
        return ResponseEntity
            .created(new URI("/api/promotions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /promotions/:id} : Updates an existing promotion.
     *
     * @param id the id of the promotionDTO to save.
     * @param promotionDTO the promotionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated promotionDTO,
     * or with status {@code 400 (Bad Request)} if the promotionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the promotionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/promotions/{id}")
    public ResponseEntity<PromotionDTO> updatePromotion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PromotionDTO promotionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Promotion : {}, {}", id, promotionDTO);
        if (promotionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, promotionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!promotionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PromotionDTO result = promotionService.update(promotionDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, promotionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /promotions/:id} : Partial updates given fields of an existing promotion, field will ignore if it is null
     *
     * @param id the id of the promotionDTO to save.
     * @param promotionDTO the promotionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated promotionDTO,
     * or with status {@code 400 (Bad Request)} if the promotionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the promotionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the promotionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/promotions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PromotionDTO> partialUpdatePromotion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PromotionDTO promotionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Promotion partially : {}, {}", id, promotionDTO);
        if (promotionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, promotionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!promotionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PromotionDTO> result = promotionService.partialUpdate(promotionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, promotionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /promotions} : get all the promotions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of promotions in body.
     */
    @GetMapping("/promotions")
    public List<PromotionDTO> getAllPromotions() {
        log.debug("REST request to get all Promotions");
        return promotionService.findAll();
    }

    /**
     * {@code GET  /promotions/:id} : get the "id" promotion.
     *
     * @param id the id of the promotionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the promotionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/promotions/{id}")
    public ResponseEntity<PromotionDTO> getPromotion(@PathVariable Long id) {
        log.debug("REST request to get Promotion : {}", id);
        Optional<PromotionDTO> promotionDTO = promotionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(promotionDTO);
    }

    /**
     * {@code DELETE  /promotions/:id} : delete the "id" promotion.
     *
     * @param id the id of the promotionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/promotions/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        log.debug("REST request to delete Promotion : {}", id);
        promotionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
