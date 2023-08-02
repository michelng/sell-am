<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="facture">
        <h2 class="jh-entity-heading" data-cy="factureDetailsHeading">
          <span v-text="t$('sellAmApp.facture.detail.title')"></span> {{ facture.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.facture.numero')"></span>
          </dt>
          <dd>
            <span>{{ facture.numero }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.facture.dateFacture')"></span>
          </dt>
          <dd>
            <span v-if="facture.dateFacture">{{ formatDateLong(facture.dateFacture) }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.facture.dateEcheance')"></span>
          </dt>
          <dd>
            <span v-if="facture.dateEcheance">{{ formatDateLong(facture.dateEcheance) }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.facture.montantTotal')"></span>
          </dt>
          <dd>
            <span>{{ facture.montantTotal }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.facture.commentaire')"></span>
          </dt>
          <dd>
            <span>{{ facture.commentaire }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.facture.statutPaiement')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.StatutPaiement.' + facture.statutPaiement)"></span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.facture.vente')"></span>
          </dt>
          <dd>
            <div v-if="facture.vente">
              <router-link :to="{ name: 'VenteView', params: { venteId: facture.vente.id } }">{{ facture.vente.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.facture.client')"></span>
          </dt>
          <dd>
            <div v-if="facture.client">
              <router-link :to="{ name: 'ClientView', params: { clientId: facture.client.id } }">{{ facture.client.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="facture.id" :to="{ name: 'FactureEdit', params: { factureId: facture.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./facture-details.component.ts"></script>
