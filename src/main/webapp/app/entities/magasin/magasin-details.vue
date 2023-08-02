<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="magasin">
        <h2 class="jh-entity-heading" data-cy="magasinDetailsHeading">
          <span v-text="t$('sellAmApp.magasin.detail.title')"></span> {{ magasin.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.magasin.nom')"></span>
          </dt>
          <dd>
            <span>{{ magasin.nom }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.magasin.raisonSociale')"></span>
          </dt>
          <dd>
            <span>{{ magasin.raisonSociale }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.magasin.telephone1')"></span>
          </dt>
          <dd>
            <span>{{ magasin.telephone1 }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.magasin.telephone2')"></span>
          </dt>
          <dd>
            <span>{{ magasin.telephone2 }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.magasin.email')"></span>
          </dt>
          <dd>
            <span>{{ magasin.email }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.magasin.logo')"></span>
          </dt>
          <dd>
            <span>{{ magasin.logo }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.magasin.description')"></span>
          </dt>
          <dd>
            <span>{{ magasin.description }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.magasin.entreprise')"></span>
          </dt>
          <dd>
            <div v-if="magasin.entreprise">
              <router-link :to="{ name: 'EntrepriseView', params: { entrepriseId: magasin.entreprise.id } }">{{
                magasin.entreprise.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="magasin.id" :to="{ name: 'MagasinEdit', params: { magasinId: magasin.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./magasin-details.component.ts"></script>
