<template>
  <div>
    <h2 id="page-heading" data-cy="FactureHeading">
      <span v-text="t$('sellAmApp.facture.home.title')" id="facture-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.facture.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'FactureCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-facture"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.facture.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && factures && factures.length === 0">
      <span v-text="t$('sellAmApp.facture.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="factures && factures.length > 0">
      <table class="table table-striped" aria-describedby="factures">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.facture.numero')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.facture.dateFacture')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.facture.dateEcheance')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.facture.montantTotal')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.facture.commentaire')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.facture.statutPaiement')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.facture.vente')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.facture.client')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="facture in factures" :key="facture.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'FactureView', params: { factureId: facture.id } }">{{ facture.id }}</router-link>
            </td>
            <td>{{ facture.numero }}</td>
            <td>{{ formatDateShort(facture.dateFacture) || '' }}</td>
            <td>{{ formatDateShort(facture.dateEcheance) || '' }}</td>
            <td>{{ facture.montantTotal }}</td>
            <td>{{ facture.commentaire }}</td>
            <td v-text="t$('sellAmApp.StatutPaiement.' + facture.statutPaiement)"></td>
            <td>
              <div v-if="facture.vente">
                <router-link :to="{ name: 'VenteView', params: { venteId: facture.vente.id } }">{{ facture.vente.id }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="facture.client">
                <router-link :to="{ name: 'ClientView', params: { clientId: facture.client.id } }">{{ facture.client.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'FactureView', params: { factureId: facture.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'FactureEdit', params: { factureId: facture.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(facture)"
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
        <span id="sellAmApp.facture.delete.question" data-cy="factureDeleteDialogHeading" v-text="t$('entity.delete.title')"></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-facture-heading" v-text="t$('sellAmApp.facture.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-facture"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeFacture()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./facture.component.ts"></script>
