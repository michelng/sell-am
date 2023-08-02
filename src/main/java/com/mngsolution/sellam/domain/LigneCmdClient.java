package com.mngsolution.sellam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mngsolution.sellam.domain.enumeration.StatutCmd;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A LigneCmdClient.
 */
@Entity
@Table(name = "ligne_cmd_client")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LigneCmdClient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "quantite", precision = 21, scale = 2)
    private BigDecimal quantite;

    @Column(name = "prix_unitaire", precision = 21, scale = 2)
    private BigDecimal prixUnitaire;

    @Column(name = "date_livraison_prevue")
    private Instant dateLivraisonPrevue;

    @Column(name = "montant_total", precision = 21, scale = 2)
    private BigDecimal montantTotal;

    @Column(name = "commentaire")
    private String commentaire;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut_cmd")
    private StatutCmd statutCmd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "client" }, allowSetters = true)
    private CmdClient cmdClient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "magasin", "categorie" }, allowSetters = true)
    private Article article;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public LigneCmdClient id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getQuantite() {
        return this.quantite;
    }

    public LigneCmdClient quantite(BigDecimal quantite) {
        this.setQuantite(quantite);
        return this;
    }

    public void setQuantite(BigDecimal quantite) {
        this.quantite = quantite;
    }

    public BigDecimal getPrixUnitaire() {
        return this.prixUnitaire;
    }

    public LigneCmdClient prixUnitaire(BigDecimal prixUnitaire) {
        this.setPrixUnitaire(prixUnitaire);
        return this;
    }

    public void setPrixUnitaire(BigDecimal prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public Instant getDateLivraisonPrevue() {
        return this.dateLivraisonPrevue;
    }

    public LigneCmdClient dateLivraisonPrevue(Instant dateLivraisonPrevue) {
        this.setDateLivraisonPrevue(dateLivraisonPrevue);
        return this;
    }

    public void setDateLivraisonPrevue(Instant dateLivraisonPrevue) {
        this.dateLivraisonPrevue = dateLivraisonPrevue;
    }

    public BigDecimal getMontantTotal() {
        return this.montantTotal;
    }

    public LigneCmdClient montantTotal(BigDecimal montantTotal) {
        this.setMontantTotal(montantTotal);
        return this;
    }

    public void setMontantTotal(BigDecimal montantTotal) {
        this.montantTotal = montantTotal;
    }

    public String getCommentaire() {
        return this.commentaire;
    }

    public LigneCmdClient commentaire(String commentaire) {
        this.setCommentaire(commentaire);
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public StatutCmd getStatutCmd() {
        return this.statutCmd;
    }

    public LigneCmdClient statutCmd(StatutCmd statutCmd) {
        this.setStatutCmd(statutCmd);
        return this;
    }

    public void setStatutCmd(StatutCmd statutCmd) {
        this.statutCmd = statutCmd;
    }

    public CmdClient getCmdClient() {
        return this.cmdClient;
    }

    public void setCmdClient(CmdClient cmdClient) {
        this.cmdClient = cmdClient;
    }

    public LigneCmdClient cmdClient(CmdClient cmdClient) {
        this.setCmdClient(cmdClient);
        return this;
    }

    public Article getArticle() {
        return this.article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public LigneCmdClient article(Article article) {
        this.setArticle(article);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LigneCmdClient)) {
            return false;
        }
        return id != null && id.equals(((LigneCmdClient) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LigneCmdClient{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", prixUnitaire=" + getPrixUnitaire() +
            ", dateLivraisonPrevue='" + getDateLivraisonPrevue() + "'" +
            ", montantTotal=" + getMontantTotal() +
            ", commentaire='" + getCommentaire() + "'" +
            ", statutCmd='" + getStatutCmd() + "'" +
            "}";
    }
}
