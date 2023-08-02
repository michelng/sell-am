package com.mngsolution.sellam.service.dto;

import com.mngsolution.sellam.domain.enumeration.StatutCmd;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.mngsolution.sellam.domain.LigneCmdFournisseur} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LigneCmdFournisseurDTO implements Serializable {

    private Long id;

    private BigDecimal quantite;

    private BigDecimal prixUnitaire;

    private Instant dateLivraisonPrevu;

    private BigDecimal montantTotal;

    private String commentaire;

    private StatutCmd statutCmd;

    private CmdFournisseurDTO cmdFournisseur;

    private ArticleDTO article;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getQuantite() {
        return quantite;
    }

    public void setQuantite(BigDecimal quantite) {
        this.quantite = quantite;
    }

    public BigDecimal getPrixUnitaire() {
        return prixUnitaire;
    }

    public void setPrixUnitaire(BigDecimal prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public Instant getDateLivraisonPrevu() {
        return dateLivraisonPrevu;
    }

    public void setDateLivraisonPrevu(Instant dateLivraisonPrevu) {
        this.dateLivraisonPrevu = dateLivraisonPrevu;
    }

    public BigDecimal getMontantTotal() {
        return montantTotal;
    }

    public void setMontantTotal(BigDecimal montantTotal) {
        this.montantTotal = montantTotal;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public StatutCmd getStatutCmd() {
        return statutCmd;
    }

    public void setStatutCmd(StatutCmd statutCmd) {
        this.statutCmd = statutCmd;
    }

    public CmdFournisseurDTO getCmdFournisseur() {
        return cmdFournisseur;
    }

    public void setCmdFournisseur(CmdFournisseurDTO cmdFournisseur) {
        this.cmdFournisseur = cmdFournisseur;
    }

    public ArticleDTO getArticle() {
        return article;
    }

    public void setArticle(ArticleDTO article) {
        this.article = article;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LigneCmdFournisseurDTO)) {
            return false;
        }

        LigneCmdFournisseurDTO ligneCmdFournisseurDTO = (LigneCmdFournisseurDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, ligneCmdFournisseurDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LigneCmdFournisseurDTO{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", prixUnitaire=" + getPrixUnitaire() +
            ", dateLivraisonPrevu='" + getDateLivraisonPrevu() + "'" +
            ", montantTotal=" + getMontantTotal() +
            ", commentaire='" + getCommentaire() + "'" +
            ", statutCmd='" + getStatutCmd() + "'" +
            ", cmdFournisseur=" + getCmdFournisseur() +
            ", article=" + getArticle() +
            "}";
    }
}
