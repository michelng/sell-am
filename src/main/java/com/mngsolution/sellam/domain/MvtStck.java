package com.mngsolution.sellam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mngsolution.sellam.domain.enumeration.TypeMvt;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MvtStck.
 */
@Entity
@Table(name = "mvt_stck")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MvtStck implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "date_mvnt")
    private Instant dateMvnt;

    @Column(name = "quantite", precision = 21, scale = 2)
    private BigDecimal quantite;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_mvt")
    private TypeMvt typeMvt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "magasin", "categorie" }, allowSetters = true)
    private Article article;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public MvtStck id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateMvnt() {
        return this.dateMvnt;
    }

    public MvtStck dateMvnt(Instant dateMvnt) {
        this.setDateMvnt(dateMvnt);
        return this;
    }

    public void setDateMvnt(Instant dateMvnt) {
        this.dateMvnt = dateMvnt;
    }

    public BigDecimal getQuantite() {
        return this.quantite;
    }

    public MvtStck quantite(BigDecimal quantite) {
        this.setQuantite(quantite);
        return this;
    }

    public void setQuantite(BigDecimal quantite) {
        this.quantite = quantite;
    }

    public TypeMvt getTypeMvt() {
        return this.typeMvt;
    }

    public MvtStck typeMvt(TypeMvt typeMvt) {
        this.setTypeMvt(typeMvt);
        return this;
    }

    public void setTypeMvt(TypeMvt typeMvt) {
        this.typeMvt = typeMvt;
    }

    public Article getArticle() {
        return this.article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public MvtStck article(Article article) {
        this.setArticle(article);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MvtStck)) {
            return false;
        }
        return id != null && id.equals(((MvtStck) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MvtStck{" +
            "id=" + getId() +
            ", dateMvnt='" + getDateMvnt() + "'" +
            ", quantite=" + getQuantite() +
            ", typeMvt='" + getTypeMvt() + "'" +
            "}";
    }
}
