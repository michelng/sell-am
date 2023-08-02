package com.mngsolution.sellam.web.rest;

import com.mngsolution.sellam.repository.MvtStckRepository;
import com.mngsolution.sellam.service.MvtStckService;
import com.mngsolution.sellam.service.dto.MvtStckDTO;
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
 * REST controller for managing {@link com.mngsolution.sellam.domain.MvtStck}.
 */
@RestController
@RequestMapping("/api")
public class MvtStckResource {

    private final Logger log = LoggerFactory.getLogger(MvtStckResource.class);

    private static final String ENTITY_NAME = "mvtStck";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MvtStckService mvtStckService;

    private final MvtStckRepository mvtStckRepository;

    public MvtStckResource(MvtStckService mvtStckService, MvtStckRepository mvtStckRepository) {
        this.mvtStckService = mvtStckService;
        this.mvtStckRepository = mvtStckRepository;
    }

    /**
     * {@code POST  /mvt-stcks} : Create a new mvtStck.
     *
     * @param mvtStckDTO the mvtStckDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mvtStckDTO, or with status {@code 400 (Bad Request)} if the mvtStck has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mvt-stcks")
    public ResponseEntity<MvtStckDTO> createMvtStck(@RequestBody MvtStckDTO mvtStckDTO) throws URISyntaxException {
        log.debug("REST request to save MvtStck : {}", mvtStckDTO);
        if (mvtStckDTO.getId() != null) {
            throw new BadRequestAlertException("A new mvtStck cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MvtStckDTO result = mvtStckService.save(mvtStckDTO);
        return ResponseEntity
            .created(new URI("/api/mvt-stcks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mvt-stcks/:id} : Updates an existing mvtStck.
     *
     * @param id the id of the mvtStckDTO to save.
     * @param mvtStckDTO the mvtStckDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mvtStckDTO,
     * or with status {@code 400 (Bad Request)} if the mvtStckDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mvtStckDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/mvt-stcks/{id}")
    public ResponseEntity<MvtStckDTO> updateMvtStck(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MvtStckDTO mvtStckDTO
    ) throws URISyntaxException {
        log.debug("REST request to update MvtStck : {}, {}", id, mvtStckDTO);
        if (mvtStckDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mvtStckDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mvtStckRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MvtStckDTO result = mvtStckService.update(mvtStckDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mvtStckDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /mvt-stcks/:id} : Partial updates given fields of an existing mvtStck, field will ignore if it is null
     *
     * @param id the id of the mvtStckDTO to save.
     * @param mvtStckDTO the mvtStckDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mvtStckDTO,
     * or with status {@code 400 (Bad Request)} if the mvtStckDTO is not valid,
     * or with status {@code 404 (Not Found)} if the mvtStckDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the mvtStckDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/mvt-stcks/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MvtStckDTO> partialUpdateMvtStck(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MvtStckDTO mvtStckDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update MvtStck partially : {}, {}", id, mvtStckDTO);
        if (mvtStckDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mvtStckDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mvtStckRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MvtStckDTO> result = mvtStckService.partialUpdate(mvtStckDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mvtStckDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /mvt-stcks} : get all the mvtStcks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mvtStcks in body.
     */
    @GetMapping("/mvt-stcks")
    public List<MvtStckDTO> getAllMvtStcks() {
        log.debug("REST request to get all MvtStcks");
        return mvtStckService.findAll();
    }

    /**
     * {@code GET  /mvt-stcks/:id} : get the "id" mvtStck.
     *
     * @param id the id of the mvtStckDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mvtStckDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/mvt-stcks/{id}")
    public ResponseEntity<MvtStckDTO> getMvtStck(@PathVariable Long id) {
        log.debug("REST request to get MvtStck : {}", id);
        Optional<MvtStckDTO> mvtStckDTO = mvtStckService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mvtStckDTO);
    }

    /**
     * {@code DELETE  /mvt-stcks/:id} : delete the "id" mvtStck.
     *
     * @param id the id of the mvtStckDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/mvt-stcks/{id}")
    public ResponseEntity<Void> deleteMvtStck(@PathVariable Long id) {
        log.debug("REST request to delete MvtStck : {}", id);
        mvtStckService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
