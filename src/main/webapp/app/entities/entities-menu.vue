<template>
  <div>
    <b-dropdown-item to="/article">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.article')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/categorie">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.categorie')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/client">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.client')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/cmd-client">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.cmdClient')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/cmd-fournisseur">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.cmdFournisseur')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/discount">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.discount')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/employe">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.employe')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/entreprise">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.entreprise')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/facture">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.facture')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/fournisseur">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.fournisseur')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/ligne-cmd-client">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.ligneCmdClient')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/ligne-cmd-fournisseur">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.ligneCmdFournisseur')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/ligne-vente">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.ligneVente')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/magasin">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.magasin')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/mvt-stck">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.mvtStck')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/promotion">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.promotion')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/role-employe">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.roleEmploye')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/vente">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.vente')"></span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
