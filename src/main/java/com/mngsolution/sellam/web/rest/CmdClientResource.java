package com.mngsolution.sellam.web.rest;

import com.mngsolution.sellam.repository.CmdClientRepository;
import com.mngsolution.sellam.service.CmdClientService;
import com.mngsolution.sellam.service.dto.CmdClientDTO;
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
 * REST controller for managing {@link com.mngsolution.sellam.domain.CmdClient}.
 */
@RestController
@RequestMapping("/api")
public class CmdClientResource {

    private final Logger log = LoggerFactory.getLogger(CmdClientResource.class);

    private static final String ENTITY_NAME = "cmdClient";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CmdClientService cmdClientService;

    private final CmdClientRepository cmdClientRepository;

    public CmdClientResource(CmdClientService cmdClientService, CmdClientRepository cmdClientRepository) {
        this.cmdClientService = cmdClientService;
        this.cmdClientRepository = cmdClientRepository;
    }

    /**
     * {@code POST  /cmd-clients} : Create a new cmdClient.
     *
     * @param cmdClientDTO the cmdClientDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cmdClientDTO, or with status {@code 400 (Bad Request)} if the cmdClient has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cmd-clients")
    public ResponseEntity<CmdClientDTO> createCmdClient(@RequestBody CmdClientDTO cmdClientDTO) throws URISyntaxException {
        log.debug("REST request to save CmdClient : {}", cmdClientDTO);
        if (cmdClientDTO.getId() != null) {
            throw new BadRequestAlertException("A new cmdClient cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CmdClientDTO result = cmdClientService.save(cmdClientDTO);
        return ResponseEntity
            .created(new URI("/api/cmd-clients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cmd-clients/:id} : Updates an existing cmdClient.
     *
     * @param id the id of the cmdClientDTO to save.
     * @param cmdClientDTO the cmdClientDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cmdClientDTO,
     * or with status {@code 400 (Bad Request)} if the cmdClientDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cmdClientDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cmd-clients/{id}")
    public ResponseEntity<CmdClientDTO> updateCmdClient(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CmdClientDTO cmdClientDTO
    ) throws URISyntaxException {
        log.debug("REST request to update CmdClient : {}, {}", id, cmdClientDTO);
        if (cmdClientDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cmdClientDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cmdClientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CmdClientDTO result = cmdClientService.update(cmdClientDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cmdClientDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cmd-clients/:id} : Partial updates given fields of an existing cmdClient, field will ignore if it is null
     *
     * @param id the id of the cmdClientDTO to save.
     * @param cmdClientDTO the cmdClientDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cmdClientDTO,
     * or with status {@code 400 (Bad Request)} if the cmdClientDTO is not valid,
     * or with status {@code 404 (Not Found)} if the cmdClientDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the cmdClientDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cmd-clients/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CmdClientDTO> partialUpdateCmdClient(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CmdClientDTO cmdClientDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update CmdClient partially : {}, {}", id, cmdClientDTO);
        if (cmdClientDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cmdClientDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cmdClientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CmdClientDTO> result = cmdClientService.partialUpdate(cmdClientDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cmdClientDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /cmd-clients} : get all the cmdClients.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cmdClients in body.
     */
    @GetMapping("/cmd-clients")
    public List<CmdClientDTO> getAllCmdClients() {
        log.debug("REST request to get all CmdClients");
        return cmdClientService.findAll();
    }

    /**
     * {@code GET  /cmd-clients/:id} : get the "id" cmdClient.
     *
     * @param id the id of the cmdClientDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cmdClientDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cmd-clients/{id}")
    public ResponseEntity<CmdClientDTO> getCmdClient(@PathVariable Long id) {
        log.debug("REST request to get CmdClient : {}", id);
        Optional<CmdClientDTO> cmdClientDTO = cmdClientService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cmdClientDTO);
    }

    /**
     * {@code DELETE  /cmd-clients/:id} : delete the "id" cmdClient.
     *
     * @param id the id of the cmdClientDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cmd-clients/{id}")
    public ResponseEntity<Void> deleteCmdClient(@PathVariable Long id) {
        log.debug("REST request to delete CmdClient : {}", id);
        cmdClientService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
