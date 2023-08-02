<template>
  <div>
    <h2 id="page-heading" data-cy="LigneVenteHeading">
      <span v-text="t$('sellAmApp.ligneVente.home.title')" id="ligne-vente-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.ligneVente.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'LigneVenteCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-ligne-vente"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.ligneVente.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && ligneVentes && ligneVentes.length === 0">
      <span v-text="t$('sellAmApp.ligneVente.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="ligneVentes && ligneVentes.length > 0">
      <table class="table table-striped" aria-describedby="ligneVentes">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneVente.quantite')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneVente.prixUnitaire')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneVente.montantRemise')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneVente.montantTotal')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneVente.taxe')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneVente.commentaire')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneVente.statutVente')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneVente.vente')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneVente.article')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ligneVente in ligneVentes" :key="ligneVente.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'LigneVenteView', params: { ligneVenteId: ligneVente.id } }">{{ ligneVente.id }}</router-link>
            </td>
            <td>{{ ligneVente.quantite }}</td>
            <td>{{ ligneVente.prixUnitaire }}</td>
            <td>{{ ligneVente.montantRemise }}</td>
            <td>{{ ligneVente.montantTotal }}</td>
            <td>{{ ligneVente.taxe }}</td>
            <td>{{ ligneVente.commentaire }}</td>
            <td v-text="t$('sellAmApp.StatutVente.' + ligneVente.statutVente)"></td>
            <td>
              <div v-if="ligneVente.vente">
                <router-link :to="{ name: 'VenteView', params: { venteId: ligneVente.vente.id } }">{{ ligneVente.vente.id }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="ligneVente.article">
                <router-link :to="{ name: 'ArticleView', params: { articleId: ligneVente.article.id } }">{{
                  ligneVente.article.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'LigneVenteView', params: { ligneVenteId: ligneVente.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'LigneVenteEdit', params: { ligneVenteId: ligneVente.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(ligneVente)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="t$('entity.action.delete')"></span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span id="sellAmApp.ligneVente.delete.question" data-cy="ligneVenteDeleteDialogHeading" v-text="t$('entity.delete.title')"></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-ligneVente-heading" v-text="t$('sellAmApp.ligneVente.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-ligneVente"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeLigneVente()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./ligne-vente.component.ts"></script>
