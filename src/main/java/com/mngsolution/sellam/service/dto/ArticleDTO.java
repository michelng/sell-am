package com.mngsolution.sellam.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link com.mngsolution.sellam.domain.Article} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ArticleDTO implements Serializable {

    private Long id;

    private String code;

    private String designation;

    private BigDecimal prixUnitaireHt;

    private BigDecimal tauxTva;

    private BigDecimal prixUnitaireTtc;

    private String photo;

    private BigDecimal quantiteEnStock;

    private BigDecimal seuilDeReapprovisionnement;

    private MagasinDTO magasin;

    private CategorieDTO categorie;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public BigDecimal getPrixUnitaireHt() {
        return prixUnitaireHt;
    }

    public void setPrixUnitaireHt(BigDecimal prixUnitaireHt) {
        this.prixUnitaireHt = prixUnitaireHt;
    }

    public BigDecimal getTauxTva() {
        return tauxTva;
    }

    public void setTauxTva(BigDecimal tauxTva) {
        this.tauxTva = tauxTva;
    }

    public BigDecimal getPrixUnitaireTtc() {
        return prixUnitaireTtc;
    }

    public void setPrixUnitaireTtc(BigDecimal prixUnitaireTtc) {
        this.prixUnitaireTtc = prixUnitaireTtc;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public BigDecimal getQuantiteEnStock() {
        return quantiteEnStock;
    }

    public void setQuantiteEnStock(BigDecimal quantiteEnStock) {
        this.quantiteEnStock = quantiteEnStock;
    }

    public BigDecimal getSeuilDeReapprovisionnement() {
        return seuilDeReapprovisionnement;
    }

    public void setSeuilDeReapprovisionnement(BigDecimal seuilDeReapprovisionnement) {
        this.seuilDeReapprovisionnement = seuilDeReapprovisionnement;
    }

    public MagasinDTO getMagasin() {
        return magasin;
    }

    public void setMagasin(MagasinDTO magasin) {
        this.magasin = magasin;
    }

    public CategorieDTO getCategorie() {
        return categorie;
    }

    public void setCategorie(CategorieDTO categorie) {
        this.categorie = categorie;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ArticleDTO)) {
            return false;
        }

        ArticleDTO articleDTO = (ArticleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, articleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ArticleDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", designation='" + getDesignation() + "'" +
            ", prixUnitaireHt=" + getPrixUnitaireHt() +
            ", tauxTva=" + getTauxTva() +
            ", prixUnitaireTtc=" + getPrixUnitaireTtc() +
            ", photo='" + getPhoto() + "'" +
            ", quantiteEnStock=" + getQuantiteEnStock() +
            ", seuilDeReapprovisionnement=" + getSeuilDeReapprovisionnement() +
            ", magasin=" + getMagasin() +
            ", categorie=" + getCategorie() +
            "}";
    }
}
