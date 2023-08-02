<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="ligneVente">
        <h2 class="jh-entity-heading" data-cy="ligneVenteDetailsHeading">
          <span v-text="t$('sellAmApp.ligneVente.detail.title')"></span> {{ ligneVente.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.ligneVente.quantite')"></span>
          </dt>
          <dd>
            <span>{{ ligneVente.quantite }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneVente.prixUnitaire')"></span>
          </dt>
          <dd>
            <span>{{ ligneVente.prixUnitaire }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneVente.montantRemise')"></span>
          </dt>
          <dd>
            <span>{{ ligneVente.montantRemise }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneVente.montantTotal')"></span>
          </dt>
          <dd>
            <span>{{ ligneVente.montantTotal }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneVente.taxe')"></span>
          </dt>
          <dd>
            <span>{{ ligneVente.taxe }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneVente.commentaire')"></span>
          </dt>
          <dd>
            <span>{{ ligneVente.commentaire }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneVente.statutVente')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.StatutVente.' + ligneVente.statutVente)"></span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneVente.vente')"></span>
          </dt>
          <dd>
            <div v-if="ligneVente.vente">
              <router-link :to="{ name: 'VenteView', params: { venteId: ligneVente.vente.id } }">{{ ligneVente.vente.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneVente.article')"></span>
          </dt>
          <dd>
            <div v-if="ligneVente.article">
              <router-link :to="{ name: 'ArticleView', params: { articleId: ligneVente.article.id } }">{{
                ligneVente.article.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="ligneVente.id"
          :to="{ name: 'LigneVenteEdit', params: { ligneVenteId: ligneVente.id } }"
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

<script lang="ts" src="./ligne-vente-details.component.ts"></script>
