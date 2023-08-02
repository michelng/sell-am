package com.mngsolution.sellam.service.dto;

import com.mngsolution.sellam.domain.enumeration.TypeMvt;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.mngsolution.sellam.domain.MvtStck} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MvtStckDTO implements Serializable {

    private Long id;

    private Instant dateMvnt;

    private BigDecimal quantite;

    private TypeMvt typeMvt;

    private ArticleDTO article;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateMvnt() {
        return dateMvnt;
    }

    public void setDateMvnt(Instant dateMvnt) {
        this.dateMvnt = dateMvnt;
    }

    public BigDecimal getQuantite() {
        return quantite;
    }

    public void setQuantite(BigDecimal quantite) {
        this.quantite = quantite;
    }

    public TypeMvt getTypeMvt() {
        return typeMvt;
    }

    public void setTypeMvt(TypeMvt typeMvt) {
        this.typeMvt = typeMvt;
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
        if (!(o instanceof MvtStckDTO)) {
            return false;
        }

        MvtStckDTO mvtStckDTO = (MvtStckDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, mvtStckDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MvtStckDTO{" +
            "id=" + getId() +
            ", dateMvnt='" + getDateMvnt() + "'" +
            ", quantite=" + getQuantite() +
            ", typeMvt='" + getTypeMvt() + "'" +
            ", article=" + getArticle() +
            "}";
    }
}
