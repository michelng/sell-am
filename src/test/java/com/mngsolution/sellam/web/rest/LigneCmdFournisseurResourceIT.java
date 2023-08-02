package com.mngsolution.sellam.web.rest;

import static com.mngsolution.sellam.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mngsolution.sellam.IntegrationTest;
import com.mngsolution.sellam.domain.LigneCmdFournisseur;
import com.mngsolution.sellam.domain.enumeration.StatutCmd;
import com.mngsolution.sellam.repository.LigneCmdFournisseurRepository;
import com.mngsolution.sellam.service.dto.LigneCmdFournisseurDTO;
import com.mngsolution.sellam.service.mapper.LigneCmdFournisseurMapper;
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
 * Integration tests for the {@link LigneCmdFournisseurResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LigneCmdFournisseurResourceIT {

    private static final BigDecimal DEFAULT_QUANTITE = new BigDecimal(1);
    private static final BigDecimal UPDATED_QUANTITE = new BigDecimal(2);

    private static final BigDecimal DEFAULT_PRIX_UNITAIRE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRIX_UNITAIRE = new BigDecimal(2);

    private static final Instant DEFAULT_DATE_LIVRAISON_PREVU = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_LIVRAISON_PREVU = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_MONTANT_TOTAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_MONTANT_TOTAL = new BigDecimal(2);

    private static final String DEFAULT_COMMENTAIRE = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTAIRE = "BBBBBBBBBB";

    private static final StatutCmd DEFAULT_STATUT_CMD = StatutCmd.EN_COURS_DE_TRAITEMENT;
    private static final StatutCmd UPDATED_STATUT_CMD = StatutCmd.LIVREE;

    private static final String ENTITY_API_URL = "/api/ligne-cmd-fournisseurs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LigneCmdFournisseurRepository ligneCmdFournisseurRepository;

    @Autowired
    private LigneCmdFournisseurMapper ligneCmdFournisseurMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLigneCmdFournisseurMockMvc;

    private LigneCmdFournisseur ligneCmdFournisseur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneCmdFournisseur createEntity(EntityManager em) {
        LigneCmdFournisseur ligneCmdFournisseur = new LigneCmdFournisseur()
            .quantite(DEFAULT_QUANTITE)
            .prixUnitaire(DEFAULT_PRIX_UNITAIRE)
            .dateLivraisonPrevu(DEFAULT_DATE_LIVRAISON_PREVU)
            .montantTotal(DEFAULT_MONTANT_TOTAL)
            .commentaire(DEFAULT_COMMENTAIRE)
            .statutCmd(DEFAULT_STATUT_CMD);
        return ligneCmdFournisseur;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneCmdFournisseur createUpdatedEntity(EntityManager em) {
        LigneCmdFournisseur ligneCmdFournisseur = new LigneCmdFournisseur()
            .quantite(UPDATED_QUANTITE)
            .prixUnitaire(UPDATED_PRIX_UNITAIRE)
            .dateLivraisonPrevu(UPDATED_DATE_LIVRAISON_PREVU)
            .montantTotal(UPDATED_MONTANT_TOTAL)
            .commentaire(UPDATED_COMMENTAIRE)
            .statutCmd(UPDATED_STATUT_CMD);
        return ligneCmdFournisseur;
    }

    @BeforeEach
    public void initTest() {
        ligneCmdFournisseur = createEntity(em);
    }

    @Test
    @Transactional
    void createLigneCmdFournisseur() throws Exception {
        int databaseSizeBeforeCreate = ligneCmdFournisseurRepository.findAll().size();
        // Create the LigneCmdFournisseur
        LigneCmdFournisseurDTO ligneCmdFournisseurDTO = ligneCmdFournisseurMapper.toDto(ligneCmdFournisseur);
        restLigneCmdFournisseurMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdFournisseurDTO))
            )
            .andExpect(status().isCreated());

        // Validate the LigneCmdFournisseur in the database
        List<LigneCmdFournisseur> ligneCmdFournisseurList = ligneCmdFournisseurRepository.findAll();
        assertThat(ligneCmdFournisseurList).hasSize(databaseSizeBeforeCreate + 1);
        LigneCmdFournisseur testLigneCmdFournisseur = ligneCmdFournisseurList.get(ligneCmdFournisseurList.size() - 1);
        assertThat(testLigneCmdFournisseur.getQuantite()).isEqualByComparingTo(DEFAULT_QUANTITE);
        assertThat(testLigneCmdFournisseur.getPrixUnitaire()).isEqualByComparingTo(DEFAULT_PRIX_UNITAIRE);
        assertThat(testLigneCmdFournisseur.getDateLivraisonPrevu()).isEqualTo(DEFAULT_DATE_LIVRAISON_PREVU);
        assertThat(testLigneCmdFournisseur.getMontantTotal()).isEqualByComparingTo(DEFAULT_MONTANT_TOTAL);
        assertThat(testLigneCmdFournisseur.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
        assertThat(testLigneCmdFournisseur.getStatutCmd()).isEqualTo(DEFAULT_STATUT_CMD);
    }

    @Test
    @Transactional
    void createLigneCmdFournisseurWithExistingId() throws Exception {
        // Create the LigneCmdFournisseur with an existing ID
        ligneCmdFournisseur.setId(1L);
        LigneCmdFournisseurDTO ligneCmdFournisseurDTO = ligneCmdFournisseurMapper.toDto(ligneCmdFournisseur);

        int databaseSizeBeforeCreate = ligneCmdFournisseurRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLigneCmdFournisseurMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdFournisseurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCmdFournisseur in the database
        List<LigneCmdFournisseur> ligneCmdFournisseurList = ligneCmdFournisseurRepository.findAll();
        assertThat(ligneCmdFournisseurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLigneCmdFournisseurs() throws Exception {
        // Initialize the database
        ligneCmdFournisseurRepository.saveAndFlush(ligneCmdFournisseur);

        // Get all the ligneCmdFournisseurList
        restLigneCmdFournisseurMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ligneCmdFournisseur.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(sameNumber(DEFAULT_QUANTITE))))
            .andExpect(jsonPath("$.[*].prixUnitaire").value(hasItem(sameNumber(DEFAULT_PRIX_UNITAIRE))))
            .andExpect(jsonPath("$.[*].dateLivraisonPrevu").value(hasItem(DEFAULT_DATE_LIVRAISON_PREVU.toString())))
            .andExpect(jsonPath("$.[*].montantTotal").value(hasItem(sameNumber(DEFAULT_MONTANT_TOTAL))))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE)))
            .andExpect(jsonPath("$.[*].statutCmd").value(hasItem(DEFAULT_STATUT_CMD.toString())));
    }

    @Test
    @Transactional
    void getLigneCmdFournisseur() throws Exception {
        // Initialize the database
        ligneCmdFournisseurRepository.saveAndFlush(ligneCmdFournisseur);

        // Get the ligneCmdFournisseur
        restLigneCmdFournisseurMockMvc
            .perform(get(ENTITY_API_URL_ID, ligneCmdFournisseur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ligneCmdFournisseur.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(sameNumber(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.prixUnitaire").value(sameNumber(DEFAULT_PRIX_UNITAIRE)))
            .andExpect(jsonPath("$.dateLivraisonPrevu").value(DEFAULT_DATE_LIVRAISON_PREVU.toString()))
            .andExpect(jsonPath("$.montantTotal").value(sameNumber(DEFAULT_MONTANT_TOTAL)))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE))
            .andExpect(jsonPath("$.statutCmd").value(DEFAULT_STATUT_CMD.toString()));
    }

    @Test
    @Transactional
    void getNonExistingLigneCmdFournisseur() throws Exception {
        // Get the ligneCmdFournisseur
        restLigneCmdFournisseurMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingLigneCmdFournisseur() throws Exception {
        // Initialize the database
        ligneCmdFournisseurRepository.saveAndFlush(ligneCmdFournisseur);

        int databaseSizeBeforeUpdate = ligneCmdFournisseurRepository.findAll().size();

        // Update the ligneCmdFournisseur
        LigneCmdFournisseur updatedLigneCmdFournisseur = ligneCmdFournisseurRepository.findById(ligneCmdFournisseur.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedLigneCmdFournisseur are not directly saved in db
        em.detach(updatedLigneCmdFournisseur);
        updatedLigneCmdFournisseur
            .quantite(UPDATED_QUANTITE)
            .prixUnitaire(UPDATED_PRIX_UNITAIRE)
            .dateLivraisonPrevu(UPDATED_DATE_LIVRAISON_PREVU)
            .montantTotal(UPDATED_MONTANT_TOTAL)
            .commentaire(UPDATED_COMMENTAIRE)
            .statutCmd(UPDATED_STATUT_CMD);
        LigneCmdFournisseurDTO ligneCmdFournisseurDTO = ligneCmdFournisseurMapper.toDto(updatedLigneCmdFournisseur);

        restLigneCmdFournisseurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ligneCmdFournisseurDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdFournisseurDTO))
            )
            .andExpect(status().isOk());

        // Validate the LigneCmdFournisseur in the database
        List<LigneCmdFournisseur> ligneCmdFournisseurList = ligneCmdFournisseurRepository.findAll();
        assertThat(ligneCmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
        LigneCmdFournisseur testLigneCmdFournisseur = ligneCmdFournisseurList.get(ligneCmdFournisseurList.size() - 1);
        assertThat(testLigneCmdFournisseur.getQuantite()).isEqualByComparingTo(UPDATED_QUANTITE);
        assertThat(testLigneCmdFournisseur.getPrixUnitaire()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE);
        assertThat(testLigneCmdFournisseur.getDateLivraisonPrevu()).isEqualTo(UPDATED_DATE_LIVRAISON_PREVU);
        assertThat(testLigneCmdFournisseur.getMontantTotal()).isEqualByComparingTo(UPDATED_MONTANT_TOTAL);
        assertThat(testLigneCmdFournisseur.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testLigneCmdFournisseur.getStatutCmd()).isEqualTo(UPDATED_STATUT_CMD);
    }

    @Test
    @Transactional
    void putNonExistingLigneCmdFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = ligneCmdFournisseurRepository.findAll().size();
        ligneCmdFournisseur.setId(count.incrementAndGet());

        // Create the LigneCmdFournisseur
        LigneCmdFournisseurDTO ligneCmdFournisseurDTO = ligneCmdFournisseurMapper.toDto(ligneCmdFournisseur);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneCmdFournisseurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ligneCmdFournisseurDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdFournisseurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCmdFournisseur in the database
        List<LigneCmdFournisseur> ligneCmdFournisseurList = ligneCmdFournisseurRepository.findAll();
        assertThat(ligneCmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLigneCmdFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = ligneCmdFournisseurRepository.findAll().size();
        ligneCmdFournisseur.setId(count.incrementAndGet());

        // Create the LigneCmdFournisseur
        LigneCmdFournisseurDTO ligneCmdFournisseurDTO = ligneCmdFournisseurMapper.toDto(ligneCmdFournisseur);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCmdFournisseurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdFournisseurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCmdFournisseur in the database
        List<LigneCmdFournisseur> ligneCmdFournisseurList = ligneCmdFournisseurRepository.findAll();
        assertThat(ligneCmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLigneCmdFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = ligneCmdFournisseurRepository.findAll().size();
        ligneCmdFournisseur.setId(count.incrementAndGet());

        // Create the LigneCmdFournisseur
        LigneCmdFournisseurDTO ligneCmdFournisseurDTO = ligneCmdFournisseurMapper.toDto(ligneCmdFournisseur);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCmdFournisseurMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdFournisseurDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LigneCmdFournisseur in the database
        List<LigneCmdFournisseur> ligneCmdFournisseurList = ligneCmdFournisseurRepository.findAll();
        assertThat(ligneCmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLigneCmdFournisseurWithPatch() throws Exception {
        // Initialize the database
        ligneCmdFournisseurRepository.saveAndFlush(ligneCmdFournisseur);

        int databaseSizeBeforeUpdate = ligneCmdFournisseurRepository.findAll().size();

        // Update the ligneCmdFournisseur using partial update
        LigneCmdFournisseur partialUpdatedLigneCmdFournisseur = new LigneCmdFournisseur();
        partialUpdatedLigneCmdFournisseur.setId(ligneCmdFournisseur.getId());

        partialUpdatedLigneCmdFournisseur.prixUnitaire(UPDATED_PRIX_UNITAIRE).dateLivraisonPrevu(UPDATED_DATE_LIVRAISON_PREVU);

        restLigneCmdFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLigneCmdFournisseur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLigneCmdFournisseur))
            )
            .andExpect(status().isOk());

        // Validate the LigneCmdFournisseur in the database
        List<LigneCmdFournisseur> ligneCmdFournisseurList = ligneCmdFournisseurRepository.findAll();
        assertThat(ligneCmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
        LigneCmdFournisseur testLigneCmdFournisseur = ligneCmdFournisseurList.get(ligneCmdFournisseurList.size() - 1);
        assertThat(testLigneCmdFournisseur.getQuantite()).isEqualByComparingTo(DEFAULT_QUANTITE);
        assertThat(testLigneCmdFournisseur.getPrixUnitaire()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE);
        assertThat(testLigneCmdFournisseur.getDateLivraisonPrevu()).isEqualTo(UPDATED_DATE_LIVRAISON_PREVU);
        assertThat(testLigneCmdFournisseur.getMontantTotal()).isEqualByComparingTo(DEFAULT_MONTANT_TOTAL);
        assertThat(testLigneCmdFournisseur.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
        assertThat(testLigneCmdFournisseur.getStatutCmd()).isEqualTo(DEFAULT_STATUT_CMD);
    }

    @Test
    @Transactional
    void fullUpdateLigneCmdFournisseurWithPatch() throws Exception {
        // Initialize the database
        ligneCmdFournisseurRepository.saveAndFlush(ligneCmdFournisseur);

        int databaseSizeBeforeUpdate = ligneCmdFournisseurRepository.findAll().size();

        // Update the ligneCmdFournisseur using partial update
        LigneCmdFournisseur partialUpdatedLigneCmdFournisseur = new LigneCmdFournisseur();
        partialUpdatedLigneCmdFournisseur.setId(ligneCmdFournisseur.getId());

        partialUpdatedLigneCmdFournisseur
            .quantite(UPDATED_QUANTITE)
            .prixUnitaire(UPDATED_PRIX_UNITAIRE)
            .dateLivraisonPrevu(UPDATED_DATE_LIVRAISON_PREVU)
            .montantTotal(UPDATED_MONTANT_TOTAL)
            .commentaire(UPDATED_COMMENTAIRE)
            .statutCmd(UPDATED_STATUT_CMD);

        restLigneCmdFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLigneCmdFournisseur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLigneCmdFournisseur))
            )
            .andExpect(status().isOk());

        // Validate the LigneCmdFournisseur in the database
        List<LigneCmdFournisseur> ligneCmdFournisseurList = ligneCmdFournisseurRepository.findAll();
        assertThat(ligneCmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
        LigneCmdFournisseur testLigneCmdFournisseur = ligneCmdFournisseurList.get(ligneCmdFournisseurList.size() - 1);
        assertThat(testLigneCmdFournisseur.getQuantite()).isEqualByComparingTo(UPDATED_QUANTITE);
        assertThat(testLigneCmdFournisseur.getPrixUnitaire()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE);
        assertThat(testLigneCmdFournisseur.getDateLivraisonPrevu()).isEqualTo(UPDATED_DATE_LIVRAISON_PREVU);
        assertThat(testLigneCmdFournisseur.getMontantTotal()).isEqualByComparingTo(UPDATED_MONTANT_TOTAL);
        assertThat(testLigneCmdFournisseur.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testLigneCmdFournisseur.getStatutCmd()).isEqualTo(UPDATED_STATUT_CMD);
    }

    @Test
    @Transactional
    void patchNonExistingLigneCmdFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = ligneCmdFournisseurRepository.findAll().size();
        ligneCmdFournisseur.setId(count.incrementAndGet());

        // Create the LigneCmdFournisseur
        LigneCmdFournisseurDTO ligneCmdFournisseurDTO = ligneCmdFournisseurMapper.toDto(ligneCmdFournisseur);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneCmdFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ligneCmdFournisseurDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdFournisseurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCmdFournisseur in the database
        List<LigneCmdFournisseur> ligneCmdFournisseurList = ligneCmdFournisseurRepository.findAll();
        assertThat(ligneCmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLigneCmdFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = ligneCmdFournisseurRepository.findAll().size();
        ligneCmdFournisseur.setId(count.incrementAndGet());

        // Create the LigneCmdFournisseur
        LigneCmdFournisseurDTO ligneCmdFournisseurDTO = ligneCmdFournisseurMapper.toDto(ligneCmdFournisseur);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCmdFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdFournisseurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCmdFournisseur in the database
        List<LigneCmdFournisseur> ligneCmdFournisseurList = ligneCmdFournisseurRepository.findAll();
        assertThat(ligneCmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLigneCmdFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = ligneCmdFournisseurRepository.findAll().size();
        ligneCmdFournisseur.setId(count.incrementAndGet());

        // Create the LigneCmdFournisseur
        LigneCmdFournisseurDTO ligneCmdFournisseurDTO = ligneCmdFournisseurMapper.toDto(ligneCmdFournisseur);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCmdFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneCmdFournisseurDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LigneCmdFournisseur in the database
        List<LigneCmdFournisseur> ligneCmdFournisseurList = ligneCmdFournisseurRepository.findAll();
        assertThat(ligneCmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLigneCmdFournisseur() throws Exception {
        // Initialize the database
        ligneCmdFournisseurRepository.saveAndFlush(ligneCmdFournisseur);

        int databaseSizeBeforeDelete = ligneCmdFournisseurRepository.findAll().size();

        // Delete the ligneCmdFournisseur
        restLigneCmdFournisseurMockMvc
            .perform(delete(ENTITY_API_URL_ID, ligneCmdFournisseur.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LigneCmdFournisseur> ligneCmdFournisseurList = ligneCmdFournisseurRepository.findAll();
        assertThat(ligneCmdFournisseurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
