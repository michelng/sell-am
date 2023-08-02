package com.mngsolution.sellam.web.rest;

import static com.mngsolution.sellam.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mngsolution.sellam.IntegrationTest;
import com.mngsolution.sellam.domain.CmdFournisseur;
import com.mngsolution.sellam.domain.enumeration.StatutCmd;
import com.mngsolution.sellam.repository.CmdFournisseurRepository;
import com.mngsolution.sellam.service.dto.CmdFournisseurDTO;
import com.mngsolution.sellam.service.mapper.CmdFournisseurMapper;
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
 * Integration tests for the {@link CmdFournisseurResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CmdFournisseurResourceIT {

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

    private static final String ENTITY_API_URL = "/api/cmd-fournisseurs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CmdFournisseurRepository cmdFournisseurRepository;

    @Autowired
    private CmdFournisseurMapper cmdFournisseurMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCmdFournisseurMockMvc;

    private CmdFournisseur cmdFournisseur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CmdFournisseur createEntity(EntityManager em) {
        CmdFournisseur cmdFournisseur = new CmdFournisseur()
            .code(DEFAULT_CODE)
            .dateCommande(DEFAULT_DATE_COMMANDE)
            .dateLivraisonPrevue(DEFAULT_DATE_LIVRAISON_PREVUE)
            .montantTotal(DEFAULT_MONTANT_TOTAL)
            .commentaire(DEFAULT_COMMENTAIRE)
            .statutCmd(DEFAULT_STATUT_CMD);
        return cmdFournisseur;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CmdFournisseur createUpdatedEntity(EntityManager em) {
        CmdFournisseur cmdFournisseur = new CmdFournisseur()
            .code(UPDATED_CODE)
            .dateCommande(UPDATED_DATE_COMMANDE)
            .dateLivraisonPrevue(UPDATED_DATE_LIVRAISON_PREVUE)
            .montantTotal(UPDATED_MONTANT_TOTAL)
            .commentaire(UPDATED_COMMENTAIRE)
            .statutCmd(UPDATED_STATUT_CMD);
        return cmdFournisseur;
    }

    @BeforeEach
    public void initTest() {
        cmdFournisseur = createEntity(em);
    }

    @Test
    @Transactional
    void createCmdFournisseur() throws Exception {
        int databaseSizeBeforeCreate = cmdFournisseurRepository.findAll().size();
        // Create the CmdFournisseur
        CmdFournisseurDTO cmdFournisseurDTO = cmdFournisseurMapper.toDto(cmdFournisseur);
        restCmdFournisseurMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cmdFournisseurDTO))
            )
            .andExpect(status().isCreated());

        // Validate the CmdFournisseur in the database
        List<CmdFournisseur> cmdFournisseurList = cmdFournisseurRepository.findAll();
        assertThat(cmdFournisseurList).hasSize(databaseSizeBeforeCreate + 1);
        CmdFournisseur testCmdFournisseur = cmdFournisseurList.get(cmdFournisseurList.size() - 1);
        assertThat(testCmdFournisseur.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testCmdFournisseur.getDateCommande()).isEqualTo(DEFAULT_DATE_COMMANDE);
        assertThat(testCmdFournisseur.getDateLivraisonPrevue()).isEqualTo(DEFAULT_DATE_LIVRAISON_PREVUE);
        assertThat(testCmdFournisseur.getMontantTotal()).isEqualByComparingTo(DEFAULT_MONTANT_TOTAL);
        assertThat(testCmdFournisseur.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
        assertThat(testCmdFournisseur.getStatutCmd()).isEqualTo(DEFAULT_STATUT_CMD);
    }

    @Test
    @Transactional
    void createCmdFournisseurWithExistingId() throws Exception {
        // Create the CmdFournisseur with an existing ID
        cmdFournisseur.setId(1L);
        CmdFournisseurDTO cmdFournisseurDTO = cmdFournisseurMapper.toDto(cmdFournisseur);

        int databaseSizeBeforeCreate = cmdFournisseurRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCmdFournisseurMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cmdFournisseurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CmdFournisseur in the database
        List<CmdFournisseur> cmdFournisseurList = cmdFournisseurRepository.findAll();
        assertThat(cmdFournisseurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCmdFournisseurs() throws Exception {
        // Initialize the database
        cmdFournisseurRepository.saveAndFlush(cmdFournisseur);

        // Get all the cmdFournisseurList
        restCmdFournisseurMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cmdFournisseur.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].dateCommande").value(hasItem(DEFAULT_DATE_COMMANDE.toString())))
            .andExpect(jsonPath("$.[*].dateLivraisonPrevue").value(hasItem(DEFAULT_DATE_LIVRAISON_PREVUE.toString())))
            .andExpect(jsonPath("$.[*].montantTotal").value(hasItem(sameNumber(DEFAULT_MONTANT_TOTAL))))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE)))
            .andExpect(jsonPath("$.[*].statutCmd").value(hasItem(DEFAULT_STATUT_CMD.toString())));
    }

    @Test
    @Transactional
    void getCmdFournisseur() throws Exception {
        // Initialize the database
        cmdFournisseurRepository.saveAndFlush(cmdFournisseur);

        // Get the cmdFournisseur
        restCmdFournisseurMockMvc
            .perform(get(ENTITY_API_URL_ID, cmdFournisseur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cmdFournisseur.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.dateCommande").value(DEFAULT_DATE_COMMANDE.toString()))
            .andExpect(jsonPath("$.dateLivraisonPrevue").value(DEFAULT_DATE_LIVRAISON_PREVUE.toString()))
            .andExpect(jsonPath("$.montantTotal").value(sameNumber(DEFAULT_MONTANT_TOTAL)))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE))
            .andExpect(jsonPath("$.statutCmd").value(DEFAULT_STATUT_CMD.toString()));
    }

    @Test
    @Transactional
    void getNonExistingCmdFournisseur() throws Exception {
        // Get the cmdFournisseur
        restCmdFournisseurMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCmdFournisseur() throws Exception {
        // Initialize the database
        cmdFournisseurRepository.saveAndFlush(cmdFournisseur);

        int databaseSizeBeforeUpdate = cmdFournisseurRepository.findAll().size();

        // Update the cmdFournisseur
        CmdFournisseur updatedCmdFournisseur = cmdFournisseurRepository.findById(cmdFournisseur.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCmdFournisseur are not directly saved in db
        em.detach(updatedCmdFournisseur);
        updatedCmdFournisseur
            .code(UPDATED_CODE)
            .dateCommande(UPDATED_DATE_COMMANDE)
            .dateLivraisonPrevue(UPDATED_DATE_LIVRAISON_PREVUE)
            .montantTotal(UPDATED_MONTANT_TOTAL)
            .commentaire(UPDATED_COMMENTAIRE)
            .statutCmd(UPDATED_STATUT_CMD);
        CmdFournisseurDTO cmdFournisseurDTO = cmdFournisseurMapper.toDto(updatedCmdFournisseur);

        restCmdFournisseurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cmdFournisseurDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cmdFournisseurDTO))
            )
            .andExpect(status().isOk());

        // Validate the CmdFournisseur in the database
        List<CmdFournisseur> cmdFournisseurList = cmdFournisseurRepository.findAll();
        assertThat(cmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
        CmdFournisseur testCmdFournisseur = cmdFournisseurList.get(cmdFournisseurList.size() - 1);
        assertThat(testCmdFournisseur.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testCmdFournisseur.getDateCommande()).isEqualTo(UPDATED_DATE_COMMANDE);
        assertThat(testCmdFournisseur.getDateLivraisonPrevue()).isEqualTo(UPDATED_DATE_LIVRAISON_PREVUE);
        assertThat(testCmdFournisseur.getMontantTotal()).isEqualByComparingTo(UPDATED_MONTANT_TOTAL);
        assertThat(testCmdFournisseur.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testCmdFournisseur.getStatutCmd()).isEqualTo(UPDATED_STATUT_CMD);
    }

    @Test
    @Transactional
    void putNonExistingCmdFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = cmdFournisseurRepository.findAll().size();
        cmdFournisseur.setId(count.incrementAndGet());

        // Create the CmdFournisseur
        CmdFournisseurDTO cmdFournisseurDTO = cmdFournisseurMapper.toDto(cmdFournisseur);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCmdFournisseurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cmdFournisseurDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cmdFournisseurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CmdFournisseur in the database
        List<CmdFournisseur> cmdFournisseurList = cmdFournisseurRepository.findAll();
        assertThat(cmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCmdFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = cmdFournisseurRepository.findAll().size();
        cmdFournisseur.setId(count.incrementAndGet());

        // Create the CmdFournisseur
        CmdFournisseurDTO cmdFournisseurDTO = cmdFournisseurMapper.toDto(cmdFournisseur);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCmdFournisseurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cmdFournisseurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CmdFournisseur in the database
        List<CmdFournisseur> cmdFournisseurList = cmdFournisseurRepository.findAll();
        assertThat(cmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCmdFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = cmdFournisseurRepository.findAll().size();
        cmdFournisseur.setId(count.incrementAndGet());

        // Create the CmdFournisseur
        CmdFournisseurDTO cmdFournisseurDTO = cmdFournisseurMapper.toDto(cmdFournisseur);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCmdFournisseurMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cmdFournisseurDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CmdFournisseur in the database
        List<CmdFournisseur> cmdFournisseurList = cmdFournisseurRepository.findAll();
        assertThat(cmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCmdFournisseurWithPatch() throws Exception {
        // Initialize the database
        cmdFournisseurRepository.saveAndFlush(cmdFournisseur);

        int databaseSizeBeforeUpdate = cmdFournisseurRepository.findAll().size();

        // Update the cmdFournisseur using partial update
        CmdFournisseur partialUpdatedCmdFournisseur = new CmdFournisseur();
        partialUpdatedCmdFournisseur.setId(cmdFournisseur.getId());

        partialUpdatedCmdFournisseur
            .dateCommande(UPDATED_DATE_COMMANDE)
            .dateLivraisonPrevue(UPDATED_DATE_LIVRAISON_PREVUE)
            .statutCmd(UPDATED_STATUT_CMD);

        restCmdFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCmdFournisseur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCmdFournisseur))
            )
            .andExpect(status().isOk());

        // Validate the CmdFournisseur in the database
        List<CmdFournisseur> cmdFournisseurList = cmdFournisseurRepository.findAll();
        assertThat(cmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
        CmdFournisseur testCmdFournisseur = cmdFournisseurList.get(cmdFournisseurList.size() - 1);
        assertThat(testCmdFournisseur.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testCmdFournisseur.getDateCommande()).isEqualTo(UPDATED_DATE_COMMANDE);
        assertThat(testCmdFournisseur.getDateLivraisonPrevue()).isEqualTo(UPDATED_DATE_LIVRAISON_PREVUE);
        assertThat(testCmdFournisseur.getMontantTotal()).isEqualByComparingTo(DEFAULT_MONTANT_TOTAL);
        assertThat(testCmdFournisseur.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
        assertThat(testCmdFournisseur.getStatutCmd()).isEqualTo(UPDATED_STATUT_CMD);
    }

    @Test
    @Transactional
    void fullUpdateCmdFournisseurWithPatch() throws Exception {
        // Initialize the database
        cmdFournisseurRepository.saveAndFlush(cmdFournisseur);

        int databaseSizeBeforeUpdate = cmdFournisseurRepository.findAll().size();

        // Update the cmdFournisseur using partial update
        CmdFournisseur partialUpdatedCmdFournisseur = new CmdFournisseur();
        partialUpdatedCmdFournisseur.setId(cmdFournisseur.getId());

        partialUpdatedCmdFournisseur
            .code(UPDATED_CODE)
            .dateCommande(UPDATED_DATE_COMMANDE)
            .dateLivraisonPrevue(UPDATED_DATE_LIVRAISON_PREVUE)
            .montantTotal(UPDATED_MONTANT_TOTAL)
            .commentaire(UPDATED_COMMENTAIRE)
            .statutCmd(UPDATED_STATUT_CMD);

        restCmdFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCmdFournisseur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCmdFournisseur))
            )
            .andExpect(status().isOk());

        // Validate the CmdFournisseur in the database
        List<CmdFournisseur> cmdFournisseurList = cmdFournisseurRepository.findAll();
        assertThat(cmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
        CmdFournisseur testCmdFournisseur = cmdFournisseurList.get(cmdFournisseurList.size() - 1);
        assertThat(testCmdFournisseur.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testCmdFournisseur.getDateCommande()).isEqualTo(UPDATED_DATE_COMMANDE);
        assertThat(testCmdFournisseur.getDateLivraisonPrevue()).isEqualTo(UPDATED_DATE_LIVRAISON_PREVUE);
        assertThat(testCmdFournisseur.getMontantTotal()).isEqualByComparingTo(UPDATED_MONTANT_TOTAL);
        assertThat(testCmdFournisseur.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testCmdFournisseur.getStatutCmd()).isEqualTo(UPDATED_STATUT_CMD);
    }

    @Test
    @Transactional
    void patchNonExistingCmdFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = cmdFournisseurRepository.findAll().size();
        cmdFournisseur.setId(count.incrementAndGet());

        // Create the CmdFournisseur
        CmdFournisseurDTO cmdFournisseurDTO = cmdFournisseurMapper.toDto(cmdFournisseur);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCmdFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cmdFournisseurDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cmdFournisseurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CmdFournisseur in the database
        List<CmdFournisseur> cmdFournisseurList = cmdFournisseurRepository.findAll();
        assertThat(cmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCmdFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = cmdFournisseurRepository.findAll().size();
        cmdFournisseur.setId(count.incrementAndGet());

        // Create the CmdFournisseur
        CmdFournisseurDTO cmdFournisseurDTO = cmdFournisseurMapper.toDto(cmdFournisseur);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCmdFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cmdFournisseurDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CmdFournisseur in the database
        List<CmdFournisseur> cmdFournisseurList = cmdFournisseurRepository.findAll();
        assertThat(cmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCmdFournisseur() throws Exception {
        int databaseSizeBeforeUpdate = cmdFournisseurRepository.findAll().size();
        cmdFournisseur.setId(count.incrementAndGet());

        // Create the CmdFournisseur
        CmdFournisseurDTO cmdFournisseurDTO = cmdFournisseurMapper.toDto(cmdFournisseur);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCmdFournisseurMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cmdFournisseurDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CmdFournisseur in the database
        List<CmdFournisseur> cmdFournisseurList = cmdFournisseurRepository.findAll();
        assertThat(cmdFournisseurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCmdFournisseur() throws Exception {
        // Initialize the database
        cmdFournisseurRepository.saveAndFlush(cmdFournisseur);

        int databaseSizeBeforeDelete = cmdFournisseurRepository.findAll().size();

        // Delete the cmdFournisseur
        restCmdFournisseurMockMvc
            .perform(delete(ENTITY_API_URL_ID, cmdFournisseur.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CmdFournisseur> cmdFournisseurList = cmdFournisseurRepository.findAll();
        assertThat(cmdFournisseurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
