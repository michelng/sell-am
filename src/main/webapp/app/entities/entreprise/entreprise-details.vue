<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="entreprise">
        <h2 class="jh-entity-heading" data-cy="entrepriseDetailsHeading">
          <span v-text="t$('sellAmApp.entreprise.detail.title')"></span> {{ entreprise.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.entreprise.nom')"></span>
          </dt>
          <dd>
            <span>{{ entreprise.nom }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.entreprise.raisonSociale')"></span>
          </dt>
          <dd>
            <span>{{ entreprise.raisonSociale }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.entreprise.telephone1')"></span>
          </dt>
          <dd>
            <span>{{ entreprise.telephone1 }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.entreprise.telephone2')"></span>
          </dt>
          <dd>
            <span>{{ entreprise.telephone2 }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.entreprise.email')"></span>
          </dt>
          <dd>
            <span>{{ entreprise.email }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.entreprise.logo')"></span>
          </dt>
          <dd>
            <span>{{ entreprise.logo }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.entreprise.description')"></span>
          </dt>
          <dd>
            <span>{{ entreprise.description }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.entreprise.sitWeb')"></span>
          </dt>
          <dd>
            <span>{{ entreprise.sitWeb }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.entreprise.statut')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.Statut.' + entreprise.statut)"></span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="entreprise.id"
          :to="{ name: 'EntrepriseEdit', params: { entrepriseId: entreprise.id } }"
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

<script lang="ts" src="./entreprise-details.component.ts"></script>
