package com.mngsolution.sellam.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mngsolution.sellam.domain.Categorie} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CategorieDTO implements Serializable {

    private Long id;

    private String code;

    private String designation;

    private String description;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CategorieDTO)) {
            return false;
        }

        CategorieDTO categorieDTO = (CategorieDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, categorieDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CategorieDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", designation='" + getDesignation() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
