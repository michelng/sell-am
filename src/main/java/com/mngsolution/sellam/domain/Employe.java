package com.mngsolution.sellam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mngsolution.sellam.domain.enumeration.Statut;
import com.mngsolution.sellam.domain.enumeration.StatutEmploi;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Employe.
 */
@Entity
@Table(name = "employe")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Employe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "identifiant")
    private String identifiant;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "date_naissance")
    private Instant dateNaissance;

    @Column(name = "date_embauche")
    private Instant dateEmbauche;

    @Column(name = "telephone_1")
    private String telephone1;

    @Column(name = "telephone_2")
    private String telephone2;

    @Column(name = "email")
    private String email;

    @Column(name = "salaire", precision = 21, scale = 2)
    private BigDecimal salaire;

    @Column(name = "photo")
    private String photo;

    @Column(name = "fonction")
    private String fonction;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut_emploi")
    private StatutEmploi statutEmploi;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private Statut statut;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "employe")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "client", "employe" }, allowSetters = true)
    private Set<Vente> ventes = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "employes", "magasins" }, allowSetters = true)
    private Entreprise entreprise;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Employe id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentifiant() {
        return this.identifiant;
    }

    public Employe identifiant(String identifiant) {
        this.setIdentifiant(identifiant);
        return this;
    }

    public void setIdentifiant(String identifiant) {
        this.identifiant = identifiant;
    }

    public String getNom() {
        return this.nom;
    }

    public Employe nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public Employe prenom(String prenom) {
        this.setPrenom(prenom);
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Instant getDateNaissance() {
        return this.dateNaissance;
    }

    public Employe dateNaissance(Instant dateNaissance) {
        this.setDateNaissance(dateNaissance);
        return this;
    }

    public void setDateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public Instant getDateEmbauche() {
        return this.dateEmbauche;
    }

    public Employe dateEmbauche(Instant dateEmbauche) {
        this.setDateEmbauche(dateEmbauche);
        return this;
    }

    public void setDateEmbauche(Instant dateEmbauche) {
        this.dateEmbauche = dateEmbauche;
    }

    public String getTelephone1() {
        return this.telephone1;
    }

    public Employe telephone1(String telephone1) {
        this.setTelephone1(telephone1);
        return this;
    }

    public void setTelephone1(String telephone1) {
        this.telephone1 = telephone1;
    }

    public String getTelephone2() {
        return this.telephone2;
    }

    public Employe telephone2(String telephone2) {
        this.setTelephone2(telephone2);
        return this;
    }

    public void setTelephone2(String telephone2) {
        this.telephone2 = telephone2;
    }

    public String getEmail() {
        return this.email;
    }

    public Employe email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BigDecimal getSalaire() {
        return this.salaire;
    }

    public Employe salaire(BigDecimal salaire) {
        this.setSalaire(salaire);
        return this;
    }

    public void setSalaire(BigDecimal salaire) {
        this.salaire = salaire;
    }

    public String getPhoto() {
        return this.photo;
    }

    public Employe photo(String photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getFonction() {
        return this.fonction;
    }

    public Employe fonction(String fonction) {
        this.setFonction(fonction);
        return this;
    }

    public void setFonction(String fonction) {
        this.fonction = fonction;
    }

    public StatutEmploi getStatutEmploi() {
        return this.statutEmploi;
    }

    public Employe statutEmploi(StatutEmploi statutEmploi) {
        this.setStatutEmploi(statutEmploi);
        return this;
    }

    public void setStatutEmploi(StatutEmploi statutEmploi) {
        this.statutEmploi = statutEmploi;
    }

    public Statut getStatut() {
        return this.statut;
    }

    public Employe statut(Statut statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
    }

    public Set<Vente> getVentes() {
        return this.ventes;
    }

    public void setVentes(Set<Vente> ventes) {
        if (this.ventes != null) {
            this.ventes.forEach(i -> i.setEmploye(null));
        }
        if (ventes != null) {
            ventes.forEach(i -> i.setEmploye(this));
        }
        this.ventes = ventes;
    }

    public Employe ventes(Set<Vente> ventes) {
        this.setVentes(ventes);
        return this;
    }

    public Employe addVente(Vente vente) {
        this.ventes.add(vente);
        vente.setEmploye(this);
        return this;
    }

    public Employe removeVente(Vente vente) {
        this.ventes.remove(vente);
        vente.setEmploye(null);
        return this;
    }

    public Entreprise getEntreprise() {
        return this.entreprise;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }

    public Employe entreprise(Entreprise entreprise) {
        this.setEntreprise(entreprise);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employe)) {
            return false;
        }
        return id != null && id.equals(((Employe) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Employe{" +
            "id=" + getId() +
            ", identifiant='" + getIdentifiant() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", dateEmbauche='" + getDateEmbauche() + "'" +
            ", telephone1='" + getTelephone1() + "'" +
            ", telephone2='" + getTelephone2() + "'" +
            ", email='" + getEmail() + "'" +
            ", salaire=" + getSalaire() +
            ", photo='" + getPhoto() + "'" +
            ", fonction='" + getFonction() + "'" +
            ", statutEmploi='" + getStatutEmploi() + "'" +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
