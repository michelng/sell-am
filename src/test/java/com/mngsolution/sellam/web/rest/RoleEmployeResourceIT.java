package com.mngsolution.sellam.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mngsolution.sellam.IntegrationTest;
import com.mngsolution.sellam.domain.RoleEmploye;
import com.mngsolution.sellam.repository.RoleEmployeRepository;
import com.mngsolution.sellam.service.dto.RoleEmployeDTO;
import com.mngsolution.sellam.service.mapper.RoleEmployeMapper;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link RoleEmployeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RoleEmployeResourceIT {

    private static final String DEFAULT_ROLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ROLE_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/role-employes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RoleEmployeRepository roleEmployeRepository;

    @Autowired
    private RoleEmployeMapper roleEmployeMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRoleEmployeMockMvc;

    private RoleEmploye roleEmploye;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RoleEmploye createEntity(EntityManager em) {
        RoleEmploye roleEmploye = new RoleEmploye().roleName(DEFAULT_ROLE_NAME);
        return roleEmploye;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RoleEmploye createUpdatedEntity(EntityManager em) {
        RoleEmploye roleEmploye = new RoleEmploye().roleName(UPDATED_ROLE_NAME);
        return roleEmploye;
    }

    @BeforeEach
    public void initTest() {
        roleEmploye = createEntity(em);
    }

    @Test
    @Transactional
    void createRoleEmploye() throws Exception {
        int databaseSizeBeforeCreate = roleEmployeRepository.findAll().size();
        // Create the RoleEmploye
        RoleEmployeDTO roleEmployeDTO = roleEmployeMapper.toDto(roleEmploye);
        restRoleEmployeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(roleEmployeDTO))
            )
            .andExpect(status().isCreated());

        // Validate the RoleEmploye in the database
        List<RoleEmploye> roleEmployeList = roleEmployeRepository.findAll();
        assertThat(roleEmployeList).hasSize(databaseSizeBeforeCreate + 1);
        RoleEmploye testRoleEmploye = roleEmployeList.get(roleEmployeList.size() - 1);
        assertThat(testRoleEmploye.getRoleName()).isEqualTo(DEFAULT_ROLE_NAME);
    }

    @Test
    @Transactional
    void createRoleEmployeWithExistingId() throws Exception {
        // Create the RoleEmploye with an existing ID
        roleEmploye.setId(1L);
        RoleEmployeDTO roleEmployeDTO = roleEmployeMapper.toDto(roleEmploye);

        int databaseSizeBeforeCreate = roleEmployeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoleEmployeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(roleEmployeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RoleEmploye in the database
        List<RoleEmploye> roleEmployeList = roleEmployeRepository.findAll();
        assertThat(roleEmployeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllRoleEmployes() throws Exception {
        // Initialize the database
        roleEmployeRepository.saveAndFlush(roleEmploye);

        // Get all the roleEmployeList
        restRoleEmployeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(roleEmploye.getId().intValue())))
            .andExpect(jsonPath("$.[*].roleName").value(hasItem(DEFAULT_ROLE_NAME)));
    }

    @Test
    @Transactional
    void getRoleEmploye() throws Exception {
        // Initialize the database
        roleEmployeRepository.saveAndFlush(roleEmploye);

        // Get the roleEmploye
        restRoleEmployeMockMvc
            .perform(get(ENTITY_API_URL_ID, roleEmploye.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(roleEmploye.getId().intValue()))
            .andExpect(jsonPath("$.roleName").value(DEFAULT_ROLE_NAME));
    }

    @Test
    @Transactional
    void getNonExistingRoleEmploye() throws Exception {
        // Get the roleEmploye
        restRoleEmployeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingRoleEmploye() throws Exception {
        // Initialize the database
        roleEmployeRepository.saveAndFlush(roleEmploye);

        int databaseSizeBeforeUpdate = roleEmployeRepository.findAll().size();

        // Update the roleEmploye
        RoleEmploye updatedRoleEmploye = roleEmployeRepository.findById(roleEmploye.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedRoleEmploye are not directly saved in db
        em.detach(updatedRoleEmploye);
        updatedRoleEmploye.roleName(UPDATED_ROLE_NAME);
        RoleEmployeDTO roleEmployeDTO = roleEmployeMapper.toDto(updatedRoleEmploye);

        restRoleEmployeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, roleEmployeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(roleEmployeDTO))
            )
            .andExpect(status().isOk());

        // Validate the RoleEmploye in the database
        List<RoleEmploye> roleEmployeList = roleEmployeRepository.findAll();
        assertThat(roleEmployeList).hasSize(databaseSizeBeforeUpdate);
        RoleEmploye testRoleEmploye = roleEmployeList.get(roleEmployeList.size() - 1);
        assertThat(testRoleEmploye.getRoleName()).isEqualTo(UPDATED_ROLE_NAME);
    }

    @Test
    @Transactional
    void putNonExistingRoleEmploye() throws Exception {
        int databaseSizeBeforeUpdate = roleEmployeRepository.findAll().size();
        roleEmploye.setId(count.incrementAndGet());

        // Create the RoleEmploye
        RoleEmployeDTO roleEmployeDTO = roleEmployeMapper.toDto(roleEmploye);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRoleEmployeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, roleEmployeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(roleEmployeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RoleEmploye in the database
        List<RoleEmploye> roleEmployeList = roleEmployeRepository.findAll();
        assertThat(roleEmployeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRoleEmploye() throws Exception {
        int databaseSizeBeforeUpdate = roleEmployeRepository.findAll().size();
        roleEmploye.setId(count.incrementAndGet());

        // Create the RoleEmploye
        RoleEmployeDTO roleEmployeDTO = roleEmployeMapper.toDto(roleEmploye);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRoleEmployeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(roleEmployeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RoleEmploye in the database
        List<RoleEmploye> roleEmployeList = roleEmployeRepository.findAll();
        assertThat(roleEmployeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRoleEmploye() throws Exception {
        int databaseSizeBeforeUpdate = roleEmployeRepository.findAll().size();
        roleEmploye.setId(count.incrementAndGet());

        // Create the RoleEmploye
        RoleEmployeDTO roleEmployeDTO = roleEmployeMapper.toDto(roleEmploye);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRoleEmployeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(roleEmployeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the RoleEmploye in the database
        List<RoleEmploye> roleEmployeList = roleEmployeRepository.findAll();
        assertThat(roleEmployeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRoleEmployeWithPatch() throws Exception {
        // Initialize the database
        roleEmployeRepository.saveAndFlush(roleEmploye);

        int databaseSizeBeforeUpdate = roleEmployeRepository.findAll().size();

        // Update the roleEmploye using partial update
        RoleEmploye partialUpdatedRoleEmploye = new RoleEmploye();
        partialUpdatedRoleEmploye.setId(roleEmploye.getId());

        partialUpdatedRoleEmploye.roleName(UPDATED_ROLE_NAME);

        restRoleEmployeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRoleEmploye.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRoleEmploye))
            )
            .andExpect(status().isOk());

        // Validate the RoleEmploye in the database
        List<RoleEmploye> roleEmployeList = roleEmployeRepository.findAll();
        assertThat(roleEmployeList).hasSize(databaseSizeBeforeUpdate);
        RoleEmploye testRoleEmploye = roleEmployeList.get(roleEmployeList.size() - 1);
        assertThat(testRoleEmploye.getRoleName()).isEqualTo(UPDATED_ROLE_NAME);
    }

    @Test
    @Transactional
    void fullUpdateRoleEmployeWithPatch() throws Exception {
        // Initialize the database
        roleEmployeRepository.saveAndFlush(roleEmploye);

        int databaseSizeBeforeUpdate = roleEmployeRepository.findAll().size();

        // Update the roleEmploye using partial update
        RoleEmploye partialUpdatedRoleEmploye = new RoleEmploye();
        partialUpdatedRoleEmploye.setId(roleEmploye.getId());

        partialUpdatedRoleEmploye.roleName(UPDATED_ROLE_NAME);

        restRoleEmployeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRoleEmploye.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRoleEmploye))
            )
            .andExpect(status().isOk());

        // Validate the RoleEmploye in the database
        List<RoleEmploye> roleEmployeList = roleEmployeRepository.findAll();
        assertThat(roleEmployeList).hasSize(databaseSizeBeforeUpdate);
        RoleEmploye testRoleEmploye = roleEmployeList.get(roleEmployeList.size() - 1);
        assertThat(testRoleEmploye.getRoleName()).isEqualTo(UPDATED_ROLE_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingRoleEmploye() throws Exception {
        int databaseSizeBeforeUpdate = roleEmployeRepository.findAll().size();
        roleEmploye.setId(count.incrementAndGet());

        // Create the RoleEmploye
        RoleEmployeDTO roleEmployeDTO = roleEmployeMapper.toDto(roleEmploye);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRoleEmployeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, roleEmployeDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(roleEmployeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RoleEmploye in the database
        List<RoleEmploye> roleEmployeList = roleEmployeRepository.findAll();
        assertThat(roleEmployeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRoleEmploye() throws Exception {
        int databaseSizeBeforeUpdate = roleEmployeRepository.findAll().size();
        roleEmploye.setId(count.incrementAndGet());

        // Create the RoleEmploye
        RoleEmployeDTO roleEmployeDTO = roleEmployeMapper.toDto(roleEmploye);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRoleEmployeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(roleEmployeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RoleEmploye in the database
        List<RoleEmploye> roleEmployeList = roleEmployeRepository.findAll();
        assertThat(roleEmployeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRoleEmploye() throws Exception {
        int databaseSizeBeforeUpdate = roleEmployeRepository.findAll().size();
        roleEmploye.setId(count.incrementAndGet());

        // Create the RoleEmploye
        RoleEmployeDTO roleEmployeDTO = roleEmployeMapper.toDto(roleEmploye);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRoleEmployeMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(roleEmployeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the RoleEmploye in the database
        List<RoleEmploye> roleEmployeList = roleEmployeRepository.findAll();
        assertThat(roleEmployeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRoleEmploye() throws Exception {
        // Initialize the database
        roleEmployeRepository.saveAndFlush(roleEmploye);

        int databaseSizeBeforeDelete = roleEmployeRepository.findAll().size();

        // Delete the roleEmploye
        restRoleEmployeMockMvc
            .perform(delete(ENTITY_API_URL_ID, roleEmploye.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RoleEmploye> roleEmployeList = roleEmployeRepository.findAll();
        assertThat(roleEmployeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
