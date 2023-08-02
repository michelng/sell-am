package com.mngsolution.sellam.web.rest;

import static com.mngsolution.sellam.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mngsolution.sellam.IntegrationTest;
import com.mngsolution.sellam.domain.CmdClient;
import com.mngsolution.sellam.domain.enumeration.StatutCmd;
import com.mngsolution.sellam.repository.CmdClientRepository;
import com.mngsolution.sellam.service.dto.CmdClientDTO;
import com.mngsolution.sellam.service.mapper.CmdClientMapper;
import jakarta.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link CmdClientResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CmdClientResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_COMMANDE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_COMMANDE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_LIVRAISON_PREVUE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_LIVRAISON_PREVUE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_MONTANT_TOTAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_MONTANT_TOTAL = new BigDecimal(2);

    private static final String DEFAULT_COMMENTAIRE = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTAIRE = "BBBBBBBBBB";

    private static final StatutCmd DEFAULT_STATUT_CMD = StatutCmd.EN_COURS_DE_TRAITEMENT;
    private static final StatutCmd UPDATED_STATUT_CMD = StatutCmd.LIVREE;

    private static final String ENTITY_API_URL = "/api/cmd-clients";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CmdClientRepository cmdClientRepository;

    @Autowired
    private CmdClientMapper cmdClientMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCmdClientMockMvc;

    private CmdClient cmdClient;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CmdClient createEntity(EntityManager em) {
        CmdClient cmdClient = new CmdClient()
            .code(DEFAULT_CODE)
            .dateCommande(DEFAULT_DATE_COMMANDE)
            .dateLivraisonPrevue(DEFAULT_DATE_LIVRAISON_PREVUE)
            .montantTotal(DEFAULT_MONTANT_TOTAL)
            .commentaire(DEFAULT_COMMENTAIRE)
            .statutCmd(DEFAULT_STATUT_CMD);
        return cmdClient;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CmdClient createUpdatedEntity(EntityManager em) {
        CmdClient cmdClient = new CmdClient()
            .code(UPDATED_CODE)
            .dateCommande(UPDATED_DATE_COMMANDE)
            .dateLivraisonPrevue(UPDATED_DATE_LIVRAISON_PREVUE)
            .montantTotal(UPDATED_MONTANT_TOTAL)
            .commentaire(UPDATED_COMMENTAIRE)
            .statutCmd(UPDATED_STATUT_CMD);
        return cmdClient;
    }

    @BeforeEach
    public void initTest() {
        cmdClient = createEntity(em);
    }

    @Test
    @Transactional
    void createCmdClient() throws Exception {
        int databaseSizeBeforeCreate = cmdClientRepository.findAll().size();
        // Create the CmdClient
        CmdClientDTO cmdClientDTO = cmdClientMapper.toDto(cmdClient);
        restCmdClientMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cmdClientDTO)))
            .andExpect(status().isCreated());

        // Validate the CmdClient in the database
        List<CmdClient> cmdClientList = cmdClientRepository.findAll();
        assertThat(cmdClientList).hasSize(databaseSizeBeforeCreate + 1);
        CmdClient testCmdClient = cmdClientList.get(cmdClientList.size() - 1);
        assertThat(testCmdClient.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testCmdClient.getDateCommande()).isEqualTo(DEFAULT_DATE_COMMANDE);
        assertThat(testCmdClient.getDateLivraisonPrevue()).isEqualTo(DEFAULT_DATE_LIVRAISON_PREVUE);
        assertThat(testCmdClient.getMontantTotal()).isEqualByComparingTo(DEFAULT_MONTANT_TOTAL);
        assertThat(testCmdClient.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
        assertThat(testCmdClient.getStatutCmd()).isEqualTo(DEFAULT_STATUT_CMD);
    }

    @Test
    @Transactional
    void createCmdClientWithExistingId() throws Exception {
        // Create the CmdClient with an existing ID
        cmdClient.setId(1L);
        CmdClientDTO cmdClientDTO = cmdClientMapper.toDto(cmdClient);

        int databaseSizeBeforeCreate = cmdClientRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCmdClientMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cmdClientDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CmdClient in the database
        List<CmdClient> cmdClientList = cmdClientRepository.findAll();
        assertThat(cmdClientList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCmdClients() throws Exception {
        // Initialize the database
        cmdClientRepository.saveAndFlush(cmdClient);

        // Get all the cmdClientList
        restCmdClientMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cmdClient.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].dateCommande").value(hasItem(DEFAULT_DATE_COMMANDE.toString())))
            .andExpect(jsonPath("$.[*].dateLivraisonPrevue").value(hasItem(DEFAULT_DATE_LIVRAISON_PREVUE.toString())))
            .andExpect(jsonPath("$.[*].montantTotal").value(hasItem(sameNumber(DEFAULT_MONTANT_TOTAL))))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE)))
            .andExpect(jsonPath("$.[*].statutCmd").value(hasItem(DEFAULT_STATUT_CMD.toString())));
    }

    @Test
    @Transactional
    void getCmdClient() throws Exception {
        // Initialize the database
        cmdClientRepository.saveAndFlush(cmdClient);

        // Get the cmdClient
        restCmdClientMockMvc
            .perform(get(ENTITY_API_URL_ID, cmdClient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cmdClient.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.dateCommande").value(DEFAULT_DATE_COMMANDE.toString()))
            .andExpect(jsonPath("$.dateLivraisonPrevue").value(DEFAULT_DATE_LIVRAISON_PREVUE.toString()))
            .andExpect(jsonPath("$.montantTotal").value(sameNumber(DEFAULT_MONTANT_TOTAL)))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE))
            .andExpect(jsonPath("$.statutCmd").value(DEFAULT_STATUT_CMD.toString()));
    }

    @Test
    @Transactional
    void getNonExistingCmdClient() throws Exception {
        // Get the cmdClient
        restCmdClientMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCmdClient() throws Exception {
        // Initialize the database
        cmdClientRepository.saveAndFlush(cmdClient);

        int databaseSizeBeforeUpdate = cmdClientRepository.findAll().size();

        // Update the cmdClient
        CmdClient updatedCmdClient = cmdClientRepository.findById(cmdClient.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCmdClient are not directly saved in db
        em.detach(updatedCmdClient);
        updatedCmdClient
            .code(UPDATED_CODE)
            .dateCommande(UPDATED_DATE_COMMANDE)
            .dateLivraisonPrevue(UPDATED_DATE_LIVRAISON_PREVUE)
            .montantTotal(UPDATED_MONTANT_TOTAL)
            .commentaire(UPDATED_COMMENTAIRE)
            .statutCmd(UPDATED_STATUT_CMD);
        CmdClientDTO cmdClientDTO = cmdClientMapper.toDto(updatedCmdClient);

        restCmdClientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cmdClientDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cmdClientDTO))
            )
            .andExpect(status().isOk());

        // Validate the CmdClient in the database
        List<CmdClient> cmdClientList = cmdClientRepository.findAll();
        assertThat(cmdClientList).hasSize(databaseSizeBeforeUpdate);
        CmdClient testCmdClient = cmdClientList.get(cmdClientList.size() - 1);
        assertThat(testCmdClient.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testCmdClient.getDateCommande()).isEqualTo(UPDATED_DATE_COMMANDE);
        assertThat(testCmdClient.getDateLivraisonPrevue()).isEqualTo(UPDATED_DATE_LIVRAISON_PREVUE);
        assertThat(testCmdClient.getMontantTotal()).isEqualByComparingTo(UPDATED_MONTANT_TOTAL);
        assertThat(testCmdClient.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testCmdClient.getStatutCmd()).isEqualTo(UPDATED_STATUT_CMD);
    }

    @Test
    @Transactional
    void putNonExistingCmdClient() throws Exception {
        int databaseSizeBeforeUpdate = cmdClientRepository.findAll().size();
        cmdClient.setId(count.incrementAndGet());

        // Create the CmdClient
        CmdClientDTO cmdClientDTO = cmdClientMapper.toDto(cmdClient);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCmdClientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cmdClientDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cmdClientDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CmdClient in the database
        List<CmdClient> cmdClientList = cmdClientRepository.findAll();
        assertThat(cmdClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCmdClient() throws Exception {
        int databaseSizeBeforeUpdate = cmdClientRepository.findAll().size();
        cmdClient.setId(count.incrementAndGet());

        // Create the CmdClient
        CmdClientDTO cmdClientDTO = cmdClientMapper.toDto(cmdClient);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCmdClientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cmdClientDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CmdClient in the database
        List<CmdClient> cmdClientList = cmdClientRepository.findAll();
        assertThat(cmdClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCmdClient() throws Exception {
        int databaseSizeBeforeUpdate = cmdClientRepository.findAll().size();
        cmdClient.setId(count.incrementAndGet());

        // Create the CmdClient
        CmdClientDTO cmdClientDTO = cmdClientMapper.toDto(cmdClient);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCmdClientMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cmdClientDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CmdClient in the database
        List<CmdClient> cmdClientList = cmdClientRepository.findAll();
        assertThat(cmdClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCmdClientWithPatch() throws Exception {
        // Initialize the database
        cmdClientRepository.saveAndFlush(cmdClient);

        int databaseSizeBeforeUpdate = cmdClientRepository.findAll().size();

        // Update the cmdClient using partial update
        CmdClient partialUpdatedCmdClient = new CmdClient();
        partialUpdatedCmdClient.setId(cmdClient.getId());

        partialUpdatedCmdClient.dateCommande(UPDATED_DATE_COMMANDE).montantTotal(UPDATED_MONTANT_TOTAL).statutCmd(UPDATED_STATUT_CMD);

        restCmdClientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCmdClient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCmdClient))
            )
            .andExpect(status().isOk());

        // Validate the CmdClient in the database
        List<CmdClient> cmdClientList = cmdClientRepository.findAll();
        assertThat(cmdClientList).hasSize(databaseSizeBeforeUpdate);
        CmdClient testCmdClient = cmdClientList.get(cmdClientList.size() - 1);
        assertThat(testCmdClient.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testCmdClient.getDateCommande()).isEqualTo(UPDATED_DATE_COMMANDE);
        assertThat(testCmdClient.getDateLivraisonPrevue()).isEqualTo(DEFAULT_DATE_LIVRAISON_PREVUE);
        assertThat(testCmdClient.getMontantTotal()).isEqualByComparingTo(UPDATED_MONTANT_TOTAL);
        assertThat(testCmdClient.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
        assertThat(testCmdClient.getStatutCmd()).isEqualTo(UPDATED_STATUT_CMD);
    }

    @Test
    @Transactional
    void fullUpdateCmdClientWithPatch() throws Exception {
        // Initialize the database
        cmdClientRepository.saveAndFlush(cmdClient);

        int databaseSizeBeforeUpdate = cmdClientRepository.findAll().size();

        // Update the cmdClient using partial update
        CmdClient partialUpdatedCmdClient = new CmdClient();
        partialUpdatedCmdClient.setId(cmdClient.getId());

        partialUpdatedCmdClient
            .code(UPDATED_CODE)
            .dateCommande(UPDATED_DATE_COMMANDE)
            .dateLivraisonPrevue(UPDATED_DATE_LIVRAISON_PREVUE)
            .montantTotal(UPDATED_MONTANT_TOTAL)
            .commentaire(UPDATED_COMMENTAIRE)
            .statutCmd(UPDATED_STATUT_CMD);

        restCmdClientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCmdClient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCmdClient))
            )
            .andExpect(status().isOk());

        // Validate the CmdClient in the database
        List<CmdClient> cmdClientList = cmdClientRepository.findAll();
        assertThat(cmdClientList).hasSize(databaseSizeBeforeUpdate);
        CmdClient testCmdClient = cmdClientList.get(cmdClientList.size() - 1);
        assertThat(testCmdClient.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testCmdClient.getDateCommande()).isEqualTo(UPDATED_DATE_COMMANDE);
        assertThat(testCmdClient.getDateLivraisonPrevue()).isEqualTo(UPDATED_DATE_LIVRAISON_PREVUE);
        assertThat(testCmdClient.getMontantTotal()).isEqualByComparingTo(UPDATED_MONTANT_TOTAL);
        assertThat(testCmdClient.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testCmdClient.getStatutCmd()).isEqualTo(UPDATED_STATUT_CMD);
    }

    @Test
    @Transactional
    void patchNonExistingCmdClient() throws Exception {
        int databaseSizeBeforeUpdate = cmdClientRepository.findAll().size();
        cmdClient.setId(count.incrementAndGet());

        // Create the CmdClient
        CmdClientDTO cmdClientDTO = cmdClientMapper.toDto(cmdClient);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCmdClientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cmdClientDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cmdClientDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CmdClient in the database
        List<CmdClient> cmdClientList = cmdClientRepository.findAll();
        assertThat(cmdClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCmdClient() throws Exception {
        int databaseSizeBeforeUpdate = cmdClientRepository.findAll().size();
        cmdClient.setId(count.incrementAndGet());

        // Create the CmdClient
        CmdClientDTO cmdClientDTO = cmdClientMapper.toDto(cmdClient);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCmdClientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cmdClientDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CmdClient in the database
        List<CmdClient> cmdClientList = cmdClientRepository.findAll();
        assertThat(cmdClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCmdClient() throws Exception {
        int databaseSizeBeforeUpdate = cmdClientRepository.findAll().size();
        cmdClient.setId(count.incrementAndGet());

        // Create the CmdClient
        CmdClientDTO cmdClientDTO = cmdClientMapper.toDto(cmdClient);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCmdClientMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cmdClientDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CmdClient in the database
        List<CmdClient> cmdClientList = cmdClientRepository.findAll();
        assertThat(cmdClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCmdClient() throws Exception {
        // Initialize the database
        cmdClientRepository.saveAndFlush(cmdClient);

        int databaseSizeBeforeDelete = cmdClientRepository.findAll().size();

        // Delete the cmdClient
        restCmdClientMockMvc
            .perform(delete(ENTITY_API_URL_ID, cmdClient.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CmdClient> cmdClientList = cmdClientRepository.findAll();
        assertThat(cmdClientList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
