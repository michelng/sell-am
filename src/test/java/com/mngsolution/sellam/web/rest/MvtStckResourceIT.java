package com.mngsolution.sellam.web.rest;

import static com.mngsolution.sellam.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mngsolution.sellam.IntegrationTest;
import com.mngsolution.sellam.domain.MvtStck;
import com.mngsolution.sellam.domain.enumeration.TypeMvt;
import com.mngsolution.sellam.repository.MvtStckRepository;
import com.mngsolution.sellam.service.dto.MvtStckDTO;
import com.mngsolution.sellam.service.mapper.MvtStckMapper;
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
 * Integration tests for the {@link MvtStckResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MvtStckResourceIT {

    private static final Instant DEFAULT_DATE_MVNT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_MVNT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_QUANTITE = new BigDecimal(1);
    private static final BigDecimal UPDATED_QUANTITE = new BigDecimal(2);

    private static final TypeMvt DEFAULT_TYPE_MVT = TypeMvt.ENTREE_DE_STOCK;
    private static final TypeMvt UPDATED_TYPE_MVT = TypeMvt.SORTIE_DE_STOCK;

    private static final String ENTITY_API_URL = "/api/mvt-stcks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MvtStckRepository mvtStckRepository;

    @Autowired
    private MvtStckMapper mvtStckMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMvtStckMockMvc;

    private MvtStck mvtStck;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MvtStck createEntity(EntityManager em) {
        MvtStck mvtStck = new MvtStck().dateMvnt(DEFAULT_DATE_MVNT).quantite(DEFAULT_QUANTITE).typeMvt(DEFAULT_TYPE_MVT);
        return mvtStck;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MvtStck createUpdatedEntity(EntityManager em) {
        MvtStck mvtStck = new MvtStck().dateMvnt(UPDATED_DATE_MVNT).quantite(UPDATED_QUANTITE).typeMvt(UPDATED_TYPE_MVT);
        return mvtStck;
    }

    @BeforeEach
    public void initTest() {
        mvtStck = createEntity(em);
    }

    @Test
    @Transactional
    void createMvtStck() throws Exception {
        int databaseSizeBeforeCreate = mvtStckRepository.findAll().size();
        // Create the MvtStck
        MvtStckDTO mvtStckDTO = mvtStckMapper.toDto(mvtStck);
        restMvtStckMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mvtStckDTO)))
            .andExpect(status().isCreated());

        // Validate the MvtStck in the database
        List<MvtStck> mvtStckList = mvtStckRepository.findAll();
        assertThat(mvtStckList).hasSize(databaseSizeBeforeCreate + 1);
        MvtStck testMvtStck = mvtStckList.get(mvtStckList.size() - 1);
        assertThat(testMvtStck.getDateMvnt()).isEqualTo(DEFAULT_DATE_MVNT);
        assertThat(testMvtStck.getQuantite()).isEqualByComparingTo(DEFAULT_QUANTITE);
        assertThat(testMvtStck.getTypeMvt()).isEqualTo(DEFAULT_TYPE_MVT);
    }

    @Test
    @Transactional
    void createMvtStckWithExistingId() throws Exception {
        // Create the MvtStck with an existing ID
        mvtStck.setId(1L);
        MvtStckDTO mvtStckDTO = mvtStckMapper.toDto(mvtStck);

        int databaseSizeBeforeCreate = mvtStckRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMvtStckMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mvtStckDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MvtStck in the database
        List<MvtStck> mvtStckList = mvtStckRepository.findAll();
        assertThat(mvtStckList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMvtStcks() throws Exception {
        // Initialize the database
        mvtStckRepository.saveAndFlush(mvtStck);

        // Get all the mvtStckList
        restMvtStckMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mvtStck.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateMvnt").value(hasItem(DEFAULT_DATE_MVNT.toString())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(sameNumber(DEFAULT_QUANTITE))))
            .andExpect(jsonPath("$.[*].typeMvt").value(hasItem(DEFAULT_TYPE_MVT.toString())));
    }

    @Test
    @Transactional
    void getMvtStck() throws Exception {
        // Initialize the database
        mvtStckRepository.saveAndFlush(mvtStck);

        // Get the mvtStck
        restMvtStckMockMvc
            .perform(get(ENTITY_API_URL_ID, mvtStck.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(mvtStck.getId().intValue()))
            .andExpect(jsonPath("$.dateMvnt").value(DEFAULT_DATE_MVNT.toString()))
            .andExpect(jsonPath("$.quantite").value(sameNumber(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.typeMvt").value(DEFAULT_TYPE_MVT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingMvtStck() throws Exception {
        // Get the mvtStck
        restMvtStckMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingMvtStck() throws Exception {
        // Initialize the database
        mvtStckRepository.saveAndFlush(mvtStck);

        int databaseSizeBeforeUpdate = mvtStckRepository.findAll().size();

        // Update the mvtStck
        MvtStck updatedMvtStck = mvtStckRepository.findById(mvtStck.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedMvtStck are not directly saved in db
        em.detach(updatedMvtStck);
        updatedMvtStck.dateMvnt(UPDATED_DATE_MVNT).quantite(UPDATED_QUANTITE).typeMvt(UPDATED_TYPE_MVT);
        MvtStckDTO mvtStckDTO = mvtStckMapper.toDto(updatedMvtStck);

        restMvtStckMockMvc
            .perform(
                put(ENTITY_API_URL_ID, mvtStckDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(mvtStckDTO))
            )
            .andExpect(status().isOk());

        // Validate the MvtStck in the database
        List<MvtStck> mvtStckList = mvtStckRepository.findAll();
        assertThat(mvtStckList).hasSize(databaseSizeBeforeUpdate);
        MvtStck testMvtStck = mvtStckList.get(mvtStckList.size() - 1);
        assertThat(testMvtStck.getDateMvnt()).isEqualTo(UPDATED_DATE_MVNT);
        assertThat(testMvtStck.getQuantite()).isEqualByComparingTo(UPDATED_QUANTITE);
        assertThat(testMvtStck.getTypeMvt()).isEqualTo(UPDATED_TYPE_MVT);
    }

    @Test
    @Transactional
    void putNonExistingMvtStck() throws Exception {
        int databaseSizeBeforeUpdate = mvtStckRepository.findAll().size();
        mvtStck.setId(count.incrementAndGet());

        // Create the MvtStck
        MvtStckDTO mvtStckDTO = mvtStckMapper.toDto(mvtStck);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMvtStckMockMvc
            .perform(
                put(ENTITY_API_URL_ID, mvtStckDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(mvtStckDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MvtStck in the database
        List<MvtStck> mvtStckList = mvtStckRepository.findAll();
        assertThat(mvtStckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMvtStck() throws Exception {
        int databaseSizeBeforeUpdate = mvtStckRepository.findAll().size();
        mvtStck.setId(count.incrementAndGet());

        // Create the MvtStck
        MvtStckDTO mvtStckDTO = mvtStckMapper.toDto(mvtStck);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMvtStckMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(mvtStckDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MvtStck in the database
        List<MvtStck> mvtStckList = mvtStckRepository.findAll();
        assertThat(mvtStckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMvtStck() throws Exception {
        int databaseSizeBeforeUpdate = mvtStckRepository.findAll().size();
        mvtStck.setId(count.incrementAndGet());

        // Create the MvtStck
        MvtStckDTO mvtStckDTO = mvtStckMapper.toDto(mvtStck);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMvtStckMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mvtStckDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MvtStck in the database
        List<MvtStck> mvtStckList = mvtStckRepository.findAll();
        assertThat(mvtStckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMvtStckWithPatch() throws Exception {
        // Initialize the database
        mvtStckRepository.saveAndFlush(mvtStck);

        int databaseSizeBeforeUpdate = mvtStckRepository.findAll().size();

        // Update the mvtStck using partial update
        MvtStck partialUpdatedMvtStck = new MvtStck();
        partialUpdatedMvtStck.setId(mvtStck.getId());

        partialUpdatedMvtStck.typeMvt(UPDATED_TYPE_MVT);

        restMvtStckMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMvtStck.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMvtStck))
            )
            .andExpect(status().isOk());

        // Validate the MvtStck in the database
        List<MvtStck> mvtStckList = mvtStckRepository.findAll();
        assertThat(mvtStckList).hasSize(databaseSizeBeforeUpdate);
        MvtStck testMvtStck = mvtStckList.get(mvtStckList.size() - 1);
        assertThat(testMvtStck.getDateMvnt()).isEqualTo(DEFAULT_DATE_MVNT);
        assertThat(testMvtStck.getQuantite()).isEqualByComparingTo(DEFAULT_QUANTITE);
        assertThat(testMvtStck.getTypeMvt()).isEqualTo(UPDATED_TYPE_MVT);
    }

    @Test
    @Transactional
    void fullUpdateMvtStckWithPatch() throws Exception {
        // Initialize the database
        mvtStckRepository.saveAndFlush(mvtStck);

        int databaseSizeBeforeUpdate = mvtStckRepository.findAll().size();

        // Update the mvtStck using partial update
        MvtStck partialUpdatedMvtStck = new MvtStck();
        partialUpdatedMvtStck.setId(mvtStck.getId());

        partialUpdatedMvtStck.dateMvnt(UPDATED_DATE_MVNT).quantite(UPDATED_QUANTITE).typeMvt(UPDATED_TYPE_MVT);

        restMvtStckMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMvtStck.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMvtStck))
            )
            .andExpect(status().isOk());

        // Validate the MvtStck in the database
        List<MvtStck> mvtStckList = mvtStckRepository.findAll();
        assertThat(mvtStckList).hasSize(databaseSizeBeforeUpdate);
        MvtStck testMvtStck = mvtStckList.get(mvtStckList.size() - 1);
        assertThat(testMvtStck.getDateMvnt()).isEqualTo(UPDATED_DATE_MVNT);
        assertThat(testMvtStck.getQuantite()).isEqualByComparingTo(UPDATED_QUANTITE);
        assertThat(testMvtStck.getTypeMvt()).isEqualTo(UPDATED_TYPE_MVT);
    }

    @Test
    @Transactional
    void patchNonExistingMvtStck() throws Exception {
        int databaseSizeBeforeUpdate = mvtStckRepository.findAll().size();
        mvtStck.setId(count.incrementAndGet());

        // Create the MvtStck
        MvtStckDTO mvtStckDTO = mvtStckMapper.toDto(mvtStck);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMvtStckMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, mvtStckDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mvtStckDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MvtStck in the database
        List<MvtStck> mvtStckList = mvtStckRepository.findAll();
        assertThat(mvtStckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMvtStck() throws Exception {
        int databaseSizeBeforeUpdate = mvtStckRepository.findAll().size();
        mvtStck.setId(count.incrementAndGet());

        // Create the MvtStck
        MvtStckDTO mvtStckDTO = mvtStckMapper.toDto(mvtStck);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMvtStckMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mvtStckDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MvtStck in the database
        List<MvtStck> mvtStckList = mvtStckRepository.findAll();
        assertThat(mvtStckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMvtStck() throws Exception {
        int databaseSizeBeforeUpdate = mvtStckRepository.findAll().size();
        mvtStck.setId(count.incrementAndGet());

        // Create the MvtStck
        MvtStckDTO mvtStckDTO = mvtStckMapper.toDto(mvtStck);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMvtStckMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(mvtStckDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MvtStck in the database
        List<MvtStck> mvtStckList = mvtStckRepository.findAll();
        assertThat(mvtStckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMvtStck() throws Exception {
        // Initialize the database
        mvtStckRepository.saveAndFlush(mvtStck);

        int databaseSizeBeforeDelete = mvtStckRepository.findAll().size();

        // Delete the mvtStck
        restMvtStckMockMvc
            .perform(delete(ENTITY_API_URL_ID, mvtStck.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MvtStck> mvtStckList = mvtStckRepository.findAll();
        assertThat(mvtStckList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
