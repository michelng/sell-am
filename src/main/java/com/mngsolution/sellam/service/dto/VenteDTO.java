package com.mngsolution.sellam.service.dto;

import com.mngsolution.sellam.domain.enumeration.StatutPaiement;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.mngsolution.sellam.domain.Vente} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class VenteDTO implements Serializable {

    private Long id;

    private String code;

    private Instant dateVente;

    private String commentaire;

    private BigDecimal montantTotal;

    private StatutPaiement statutPaiement;

    private ClientDTO client;

    private EmployeDTO employe;

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

    public Instant getDateVente() {
        return dateVente;
    }

    public void setDateVente(Instant dateVente) {
        this.dateVente = dateVente;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public BigDecimal getMontantTotal() {
        return montantTotal;
    }

    public void setMontantTotal(BigDecimal montantTotal) {
        this.montantTotal = montantTotal;
    }

    public StatutPaiement getStatutPaiement() {
        return statutPaiement;
    }

    public void setStatutPaiement(StatutPaiement statutPaiement) {
        this.statutPaiement = statutPaiement;
    }

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    public EmployeDTO getEmploye() {
        return employe;
    }

    public void setEmploye(EmployeDTO employe) {
        this.employe = employe;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VenteDTO)) {
            return false;
        }

        VenteDTO venteDTO = (VenteDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, venteDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VenteDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", dateVente='" + getDateVente() + "'" +
            ", commentaire='" + getCommentaire() + "'" +
            ", montantTotal=" + getMontantTotal() +
            ", statutPaiement='" + getStatutPaiement() + "'" +
            ", client=" + getClient() +
            ", employe=" + getEmploye() +
            "}";
    }
}
