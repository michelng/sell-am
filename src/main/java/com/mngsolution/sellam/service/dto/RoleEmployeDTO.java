package com.mngsolution.sellam.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mngsolution.sellam.domain.RoleEmploye} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class RoleEmployeDTO implements Serializable {

    private Long id;

    private String roleName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RoleEmployeDTO)) {
            return false;
        }

        RoleEmployeDTO roleEmployeDTO = (RoleEmployeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, roleEmployeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RoleEmployeDTO{" +
            "id=" + getId() +
            ", roleName='" + getRoleName() + "'" +
            "}";
    }
}
