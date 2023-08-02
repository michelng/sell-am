package com.mngsolution.sellam.web.rest;

import com.mngsolution.sellam.repository.RoleEmployeRepository;
import com.mngsolution.sellam.service.RoleEmployeService;
import com.mngsolution.sellam.service.dto.RoleEmployeDTO;
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
 * REST controller for managing {@link com.mngsolution.sellam.domain.RoleEmploye}.
 */
@RestController
@RequestMapping("/api")
public class RoleEmployeResource {

    private final Logger log = LoggerFactory.getLogger(RoleEmployeResource.class);

    private static final String ENTITY_NAME = "roleEmploye";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RoleEmployeService roleEmployeService;

    private final RoleEmployeRepository roleEmployeRepository;

    public RoleEmployeResource(RoleEmployeService roleEmployeService, RoleEmployeRepository roleEmployeRepository) {
        this.roleEmployeService = roleEmployeService;
        this.roleEmployeRepository = roleEmployeRepository;
    }

    /**
     * {@code POST  /role-employes} : Create a new roleEmploye.
     *
     * @param roleEmployeDTO the roleEmployeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new roleEmployeDTO, or with status {@code 400 (Bad Request)} if the roleEmploye has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/role-employes")
    public ResponseEntity<RoleEmployeDTO> createRoleEmploye(@RequestBody RoleEmployeDTO roleEmployeDTO) throws URISyntaxException {
        log.debug("REST request to save RoleEmploye : {}", roleEmployeDTO);
        if (roleEmployeDTO.getId() != null) {
            throw new BadRequestAlertException("A new roleEmploye cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RoleEmployeDTO result = roleEmployeService.save(roleEmployeDTO);
        return ResponseEntity
            .created(new URI("/api/role-employes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /role-employes/:id} : Updates an existing roleEmploye.
     *
     * @param id the id of the roleEmployeDTO to save.
     * @param roleEmployeDTO the roleEmployeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated roleEmployeDTO,
     * or with status {@code 400 (Bad Request)} if the roleEmployeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the roleEmployeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/role-employes/{id}")
    public ResponseEntity<RoleEmployeDTO> updateRoleEmploye(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RoleEmployeDTO roleEmployeDTO
    ) throws URISyntaxException {
        log.debug("REST request to update RoleEmploye : {}, {}", id, roleEmployeDTO);
        if (roleEmployeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, roleEmployeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!roleEmployeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        RoleEmployeDTO result = roleEmployeService.update(roleEmployeDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, roleEmployeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /role-employes/:id} : Partial updates given fields of an existing roleEmploye, field will ignore if it is null
     *
     * @param id the id of the roleEmployeDTO to save.
     * @param roleEmployeDTO the roleEmployeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated roleEmployeDTO,
     * or with status {@code 400 (Bad Request)} if the roleEmployeDTO is not valid,
     * or with status {@code 404 (Not Found)} if the roleEmployeDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the roleEmployeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/role-employes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<RoleEmployeDTO> partialUpdateRoleEmploye(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RoleEmployeDTO roleEmployeDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update RoleEmploye partially : {}, {}", id, roleEmployeDTO);
        if (roleEmployeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, roleEmployeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!roleEmployeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<RoleEmployeDTO> result = roleEmployeService.partialUpdate(roleEmployeDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, roleEmployeDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /role-employes} : get all the roleEmployes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of roleEmployes in body.
     */
    @GetMapping("/role-employes")
    public List<RoleEmployeDTO> getAllRoleEmployes() {
        log.debug("REST request to get all RoleEmployes");
        return roleEmployeService.findAll();
    }

    /**
     * {@code GET  /role-employes/:id} : get the "id" roleEmploye.
     *
     * @param id the id of the roleEmployeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the roleEmployeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/role-employes/{id}")
    public ResponseEntity<RoleEmployeDTO> getRoleEmploye(@PathVariable Long id) {
        log.debug("REST request to get RoleEmploye : {}", id);
        Optional<RoleEmployeDTO> roleEmployeDTO = roleEmployeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(roleEmployeDTO);
    }

    /**
     * {@code DELETE  /role-employes/:id} : delete the "id" roleEmploye.
     *
     * @param id the id of the roleEmployeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/role-employes/{id}")
    public ResponseEntity<Void> deleteRoleEmploye(@PathVariable Long id) {
        log.debug("REST request to delete RoleEmploye : {}", id);
        roleEmployeService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
