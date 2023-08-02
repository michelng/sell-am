package com.mngsolution.sellam.web.rest;

import com.mngsolution.sellam.repository.CmdFournisseurRepository;
import com.mngsolution.sellam.service.CmdFournisseurService;
import com.mngsolution.sellam.service.dto.CmdFournisseurDTO;
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
 * REST controller for managing {@link com.mngsolution.sellam.domain.CmdFournisseur}.
 */
@RestController
@RequestMapping("/api")
public class CmdFournisseurResource {

    private final Logger log = LoggerFactory.getLogger(CmdFournisseurResource.class);

    private static final String ENTITY_NAME = "cmdFournisseur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CmdFournisseurService cmdFournisseurService;

    private final CmdFournisseurRepository cmdFournisseurRepository;

    public CmdFournisseurResource(CmdFournisseurService cmdFournisseurService, CmdFournisseurRepository cmdFournisseurRepository) {
        this.cmdFournisseurService = cmdFournisseurService;
        this.cmdFournisseurRepository = cmdFournisseurRepository;
    }

    /**
     * {@code POST  /cmd-fournisseurs} : Create a new cmdFournisseur.
     *
     * @param cmdFournisseurDTO the cmdFournisseurDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cmdFournisseurDTO, or with status {@code 400 (Bad Request)} if the cmdFournisseur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cmd-fournisseurs")
    public ResponseEntity<CmdFournisseurDTO> createCmdFournisseur(@RequestBody CmdFournisseurDTO cmdFournisseurDTO)
        throws URISyntaxException {
        log.debug("REST request to save CmdFournisseur : {}", cmdFournisseurDTO);
        if (cmdFournisseurDTO.getId() != null) {
            throw new BadRequestAlertException("A new cmdFournisseur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CmdFournisseurDTO result = cmdFournisseurService.save(cmdFournisseurDTO);
        return ResponseEntity
            .created(new URI("/api/cmd-fournisseurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cmd-fournisseurs/:id} : Updates an existing cmdFournisseur.
     *
     * @param id the id of the cmdFournisseurDTO to save.
     * @param cmdFournisseurDTO the cmdFournisseurDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cmdFournisseurDTO,
     * or with status {@code 400 (Bad Request)} if the cmdFournisseurDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cmdFournisseurDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cmd-fournisseurs/{id}")
    public ResponseEntity<CmdFournisseurDTO> updateCmdFournisseur(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CmdFournisseurDTO cmdFournisseurDTO
    ) throws URISyntaxException {
        log.debug("REST request to update CmdFournisseur : {}, {}", id, cmdFournisseurDTO);
        if (cmdFournisseurDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cmdFournisseurDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cmdFournisseurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CmdFournisseurDTO result = cmdFournisseurService.update(cmdFournisseurDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cmdFournisseurDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cmd-fournisseurs/:id} : Partial updates given fields of an existing cmdFournisseur, field will ignore if it is null
     *
     * @param id the id of the cmdFournisseurDTO to save.
     * @param cmdFournisseurDTO the cmdFournisseurDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cmdFournisseurDTO,
     * or with status {@code 400 (Bad Request)} if the cmdFournisseurDTO is not valid,
     * or with status {@code 404 (Not Found)} if the cmdFournisseurDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the cmdFournisseurDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cmd-fournisseurs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CmdFournisseurDTO> partialUpdateCmdFournisseur(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CmdFournisseurDTO cmdFournisseurDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update CmdFournisseur partially : {}, {}", id, cmdFournisseurDTO);
        if (cmdFournisseurDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cmdFournisseurDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cmdFournisseurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CmdFournisseurDTO> result = cmdFournisseurService.partialUpdate(cmdFournisseurDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cmdFournisseurDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /cmd-fournisseurs} : get all the cmdFournisseurs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cmdFournisseurs in body.
     */
    @GetMapping("/cmd-fournisseurs")
    public List<CmdFournisseurDTO> getAllCmdFournisseurs() {
        log.debug("REST request to get all CmdFournisseurs");
        return cmdFournisseurService.findAll();
    }

    /**
     * {@code GET  /cmd-fournisseurs/:id} : get the "id" cmdFournisseur.
     *
     * @param id the id of the cmdFournisseurDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cmdFournisseurDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cmd-fournisseurs/{id}")
    public ResponseEntity<CmdFournisseurDTO> getCmdFournisseur(@PathVariable Long id) {
        log.debug("REST request to get CmdFournisseur : {}", id);
        Optional<CmdFournisseurDTO> cmdFournisseurDTO = cmdFournisseurService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cmdFournisseurDTO);
    }

    /**
     * {@code DELETE  /cmd-fournisseurs/:id} : delete the "id" cmdFournisseur.
     *
     * @param id the id of the cmdFournisseurDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cmd-fournisseurs/{id}")
    public ResponseEntity<Void> deleteCmdFournisseur(@PathVariable Long id) {
        log.debug("REST request to delete CmdFournisseur : {}", id);
        cmdFournisseurService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
