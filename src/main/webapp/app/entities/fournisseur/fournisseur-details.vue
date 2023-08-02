<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="fournisseur">
        <h2 class="jh-entity-heading" data-cy="fournisseurDetailsHeading">
          <span v-text="t$('sellAmApp.fournisseur.detail.title')"></span> {{ fournisseur.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.fournisseur.identifiant')"></span>
          </dt>
          <dd>
            <span>{{ fournisseur.identifiant }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.fournisseur.nomResponsable')"></span>
          </dt>
          <dd>
            <span>{{ fournisseur.nomResponsable }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.fournisseur.raisonSociale')"></span>
          </dt>
          <dd>
            <span>{{ fournisseur.raisonSociale }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.fournisseur.telephone1')"></span>
          </dt>
          <dd>
            <span>{{ fournisseur.telephone1 }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.fournisseur.telephone2')"></span>
          </dt>
          <dd>
            <span>{{ fournisseur.telephone2 }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.fournisseur.email')"></span>
          </dt>
          <dd>
            <span>{{ fournisseur.email }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.fournisseur.logo')"></span>
          </dt>
          <dd>
            <span>{{ fournisseur.logo }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.fournisseur.description')"></span>
          </dt>
          <dd>
            <span>{{ fournisseur.description }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.fournisseur.statut')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.Statut.' + fournisseur.statut)"></span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="fournisseur.id"
          :to="{ name: 'FournisseurEdit', params: { fournisseurId: fournisseur.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./fournisseur-details.component.ts"></script>
