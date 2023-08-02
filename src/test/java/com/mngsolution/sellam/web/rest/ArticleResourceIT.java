package com.mngsolution.sellam.web.rest;

import static com.mngsolution.sellam.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mngsolution.sellam.IntegrationTest;
import com.mngsolution.sellam.domain.Article;
import com.mngsolution.sellam.repository.ArticleRepository;
import com.mngsolution.sellam.service.dto.ArticleDTO;
import com.mngsolution.sellam.service.mapper.ArticleMapper;
import jakarta.persistence.EntityManager;
import java.math.BigDecimal;
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
 * Integration tests for the {@link ArticleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ArticleResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESIGNATION = "AAAAAAAAAA";
    private static final String UPDATED_DESIGNATION = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRIX_UNITAIRE_HT = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRIX_UNITAIRE_HT = new BigDecimal(2);

    private static final BigDecimal DEFAULT_TAUX_TVA = new BigDecimal(1);
    private static final BigDecimal UPDATED_TAUX_TVA = new BigDecimal(2);

    private static final BigDecimal DEFAULT_PRIX_UNITAIRE_TTC = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRIX_UNITAIRE_TTC = new BigDecimal(2);

    private static final String DEFAULT_PHOTO = "AAAAAAAAAA";
    private static final String UPDATED_PHOTO = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_QUANTITE_EN_STOCK = new BigDecimal(1);
    private static final BigDecimal UPDATED_QUANTITE_EN_STOCK = new BigDecimal(2);

    private static final BigDecimal DEFAULT_SEUIL_DE_REAPPROVISIONNEMENT = new BigDecimal(1);
    private static final BigDecimal UPDATED_SEUIL_DE_REAPPROVISIONNEMENT = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/articles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleMapper articleMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restArticleMockMvc;

    private Article article;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Article createEntity(EntityManager em) {
        Article article = new Article()
            .code(DEFAULT_CODE)
            .designation(DEFAULT_DESIGNATION)
            .prixUnitaireHt(DEFAULT_PRIX_UNITAIRE_HT)
            .tauxTva(DEFAULT_TAUX_TVA)
            .prixUnitaireTtc(DEFAULT_PRIX_UNITAIRE_TTC)
            .photo(DEFAULT_PHOTO)
            .quantiteEnStock(DEFAULT_QUANTITE_EN_STOCK)
            .seuilDeReapprovisionnement(DEFAULT_SEUIL_DE_REAPPROVISIONNEMENT);
        return article;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Article createUpdatedEntity(EntityManager em) {
        Article article = new Article()
            .code(UPDATED_CODE)
            .designation(UPDATED_DESIGNATION)
            .prixUnitaireHt(UPDATED_PRIX_UNITAIRE_HT)
            .tauxTva(UPDATED_TAUX_TVA)
            .prixUnitaireTtc(UPDATED_PRIX_UNITAIRE_TTC)
            .photo(UPDATED_PHOTO)
            .quantiteEnStock(UPDATED_QUANTITE_EN_STOCK)
            .seuilDeReapprovisionnement(UPDATED_SEUIL_DE_REAPPROVISIONNEMENT);
        return article;
    }

    @BeforeEach
    public void initTest() {
        article = createEntity(em);
    }

    @Test
    @Transactional
    void createArticle() throws Exception {
        int databaseSizeBeforeCreate = articleRepository.findAll().size();
        // Create the Article
        ArticleDTO articleDTO = articleMapper.toDto(article);
        restArticleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isCreated());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeCreate + 1);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testArticle.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testArticle.getPrixUnitaireHt()).isEqualByComparingTo(DEFAULT_PRIX_UNITAIRE_HT);
        assertThat(testArticle.getTauxTva()).isEqualByComparingTo(DEFAULT_TAUX_TVA);
        assertThat(testArticle.getPrixUnitaireTtc()).isEqualByComparingTo(DEFAULT_PRIX_UNITAIRE_TTC);
        assertThat(testArticle.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testArticle.getQuantiteEnStock()).isEqualByComparingTo(DEFAULT_QUANTITE_EN_STOCK);
        assertThat(testArticle.getSeuilDeReapprovisionnement()).isEqualByComparingTo(DEFAULT_SEUIL_DE_REAPPROVISIONNEMENT);
    }

    @Test
    @Transactional
    void createArticleWithExistingId() throws Exception {
        // Create the Article with an existing ID
        article.setId(1L);
        ArticleDTO articleDTO = articleMapper.toDto(article);

        int databaseSizeBeforeCreate = articleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllArticles() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList
        restArticleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(article.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].designation").value(hasItem(DEFAULT_DESIGNATION)))
            .andExpect(jsonPath("$.[*].prixUnitaireHt").value(hasItem(sameNumber(DEFAULT_PRIX_UNITAIRE_HT))))
            .andExpect(jsonPath("$.[*].tauxTva").value(hasItem(sameNumber(DEFAULT_TAUX_TVA))))
            .andExpect(jsonPath("$.[*].prixUnitaireTtc").value(hasItem(sameNumber(DEFAULT_PRIX_UNITAIRE_TTC))))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(DEFAULT_PHOTO)))
            .andExpect(jsonPath("$.[*].quantiteEnStock").value(hasItem(sameNumber(DEFAULT_QUANTITE_EN_STOCK))))
            .andExpect(jsonPath("$.[*].seuilDeReapprovisionnement").value(hasItem(sameNumber(DEFAULT_SEUIL_DE_REAPPROVISIONNEMENT))));
    }

    @Test
    @Transactional
    void getArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get the article
        restArticleMockMvc
            .perform(get(ENTITY_API_URL_ID, article.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(article.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.designation").value(DEFAULT_DESIGNATION))
            .andExpect(jsonPath("$.prixUnitaireHt").value(sameNumber(DEFAULT_PRIX_UNITAIRE_HT)))
            .andExpect(jsonPath("$.tauxTva").value(sameNumber(DEFAULT_TAUX_TVA)))
            .andExpect(jsonPath("$.prixUnitaireTtc").value(sameNumber(DEFAULT_PRIX_UNITAIRE_TTC)))
            .andExpect(jsonPath("$.photo").value(DEFAULT_PHOTO))
            .andExpect(jsonPath("$.quantiteEnStock").value(sameNumber(DEFAULT_QUANTITE_EN_STOCK)))
            .andExpect(jsonPath("$.seuilDeReapprovisionnement").value(sameNumber(DEFAULT_SEUIL_DE_REAPPROVISIONNEMENT)));
    }

    @Test
    @Transactional
    void getNonExistingArticle() throws Exception {
        // Get the article
        restArticleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // Update the article
        Article updatedArticle = articleRepository.findById(article.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedArticle are not directly saved in db
        em.detach(updatedArticle);
        updatedArticle
            .code(UPDATED_CODE)
            .designation(UPDATED_DESIGNATION)
            .prixUnitaireHt(UPDATED_PRIX_UNITAIRE_HT)
            .tauxTva(UPDATED_TAUX_TVA)
            .prixUnitaireTtc(UPDATED_PRIX_UNITAIRE_TTC)
            .photo(UPDATED_PHOTO)
            .quantiteEnStock(UPDATED_QUANTITE_EN_STOCK)
            .seuilDeReapprovisionnement(UPDATED_SEUIL_DE_REAPPROVISIONNEMENT);
        ArticleDTO articleDTO = articleMapper.toDto(updatedArticle);

        restArticleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, articleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(articleDTO))
            )
            .andExpect(status().isOk());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testArticle.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testArticle.getPrixUnitaireHt()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE_HT);
        assertThat(testArticle.getTauxTva()).isEqualByComparingTo(UPDATED_TAUX_TVA);
        assertThat(testArticle.getPrixUnitaireTtc()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE_TTC);
        assertThat(testArticle.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testArticle.getQuantiteEnStock()).isEqualByComparingTo(UPDATED_QUANTITE_EN_STOCK);
        assertThat(testArticle.getSeuilDeReapprovisionnement()).isEqualByComparingTo(UPDATED_SEUIL_DE_REAPPROVISIONNEMENT);
    }

    @Test
    @Transactional
    void putNonExistingArticle() throws Exception {
        int databaseSizeBeforeUpdate = articleRepository.findAll().size();
        article.setId(count.incrementAndGet());

        // Create the Article
        ArticleDTO articleDTO = articleMapper.toDto(article);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, articleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(articleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchArticle() throws Exception {
        int databaseSizeBeforeUpdate = articleRepository.findAll().size();
        article.setId(count.incrementAndGet());

        // Create the Article
        ArticleDTO articleDTO = articleMapper.toDto(article);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArticleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(articleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamArticle() throws Exception {
        int databaseSizeBeforeUpdate = articleRepository.findAll().size();
        article.setId(count.incrementAndGet());

        // Create the Article
        ArticleDTO articleDTO = articleMapper.toDto(article);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArticleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateArticleWithPatch() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // Update the article using partial update
        Article partialUpdatedArticle = new Article();
        partialUpdatedArticle.setId(article.getId());

        partialUpdatedArticle.tauxTva(UPDATED_TAUX_TVA).prixUnitaireTtc(UPDATED_PRIX_UNITAIRE_TTC);

        restArticleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedArticle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedArticle))
            )
            .andExpect(status().isOk());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testArticle.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testArticle.getPrixUnitaireHt()).isEqualByComparingTo(DEFAULT_PRIX_UNITAIRE_HT);
        assertThat(testArticle.getTauxTva()).isEqualByComparingTo(UPDATED_TAUX_TVA);
        assertThat(testArticle.getPrixUnitaireTtc()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE_TTC);
        assertThat(testArticle.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testArticle.getQuantiteEnStock()).isEqualByComparingTo(DEFAULT_QUANTITE_EN_STOCK);
        assertThat(testArticle.getSeuilDeReapprovisionnement()).isEqualByComparingTo(DEFAULT_SEUIL_DE_REAPPROVISIONNEMENT);
    }

    @Test
    @Transactional
    void fullUpdateArticleWithPatch() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // Update the article using partial update
        Article partialUpdatedArticle = new Article();
        partialUpdatedArticle.setId(article.getId());

        partialUpdatedArticle
            .code(UPDATED_CODE)
            .designation(UPDATED_DESIGNATION)
            .prixUnitaireHt(UPDATED_PRIX_UNITAIRE_HT)
            .tauxTva(UPDATED_TAUX_TVA)
            .prixUnitaireTtc(UPDATED_PRIX_UNITAIRE_TTC)
            .photo(UPDATED_PHOTO)
            .quantiteEnStock(UPDATED_QUANTITE_EN_STOCK)
            .seuilDeReapprovisionnement(UPDATED_SEUIL_DE_REAPPROVISIONNEMENT);

        restArticleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedArticle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedArticle))
            )
            .andExpect(status().isOk());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testArticle.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testArticle.getPrixUnitaireHt()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE_HT);
        assertThat(testArticle.getTauxTva()).isEqualByComparingTo(UPDATED_TAUX_TVA);
        assertThat(testArticle.getPrixUnitaireTtc()).isEqualByComparingTo(UPDATED_PRIX_UNITAIRE_TTC);
        assertThat(testArticle.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testArticle.getQuantiteEnStock()).isEqualByComparingTo(UPDATED_QUANTITE_EN_STOCK);
        assertThat(testArticle.getSeuilDeReapprovisionnement()).isEqualByComparingTo(UPDATED_SEUIL_DE_REAPPROVISIONNEMENT);
    }

    @Test
    @Transactional
    void patchNonExistingArticle() throws Exception {
        int databaseSizeBeforeUpdate = articleRepository.findAll().size();
        article.setId(count.incrementAndGet());

        // Create the Article
        ArticleDTO articleDTO = articleMapper.toDto(article);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, articleDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(articleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchArticle() throws Exception {
        int databaseSizeBeforeUpdate = articleRepository.findAll().size();
        article.setId(count.incrementAndGet());

        // Create the Article
        ArticleDTO articleDTO = articleMapper.toDto(article);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArticleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(articleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamArticle() throws Exception {
        int databaseSizeBeforeUpdate = articleRepository.findAll().size();
        article.setId(count.incrementAndGet());

        // Create the Article
        ArticleDTO articleDTO = articleMapper.toDto(article);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArticleMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(articleDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        int databaseSizeBeforeDelete = articleRepository.findAll().size();

        // Delete the article
        restArticleMockMvc
            .perform(delete(ENTITY_API_URL_ID, article.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
