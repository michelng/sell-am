package com.mngsolution.sellam.service.dto;

import com.mngsolution.sellam.domain.enumeration.StatutCmd;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.mngsolution.sellam.domain.CmdClient} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CmdClientDTO implements Serializable {

    private Long id;

    private String code;

    private Instant dateCommande;

    private Instant dateLivraisonPrevue;

    private BigDecimal montantTotal;

    private String commentaire;

    private StatutCmd statutCmd;

    private ClientDTO client;

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

    public Instant getDateCommande() {
        return dateCommande;
    }

    public void setDateCommande(Instant dateCommande) {
        this.dateCommande = dateCommande;
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

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CmdClientDTO)) {
            return false;
        }

        CmdClientDTO cmdClientDTO = (CmdClientDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, cmdClientDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CmdClientDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", dateCommande='" + getDateCommande() + "'" +
            ", dateLivraisonPrevue='" + getDateLivraisonPrevue() + "'" +
            ", montantTotal=" + getMontantTotal() +
            ", commentaire='" + getCommentaire() + "'" +
            ", statutCmd='" + getStatutCmd() + "'" +
            ", client=" + getClient() +
            "}";
    }
}
