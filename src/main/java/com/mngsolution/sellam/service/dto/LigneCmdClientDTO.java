package com.mngsolution.sellam.service.dto;

import com.mngsolution.sellam.domain.enumeration.StatutCmd;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.mngsolution.sellam.domain.LigneCmdClient} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LigneCmdClientDTO implements Serializable {

    private Long id;

    private BigDecimal quantite;

    private BigDecimal prixUnitaire;

    private Instant dateLivraisonPrevue;

    private BigDecimal montantTotal;

    private String commentaire;

    private StatutCmd statutCmd;

    private CmdClientDTO cmdClient;

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

    public Instant getDateLivraisonPrevue() {
        return dateLivraisonPrevue;
    }

    public void setDateLivraisonPrevue(Instant dateLivraisonPrevue) {
        this.dateLivraisonPrevue = dateLivraisonPrevue;
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

    public CmdClientDTO getCmdClient() {
        return cmdClient;
    }

    public void setCmdClient(CmdClientDTO cmdClient) {
        this.cmdClient = cmdClient;
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
        if (!(o instanceof LigneCmdClientDTO)) {
            return false;
        }

        LigneCmdClientDTO ligneCmdClientDTO = (LigneCmdClientDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, ligneCmdClientDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LigneCmdClientDTO{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", prixUnitaire=" + getPrixUnitaire() +
            ", dateLivraisonPrevue='" + getDateLivraisonPrevue() + "'" +
            ", montantTotal=" + getMontantTotal() +
            ", commentaire='" + getCommentaire() + "'" +
            ", statutCmd='" + getStatutCmd() + "'" +
            ", cmdClient=" + getCmdClient() +
            ", article=" + getArticle() +
            "}";
    }
}
