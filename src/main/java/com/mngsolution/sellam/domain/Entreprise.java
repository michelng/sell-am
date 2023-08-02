package com.mngsolution.sellam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mngsolution.sellam.domain.enumeration.Statut;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Entreprise.
 */
@Entity
@Table(name = "entreprise")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Entreprise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "raison_sociale")
    private String raisonSociale;

    @Column(name = "telephone_1")
    private String telephone1;

    @Column(name = "telephone_2")
    private String telephone2;

    @Column(name = "email")
    private String email;

    @Column(name = "logo")
    private String logo;

    @Column(name = "description")
    private String description;

    @Column(name = "sit_web")
    private String sitWeb;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private Statut statut;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "ventes", "entreprise" }, allowSetters = true)
    private Set<Employe> employes = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "entreprise" }, allowSetters = true)
    private Set<Magasin> magasins = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Entreprise id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Entreprise nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getRaisonSociale() {
        return this.raisonSociale;
    }

    public Entreprise raisonSociale(String raisonSociale) {
        this.setRaisonSociale(raisonSociale);
        return this;
    }

    public void setRaisonSociale(String raisonSociale) {
        this.raisonSociale = raisonSociale;
    }

    public String getTelephone1() {
        return this.telephone1;
    }

    public Entreprise telephone1(String telephone1) {
        this.setTelephone1(telephone1);
        return this;
    }

    public void setTelephone1(String telephone1) {
        this.telephone1 = telephone1;
    }

    public String getTelephone2() {
        return this.telephone2;
    }

    public Entreprise telephone2(String telephone2) {
        this.setTelephone2(telephone2);
        return this;
    }

    public void setTelephone2(String telephone2) {
        this.telephone2 = telephone2;
    }

    public String getEmail() {
        return this.email;
    }

    public Entreprise email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogo() {
        return this.logo;
    }

    public Entreprise logo(String logo) {
        this.setLogo(logo);
        return this;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getDescription() {
        return this.description;
    }

    public Entreprise description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSitWeb() {
        return this.sitWeb;
    }

    public Entreprise sitWeb(String sitWeb) {
        this.setSitWeb(sitWeb);
        return this;
    }

    public void setSitWeb(String sitWeb) {
        this.sitWeb = sitWeb;
    }

    public Statut getStatut() {
        return this.statut;
    }

    public Entreprise statut(Statut statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
    }

    public Set<Employe> getEmployes() {
        return this.employes;
    }

    public void setEmployes(Set<Employe> employes) {
        if (this.employes != null) {
            this.employes.forEach(i -> i.setEntreprise(null));
        }
        if (employes != null) {
            employes.forEach(i -> i.setEntreprise(this));
        }
        this.employes = employes;
    }

    public Entreprise employes(Set<Employe> employes) {
        this.setEmployes(employes);
        return this;
    }

    public Entreprise addEmploye(Employe employe) {
        this.employes.add(employe);
        employe.setEntreprise(this);
        return this;
    }

    public Entreprise removeEmploye(Employe employe) {
        this.employes.remove(employe);
        employe.setEntreprise(null);
        return this;
    }

    public Set<Magasin> getMagasins() {
        return this.magasins;
    }

    public void setMagasins(Set<Magasin> magasins) {
        if (this.magasins != null) {
            this.magasins.forEach(i -> i.setEntreprise(null));
        }
        if (magasins != null) {
            magasins.forEach(i -> i.setEntreprise(this));
        }
        this.magasins = magasins;
    }

    public Entreprise magasins(Set<Magasin> magasins) {
        this.setMagasins(magasins);
        return this;
    }

    public Entreprise addMagasin(Magasin magasin) {
        this.magasins.add(magasin);
        magasin.setEntreprise(this);
        return this;
    }

    public Entreprise removeMagasin(Magasin magasin) {
        this.magasins.remove(magasin);
        magasin.setEntreprise(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Entreprise)) {
            return false;
        }
        return id != null && id.equals(((Entreprise) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Entreprise{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", raisonSociale='" + getRaisonSociale() + "'" +
            ", telephone1='" + getTelephone1() + "'" +
            ", telephone2='" + getTelephone2() + "'" +
            ", email='" + getEmail() + "'" +
            ", logo='" + getLogo() + "'" +
            ", description='" + getDescription() + "'" +
            ", sitWeb='" + getSitWeb() + "'" +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
