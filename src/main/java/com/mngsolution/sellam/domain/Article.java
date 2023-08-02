package com.mngsolution.sellam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "designation")
    private String designation;

    @Column(name = "prix_unitaire_ht", precision = 21, scale = 2)
    private BigDecimal prixUnitaireHt;

    @Column(name = "taux_tva", precision = 21, scale = 2)
    private BigDecimal tauxTva;

    @Column(name = "prix_unitaire_ttc", precision = 21, scale = 2)
    private BigDecimal prixUnitaireTtc;

    @Column(name = "photo")
    private String photo;

    @Column(name = "quantite_en_stock", precision = 21, scale = 2)
    private BigDecimal quantiteEnStock;

    @Column(name = "seuil_de_reapprovisionnement", precision = 21, scale = 2)
    private BigDecimal seuilDeReapprovisionnement;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "entreprise" }, allowSetters = true)
    private Magasin magasin;

    @ManyToOne(fetch = FetchType.LAZY)
    private Categorie categorie;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Article id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return this.code;
    }

    public Article code(String code) {
        this.setCode(code);
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDesignation() {
        return this.designation;
    }

    public Article designation(String designation) {
        this.setDesignation(designation);
        return this;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public BigDecimal getPrixUnitaireHt() {
        return this.prixUnitaireHt;
    }

    public Article prixUnitaireHt(BigDecimal prixUnitaireHt) {
        this.setPrixUnitaireHt(prixUnitaireHt);
        return this;
    }

    public void setPrixUnitaireHt(BigDecimal prixUnitaireHt) {
        this.prixUnitaireHt = prixUnitaireHt;
    }

    public BigDecimal getTauxTva() {
        return this.tauxTva;
    }

    public Article tauxTva(BigDecimal tauxTva) {
        this.setTauxTva(tauxTva);
        return this;
    }

    public void setTauxTva(BigDecimal tauxTva) {
        this.tauxTva = tauxTva;
    }

    public BigDecimal getPrixUnitaireTtc() {
        return this.prixUnitaireTtc;
    }

    public Article prixUnitaireTtc(BigDecimal prixUnitaireTtc) {
        this.setPrixUnitaireTtc(prixUnitaireTtc);
        return this;
    }

    public void setPrixUnitaireTtc(BigDecimal prixUnitaireTtc) {
        this.prixUnitaireTtc = prixUnitaireTtc;
    }

    public String getPhoto() {
        return this.photo;
    }

    public Article photo(String photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public BigDecimal getQuantiteEnStock() {
        return this.quantiteEnStock;
    }

    public Article quantiteEnStock(BigDecimal quantiteEnStock) {
        this.setQuantiteEnStock(quantiteEnStock);
        return this;
    }

    public void setQuantiteEnStock(BigDecimal quantiteEnStock) {
        this.quantiteEnStock = quantiteEnStock;
    }

    public BigDecimal getSeuilDeReapprovisionnement() {
        return this.seuilDeReapprovisionnement;
    }

    public Article seuilDeReapprovisionnement(BigDecimal seuilDeReapprovisionnement) {
        this.setSeuilDeReapprovisionnement(seuilDeReapprovisionnement);
        return this;
    }

    public void setSeuilDeReapprovisionnement(BigDecimal seuilDeReapprovisionnement) {
        this.seuilDeReapprovisionnement = seuilDeReapprovisionnement;
    }

    public Magasin getMagasin() {
        return this.magasin;
    }

    public void setMagasin(Magasin magasin) {
        this.magasin = magasin;
    }

    public Article magasin(Magasin magasin) {
        this.setMagasin(magasin);
        return this;
    }

    public Categorie getCategorie() {
        return this.categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public Article categorie(Categorie categorie) {
        this.setCategorie(categorie);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Article)) {
            return false;
        }
        return id != null && id.equals(((Article) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", designation='" + getDesignation() + "'" +
            ", prixUnitaireHt=" + getPrixUnitaireHt() +
            ", tauxTva=" + getTauxTva() +
            ", prixUnitaireTtc=" + getPrixUnitaireTtc() +
            ", photo='" + getPhoto() + "'" +
            ", quantiteEnStock=" + getQuantiteEnStock() +
            ", seuilDeReapprovisionnement=" + getSeuilDeReapprovisionnement() +
            "}";
    }
}
