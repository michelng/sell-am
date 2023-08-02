package com.mngsolution.sellam.web.rest;

import static com.mngsolution.sellam.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mngsolution.sellam.IntegrationTest;
import com.mngsolution.sellam.domain.LigneCmdClient;
import com.mngsolution.sellam.domain.enumeration.StatutCmd;
import com.mngsolution.sellam.repository.LigneCmdClientRepository;
import com.mngsolution.sellam.service.dto.LigneCmdClientDTO;
import com.mngsolution.sellam.service.mapper.LigneCmdClientMapper;
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
 * Integration tests for the {@link LigneCmdClientResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LigneCmdClientResourceIT {

    private static final BigDecimal DEFAULT_QUANTITE = new BigDecimal(1);
    private static final BigDecimal UPDATED_QUANTITE = new BigDecimal(2);

    private static final BigDecimal DEFAULT_PRIX_UNITAIRE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRIX_UNITAIRE = new BigDecimal(2);

    private static final Instant DEFAULT_DATE_LIVRAISON_PREVUE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_LIVRAISON_PREVUE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_MONTANT_TOTAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_MONTANT_TOTAL = new BigDecimal(2);

    private static final String DEFAULT_COMMENTAIRE = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTAIRE = "BBBBBBBBBB";

    private static final StatutCmd DEFAULT_STATUT_CMD = StatutCmd.EN_COURS_DE_TRAITEMENT;
    private static final StatutCmd UPDATED_STATUT_CMD = StatutCmd.LIVREE;

    private static final String ENTITY_API_URL = "/api/ligne-cmd-clients";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LigneCmdClientRepository ligneCmdClientRepository;

    @Autowired
    private LigneCmdClientMapper ligneCmdClientMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLigneCmdClientMockMvc;

    private LigneCmdClient ligneCmdClient;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneCmdClient createEntity(EntityManager em) {
        LigneCmdClient ligneCmdClient = new LigneCmdClient()
            .quantite(DEFAULT_QUANTITE)
            .prixUnitaire(DEFAULT_PRIX_UNITAIRE)
            .dateLivraisonPrevue(DEFAULT_DATE_LIVRAISON_PREVUE)
            .montantTotal(DEFAULT_MONTANT_TOTAL)
            .commentaire(DEFAULT_COMMENTAIRE)
            .statutCmd(DEFAULT_STATUT_CMD);
        return ligneCmdClient;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneCmdClient createUpdatedEntity(EntityManager em) {
        LigneCmdClient ligneCmdClient = new LigneCmdClient()
            .quantite(UPDATED_QUANTITE)
            .prixUnitaire(UPDATED_PRIX_UNITAIRE)
            .dateLivraisonPrevue(UPDATED_DATE_LIVRAISON_PREVUE)
            .montantTotal(UPDATED_MONTANT_TOTAL)
            .commentaire(UPDATED_COMMENTAIRE)
            .statutCmd(UPDATED_STATUT_CMD);
        return ligneCmdClient;
    }

    @BeforeEach
    public void initTest() {
        ligneCmdClient = createEntity(em);
    }

    @Test
    @Transactional
    void createLigneCmdClient() throws Exception {
        int databaseSizeBeforeCreate = ligneCmdClientRepository.findAll().size();
        // Create the LigneCmdClient
        LigneCmdClientDTO ligneCmdClientDTO = ligneCmdClientMapper.toDto(ligneCmdClient);
        restLigneCmdClientMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ligneCmdClientDTO))
            )
            .andExpect(status().isCreated());

        // Validate the LigneCmdClient in the database
        List<LigneCmdClient> ligneCmdClientList = ligneCmdClientRepository.findAll();
        assertThat(ligneCmdClientList).hasSize(databaseSizeBeforeCreate + 1);
        LigneCmdClient testLigneCmdClient = ligneCmdClientList.get(ligneCmdClientList.size() - 1);
        assertThat(testLigneCmdClient.getQuantite()).isEqualByComparingTo(DEFAULT_QUANTITE);
        assertThat(testLigneCmdClient.getPrixUnitaire()).isEqualByComparingTo(DEFAULT_PRIX_UNITAIRE);
        assertThat(testLigneCmdClient.getDateLivraisonPrevue()).isEqualTo(DEFAULT_DATE_LIVRAISON_PREVUE);
        assertThat(testLigneCmdClient.getMontantTotal()).isEqualByComparingTo(DEFAULT_MONTANT_TOTAL);
        assertThat(testLigneCmdClient.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
        assertThat(testLigneCmdClient.getStatutCmd()).isEqualTo(DEFAULT_STATUT_CMD);
    }

    @Test
    @Transactional
    void createLigneCmdClientWithExistingId() throws Exception {
        // Create the LigneCmdClient with an existing ID
        ligneCmdClient.setId(1L);
        LigneCmdClientDTO ligneCmdClientDTO = ligneCmdClientMapper.toDto(ligneCmdClient);

        int databaseSizeBeforeCreate = ligneCmdClientRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLigneCmdClientMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ligneCmdClientDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCmdClient in the database
        List<LigneCmdClient> ligneCmdClientList = ligneCmdClientRepository.findAll();
        assertThat(ligneCmdClientList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLigneCmdClients() throws Exception {
        // Initialize the database
        ligneCmdClientRepository.saveAndFlush(ligneCmdClient);

        // Get all the ligneCmdClientList
        restLigneCmdClientMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ligneCmdClient.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(sameNumber(DEFAULT_QUANTITE))))
            .andExpect(jsonPath("$.[*].prixUnitaire").value(hasItem(sameNumber(DEFAULT_PRIX_UNITAIRE))))
            .andExpect(jsonPath("$.[*].dateLivraisonPrevue").value(hasItem(DEFAULT_DATE_LIVRAISON_PREVUE.toString())))
            .andExpect(jsonPath("$.[*].montantTotal").value(hasItem(sameNumber(DEFAULT_MONTANT_TOTAL))))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE)))
            .andExpect(jsonPath("$.[*].statutCmd").value(hasItem(DEFAULT_STATUT_CMD.toString())));
    }

    @Test
    @Transactional
    void getLigneCmdClient() throws Exception {
        // Initialize the database
        ligneCmdClientRepository.saveAndFlush(ligneCmdClient);

        // Get the ligneCmdClient
        restLigneCmdClientMockMvc
            .perform(get(ENTITY_API_URL_ID, ligneCmdClient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ligneCmdClient.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(sameNumber(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.prixUnitaire").value(sameNumber(DEFAULT_PRIX_UNITAIRE)))
            .andExpect(jsonPath("$.dateLivraisonPrevue").value(DEFAULT_DATE_LIVRAISON_PREVUE.toString()))
            .andExpect(jsonPath("$.montantTotal").value(sameNumber(DEFAULT_MONTANT_TOTAL)))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE))
            .andExpect(jsonPath("$.statutCmd").value(DEFAULT_STATUT_CMD.toString()));
    }

    @Test
    @Transactional
    void getNonExistingLigneCmdClient() throws Exception {
        // Get the ligneCmdClient
        restLigneCmdClientMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingLigneCmdClient() throws Exception {
        // Initialize the database
        ligneCmdClientRepository.saveAndFlush(ligneCmdClient);

        int databaseSizeBeforeUpdate = ligneCmdClientRepository.findAll().size();

        // Update the ligneCmdClient
        LigneCmdClient updatedLigneCmdClient = ligneCmdClientRepository.findById(ligneCmdClient.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedLigneCmdClient are not directly saved in db
        em.detach(updatedLigneCmdClient);
        updatedLigneCmdClient
            .quantite(UPDATED_QUANTITE)
            .prixUnitaire(UPDATED_PRIX_UNITAIRE)
            .dateLivraisonPrevue(UPDATED_DATE_LIVRAISON_PREVUE)
            .montantTotal(UPDATED_MONTANT_TOTAL)
            .commentaire(UPDATED_COMMENTAIRE)
            .statutCmd(UPDATED_STATUT_CMD);
        LigneCmdClientDTO ligneCmdClientDTO = ligneCmdClientMapper.toDto(updatedLigneCmdClient);

        restLigneCmdClientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ligneCmdClientDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdClientDTO))
            )
            .andExpect(status().isOk());

        // Validate the LigneCmdClient in the database
        List<LigneCmdClient> ligneCmdClientList = ligneCmdClientRepository.findAll();
        assertThat(ligneCmdClientList).hasSize(databaseSizeBeforeUpdate);
        LigneCmdClient testLigneCmdClient = ligneCmdClientList.get(ligneCmdClientList.size() - 1);
        assertThat(testLigneCmdClient.getQuantite()).isEqualByComparingTo(UPDATED_QUANTITE);
        assertThat(testLigneCmdClient.getPrixUnitaire()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE);
        assertThat(testLigneCmdClient.getDateLivraisonPrevue()).isEqualTo(UPDATED_DATE_LIVRAISON_PREVUE);
        assertThat(testLigneCmdClient.getMontantTotal()).isEqualByComparingTo(UPDATED_MONTANT_TOTAL);
        assertThat(testLigneCmdClient.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testLigneCmdClient.getStatutCmd()).isEqualTo(UPDATED_STATUT_CMD);
    }

    @Test
    @Transactional
    void putNonExistingLigneCmdClient() throws Exception {
        int databaseSizeBeforeUpdate = ligneCmdClientRepository.findAll().size();
        ligneCmdClient.setId(count.incrementAndGet());

        // Create the LigneCmdClient
        LigneCmdClientDTO ligneCmdClientDTO = ligneCmdClientMapper.toDto(ligneCmdClient);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneCmdClientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ligneCmdClientDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdClientDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCmdClient in the database
        List<LigneCmdClient> ligneCmdClientList = ligneCmdClientRepository.findAll();
        assertThat(ligneCmdClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLigneCmdClient() throws Exception {
        int databaseSizeBeforeUpdate = ligneCmdClientRepository.findAll().size();
        ligneCmdClient.setId(count.incrementAndGet());

        // Create the LigneCmdClient
        LigneCmdClientDTO ligneCmdClientDTO = ligneCmdClientMapper.toDto(ligneCmdClient);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCmdClientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdClientDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCmdClient in the database
        List<LigneCmdClient> ligneCmdClientList = ligneCmdClientRepository.findAll();
        assertThat(ligneCmdClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLigneCmdClient() throws Exception {
        int databaseSizeBeforeUpdate = ligneCmdClientRepository.findAll().size();
        ligneCmdClient.setId(count.incrementAndGet());

        // Create the LigneCmdClient
        LigneCmdClientDTO ligneCmdClientDTO = ligneCmdClientMapper.toDto(ligneCmdClient);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCmdClientMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ligneCmdClientDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LigneCmdClient in the database
        List<LigneCmdClient> ligneCmdClientList = ligneCmdClientRepository.findAll();
        assertThat(ligneCmdClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLigneCmdClientWithPatch() throws Exception {
        // Initialize the database
        ligneCmdClientRepository.saveAndFlush(ligneCmdClient);

        int databaseSizeBeforeUpdate = ligneCmdClientRepository.findAll().size();

        // Update the ligneCmdClient using partial update
        LigneCmdClient partialUpdatedLigneCmdClient = new LigneCmdClient();
        partialUpdatedLigneCmdClient.setId(ligneCmdClient.getId());

        partialUpdatedLigneCmdClient.quantite(UPDATED_QUANTITE).prixUnitaire(UPDATED_PRIX_UNITAIRE);

        restLigneCmdClientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLigneCmdClient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLigneCmdClient))
            )
            .andExpect(status().isOk());

        // Validate the LigneCmdClient in the database
        List<LigneCmdClient> ligneCmdClientList = ligneCmdClientRepository.findAll();
        assertThat(ligneCmdClientList).hasSize(databaseSizeBeforeUpdate);
        LigneCmdClient testLigneCmdClient = ligneCmdClientList.get(ligneCmdClientList.size() - 1);
        assertThat(testLigneCmdClient.getQuantite()).isEqualByComparingTo(UPDATED_QUANTITE);
        assertThat(testLigneCmdClient.getPrixUnitaire()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE);
        assertThat(testLigneCmdClient.getDateLivraisonPrevue()).isEqualTo(DEFAULT_DATE_LIVRAISON_PREVUE);
        assertThat(testLigneCmdClient.getMontantTotal()).isEqualByComparingTo(DEFAULT_MONTANT_TOTAL);
        assertThat(testLigneCmdClient.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
        assertThat(testLigneCmdClient.getStatutCmd()).isEqualTo(DEFAULT_STATUT_CMD);
    }

    @Test
    @Transactional
    void fullUpdateLigneCmdClientWithPatch() throws Exception {
        // Initialize the database
        ligneCmdClientRepository.saveAndFlush(ligneCmdClient);

        int databaseSizeBeforeUpdate = ligneCmdClientRepository.findAll().size();

        // Update the ligneCmdClient using partial update
        LigneCmdClient partialUpdatedLigneCmdClient = new LigneCmdClient();
        partialUpdatedLigneCmdClient.setId(ligneCmdClient.getId());

        partialUpdatedLigneCmdClient
            .quantite(UPDATED_QUANTITE)
            .prixUnitaire(UPDATED_PRIX_UNITAIRE)
            .dateLivraisonPrevue(UPDATED_DATE_LIVRAISON_PREVUE)
            .montantTotal(UPDATED_MONTANT_TOTAL)
            .commentaire(UPDATED_COMMENTAIRE)
            .statutCmd(UPDATED_STATUT_CMD);

        restLigneCmdClientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLigneCmdClient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLigneCmdClient))
            )
            .andExpect(status().isOk());

        // Validate the LigneCmdClient in the database
        List<LigneCmdClient> ligneCmdClientList = ligneCmdClientRepository.findAll();
        assertThat(ligneCmdClientList).hasSize(databaseSizeBeforeUpdate);
        LigneCmdClient testLigneCmdClient = ligneCmdClientList.get(ligneCmdClientList.size() - 1);
        assertThat(testLigneCmdClient.getQuantite()).isEqualByComparingTo(UPDATED_QUANTITE);
        assertThat(testLigneCmdClient.getPrixUnitaire()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE);
        assertThat(testLigneCmdClient.getDateLivraisonPrevue()).isEqualTo(UPDATED_DATE_LIVRAISON_PREVUE);
        assertThat(testLigneCmdClient.getMontantTotal()).isEqualByComparingTo(UPDATED_MONTANT_TOTAL);
        assertThat(testLigneCmdClient.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testLigneCmdClient.getStatutCmd()).isEqualTo(UPDATED_STATUT_CMD);
    }

    @Test
    @Transactional
    void patchNonExistingLigneCmdClient() throws Exception {
        int databaseSizeBeforeUpdate = ligneCmdClientRepository.findAll().size();
        ligneCmdClient.setId(count.incrementAndGet());

        // Create the LigneCmdClient
        LigneCmdClientDTO ligneCmdClientDTO = ligneCmdClientMapper.toDto(ligneCmdClient);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneCmdClientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ligneCmdClientDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdClientDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCmdClient in the database
        List<LigneCmdClient> ligneCmdClientList = ligneCmdClientRepository.findAll();
        assertThat(ligneCmdClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLigneCmdClient() throws Exception {
        int databaseSizeBeforeUpdate = ligneCmdClientRepository.findAll().size();
        ligneCmdClient.setId(count.incrementAndGet());

        // Create the LigneCmdClient
        LigneCmdClientDTO ligneCmdClientDTO = ligneCmdClientMapper.toDto(ligneCmdClient);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCmdClientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdClientDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCmdClient in the database
        List<LigneCmdClient> ligneCmdClientList = ligneCmdClientRepository.findAll();
        assertThat(ligneCmdClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLigneCmdClient() throws Exception {
        int databaseSizeBeforeUpdate = ligneCmdClientRepository.findAll().size();
        ligneCmdClient.setId(count.incrementAndGet());

        // Create the LigneCmdClient
        LigneCmdClientDTO ligneCmdClientDTO = ligneCmdClientMapper.toDto(ligneCmdClient);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCmdClientMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdClientDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LigneCmdClient in the database
        List<LigneCmdClient> ligneCmdClientList = ligneCmdClientRepository.findAll();
        assertThat(ligneCmdClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLigneCmdClient() throws Exception {
        // Initialize the database
        ligneCmdClientRepository.saveAndFlush(ligneCmdClient);

        int databaseSizeBeforeDelete = ligneCmdClientRepository.findAll().size();

        // Delete the ligneCmdClient
        restLigneCmdClientMockMvc
            .perform(delete(ENTITY_API_URL_ID, ligneCmdClient.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LigneCmdClient> ligneCmdClientList = ligneCmdClientRepository.findAll();
        assertThat(ligneCmdClientList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
