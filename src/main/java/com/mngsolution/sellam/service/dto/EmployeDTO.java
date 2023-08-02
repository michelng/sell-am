package com.mngsolution.sellam.service.dto;

import com.mngsolution.sellam.domain.enumeration.Statut;
import com.mngsolution.sellam.domain.enumeration.StatutEmploi;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.mngsolution.sellam.domain.Employe} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EmployeDTO implements Serializable {

    private Long id;

    private String identifiant;

    private String nom;

    private String prenom;

    private Instant dateNaissance;

    private Instant dateEmbauche;

    private String telephone1;

    private String telephone2;

    private String email;

    private BigDecimal salaire;

    private String photo;

    private String fonction;

    private StatutEmploi statutEmploi;

    private Statut statut;

    private EntrepriseDTO entreprise;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentifiant() {
        return identifiant;
    }

    public void setIdentifiant(String identifiant) {
        this.identifiant = identifiant;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Instant getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public Instant getDateEmbauche() {
        return dateEmbauche;
    }

    public void setDateEmbauche(Instant dateEmbauche) {
        this.dateEmbauche = dateEmbauche;
    }

    public String getTelephone1() {
        return telephone1;
    }

    public void setTelephone1(String telephone1) {
        this.telephone1 = telephone1;
    }

    public String getTelephone2() {
        return telephone2;
    }

    public void setTelephone2(String telephone2) {
        this.telephone2 = telephone2;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BigDecimal getSalaire() {
        return salaire;
    }

    public void setSalaire(BigDecimal salaire) {
        this.salaire = salaire;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getFonction() {
        return fonction;
    }

    public void setFonction(String fonction) {
        this.fonction = fonction;
    }

    public StatutEmploi getStatutEmploi() {
        return statutEmploi;
    }

    public void setStatutEmploi(StatutEmploi statutEmploi) {
        this.statutEmploi = statutEmploi;
    }

    public Statut getStatut() {
        return statut;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
    }

    public EntrepriseDTO getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(EntrepriseDTO entreprise) {
        this.entreprise = entreprise;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeDTO)) {
            return false;
        }

        EmployeDTO employeDTO = (EmployeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, employeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeDTO{" +
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
            ", entreprise=" + getEntreprise() +
            "}";
    }
}
