package com.mngsolution.sellam.domain;

import com.mngsolution.sellam.domain.enumeration.StatutCmd;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CmdFournisseur.
 */
@Entity
@Table(name = "cmd_fournisseur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CmdFournisseur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "date_commande")
    private Instant dateCommande;

    @Column(name = "date_livraison_prevue")
    private Instant dateLivraisonPrevue;

    @Column(name = "montant_total", precision = 21, scale = 2)
    private BigDecimal montantTotal;

    @Column(name = "commentaire")
    private String commentaire;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut_cmd")
    private StatutCmd statutCmd;

    @ManyToOne(fetch = FetchType.LAZY)
    private Fournisseur fournisseur;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CmdFournisseur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return this.code;
    }

    public CmdFournisseur code(String code) {
        this.setCode(code);
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Instant getDateCommande() {
        return this.dateCommande;
    }

    public CmdFournisseur dateCommande(Instant dateCommande) {
        this.setDateCommande(dateCommande);
        return this;
    }

    public void setDateCommande(Instant dateCommande) {
        this.dateCommande = dateCommande;
    }

    public Instant getDateLivraisonPrevue() {
        return this.dateLivraisonPrevue;
    }

    public CmdFournisseur dateLivraisonPrevue(Instant dateLivraisonPrevue) {
        this.setDateLivraisonPrevue(dateLivraisonPrevue);
        return this;
    }

    public void setDateLivraisonPrevue(Instant dateLivraisonPrevue) {
        this.dateLivraisonPrevue = dateLivraisonPrevue;
    }

    public BigDecimal getMontantTotal() {
        return this.montantTotal;
    }

    public CmdFournisseur montantTotal(BigDecimal montantTotal) {
        this.setMontantTotal(montantTotal);
        return this;
    }

    public void setMontantTotal(BigDecimal montantTotal) {
        this.montantTotal = montantTotal;
    }

    public String getCommentaire() {
        return this.commentaire;
    }

    public CmdFournisseur commentaire(String commentaire) {
        this.setCommentaire(commentaire);
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public StatutCmd getStatutCmd() {
        return this.statutCmd;
    }

    public CmdFournisseur statutCmd(StatutCmd statutCmd) {
        this.setStatutCmd(statutCmd);
        return this;
    }

    public void setStatutCmd(StatutCmd statutCmd) {
        this.statutCmd = statutCmd;
    }

    public Fournisseur getFournisseur() {
        return this.fournisseur;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }

    public CmdFournisseur fournisseur(Fournisseur fournisseur) {
        this.setFournisseur(fournisseur);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CmdFournisseur)) {
            return false;
        }
        return id != null && id.equals(((CmdFournisseur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CmdFournisseur{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", dateCommande='" + getDateCommande() + "'" +
            ", dateLivraisonPrevue='" + getDateLivraisonPrevue() + "'" +
            ", montantTotal=" + getMontantTotal() +
            ", commentaire='" + getCommentaire() + "'" +
            ", statutCmd='" + getStatutCmd() + "'" +
            "}";
    }
}
