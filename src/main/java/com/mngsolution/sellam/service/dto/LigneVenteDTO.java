package com.mngsolution.sellam.service.dto;

import com.mngsolution.sellam.domain.enumeration.StatutVente;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link com.mngsolution.sellam.domain.LigneVente} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LigneVenteDTO implements Serializable {

    private Long id;

    private BigDecimal quantite;

    private BigDecimal prixUnitaire;

    private BigDecimal montantRemise;

    private BigDecimal montantTotal;

    private BigDecimal taxe;

    private String commentaire;

    private StatutVente statutVente;

    private VenteDTO vente;

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

    public BigDecimal getMontantRemise() {
        return montantRemise;
    }

    public void setMontantRemise(BigDecimal montantRemise) {
        this.montantRemise = montantRemise;
    }

    public BigDecimal getMontantTotal() {
        return montantTotal;
    }

    public void setMontantTotal(BigDecimal montantTotal) {
        this.montantTotal = montantTotal;
    }

    public BigDecimal getTaxe() {
        return taxe;
    }

    public void setTaxe(BigDecimal taxe) {
        this.taxe = taxe;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public StatutVente getStatutVente() {
        return statutVente;
    }

    public void setStatutVente(StatutVente statutVente) {
        this.statutVente = statutVente;
    }

    public VenteDTO getVente() {
        return vente;
    }

    public void setVente(VenteDTO vente) {
        this.vente = vente;
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
        if (!(o instanceof LigneVenteDTO)) {
            return false;
        }

        LigneVenteDTO ligneVenteDTO = (LigneVenteDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, ligneVenteDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LigneVenteDTO{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", prixUnitaire=" + getPrixUnitaire() +
            ", montantRemise=" + getMontantRemise() +
            ", montantTotal=" + getMontantTotal() +
            ", taxe=" + getTaxe() +
            ", commentaire='" + getCommentaire() + "'" +
            ", statutVente='" + getStatutVente() + "'" +
            ", vente=" + getVente() +
            ", article=" + getArticle() +
            "}";
    }
}
