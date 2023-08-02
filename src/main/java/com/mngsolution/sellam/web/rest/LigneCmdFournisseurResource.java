package com.mngsolution.sellam.web.rest;

import com.mngsolution.sellam.repository.LigneCmdFournisseurRepository;
import com.mngsolution.sellam.service.LigneCmdFournisseurService;
import com.mngsolution.sellam.service.dto.LigneCmdFournisseurDTO;
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
 * REST controller for managing {@link com.mngsolution.sellam.domain.LigneCmdFournisseur}.
 */
@RestController
@RequestMapping("/api")
public class LigneCmdFournisseurResource {

    private final Logger log = LoggerFactory.getLogger(LigneCmdFournisseurResource.class);

    private static final String ENTITY_NAME = "ligneCmdFournisseur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LigneCmdFournisseurService ligneCmdFournisseurService;

    private final LigneCmdFournisseurRepository ligneCmdFournisseurRepository;

    public LigneCmdFournisseurResource(
        LigneCmdFournisseurService ligneCmdFournisseurService,
        LigneCmdFournisseurRepository ligneCmdFournisseurRepository
    ) {
        this.ligneCmdFournisseurService = ligneCmdFournisseurService;
        this.ligneCmdFournisseurRepository = ligneCmdFournisseurRepository;
    }

    /**
     * {@code POST  /ligne-cmd-fournisseurs} : Create a new ligneCmdFournisseur.
     *
     * @param ligneCmdFournisseurDTO the ligneCmdFournisseurDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ligneCmdFournisseurDTO, or with status {@code 400 (Bad Request)} if the ligneCmdFournisseur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ligne-cmd-fournisseurs")
    public ResponseEntity<LigneCmdFournisseurDTO> createLigneCmdFournisseur(@RequestBody LigneCmdFournisseurDTO ligneCmdFournisseurDTO)
        throws URISyntaxException {
        log.debug("REST request to save LigneCmdFournisseur : {}", ligneCmdFournisseurDTO);
        if (ligneCmdFournisseurDTO.getId() != null) {
            throw new BadRequestAlertException("A new ligneCmdFournisseur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LigneCmdFournisseurDTO result = ligneCmdFournisseurService.save(ligneCmdFournisseurDTO);
        return ResponseEntity
            .created(new URI("/api/ligne-cmd-fournisseurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ligne-cmd-fournisseurs/:id} : Updates an existing ligneCmdFournisseur.
     *
     * @param id the id of the ligneCmdFournisseurDTO to save.
     * @param ligneCmdFournisseurDTO the ligneCmdFournisseurDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ligneCmdFournisseurDTO,
     * or with status {@code 400 (Bad Request)} if the ligneCmdFournisseurDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ligneCmdFournisseurDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ligne-cmd-fournisseurs/{id}")
    public ResponseEntity<LigneCmdFournisseurDTO> updateLigneCmdFournisseur(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LigneCmdFournisseurDTO ligneCmdFournisseurDTO
    ) throws URISyntaxException {
        log.debug("REST request to update LigneCmdFournisseur : {}, {}", id, ligneCmdFournisseurDTO);
        if (ligneCmdFournisseurDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ligneCmdFournisseurDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ligneCmdFournisseurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LigneCmdFournisseurDTO result = ligneCmdFournisseurService.update(ligneCmdFournisseurDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ligneCmdFournisseurDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ligne-cmd-fournisseurs/:id} : Partial updates given fields of an existing ligneCmdFournisseur, field will ignore if it is null
     *
     * @param id the id of the ligneCmdFournisseurDTO to save.
     * @param ligneCmdFournisseurDTO the ligneCmdFournisseurDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ligneCmdFournisseurDTO,
     * or with status {@code 400 (Bad Request)} if the ligneCmdFournisseurDTO is not valid,
     * or with status {@code 404 (Not Found)} if the ligneCmdFournisseurDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the ligneCmdFournisseurDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ligne-cmd-fournisseurs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LigneCmdFournisseurDTO> partialUpdateLigneCmdFournisseur(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LigneCmdFournisseurDTO ligneCmdFournisseurDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update LigneCmdFournisseur partially : {}, {}", id, ligneCmdFournisseurDTO);
        if (ligneCmdFournisseurDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ligneCmdFournisseurDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ligneCmdFournisseurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LigneCmdFournisseurDTO> result = ligneCmdFournisseurService.partialUpdate(ligneCmdFournisseurDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ligneCmdFournisseurDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /ligne-cmd-fournisseurs} : get all the ligneCmdFournisseurs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ligneCmdFournisseurs in body.
     */
    @GetMapping("/ligne-cmd-fournisseurs")
    public List<LigneCmdFournisseurDTO> getAllLigneCmdFournisseurs() {
        log.debug("REST request to get all LigneCmdFournisseurs");
        return ligneCmdFournisseurService.findAll();
    }

    /**
     * {@code GET  /ligne-cmd-fournisseurs/:id} : get the "id" ligneCmdFournisseur.
     *
     * @param id the id of the ligneCmdFournisseurDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ligneCmdFournisseurDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ligne-cmd-fournisseurs/{id}")
    public ResponseEntity<LigneCmdFournisseurDTO> getLigneCmdFournisseur(@PathVariable Long id) {
        log.debug("REST request to get LigneCmdFournisseur : {}", id);
        Optional<LigneCmdFournisseurDTO> ligneCmdFournisseurDTO = ligneCmdFournisseurService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ligneCmdFournisseurDTO);
    }

    /**
     * {@code DELETE  /ligne-cmd-fournisseurs/:id} : delete the "id" ligneCmdFournisseur.
     *
     * @param id the id of the ligneCmdFournisseurDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ligne-cmd-fournisseurs/{id}")
    public ResponseEntity<Void> deleteLigneCmdFournisseur(@PathVariable Long id) {
        log.debug("REST request to delete LigneCmdFournisseur : {}", id);
        ligneCmdFournisseurService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
