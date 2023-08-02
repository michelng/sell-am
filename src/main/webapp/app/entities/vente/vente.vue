<template>
  <div>
    <h2 id="page-heading" data-cy="VenteHeading">
      <span v-text="t$('sellAmApp.vente.home.title')" id="vente-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.vente.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'VenteCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-vente"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.vente.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && ventes && ventes.length === 0">
      <span v-text="t$('sellAmApp.vente.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="ventes && ventes.length > 0">
      <table class="table table-striped" aria-describedby="ventes">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.vente.code')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.vente.dateVente')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.vente.commentaire')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.vente.montantTotal')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.vente.statutPaiement')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.vente.client')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.vente.employe')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vente in ventes" :key="vente.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'VenteView', params: { venteId: vente.id } }">{{ vente.id }}</router-link>
            </td>
            <td>{{ vente.code }}</td>
            <td>{{ formatDateShort(vente.dateVente) || '' }}</td>
            <td>{{ vente.commentaire }}</td>
            <td>{{ vente.montantTotal }}</td>
            <td v-text="t$('sellAmApp.StatutPaiement.' + vente.statutPaiement)"></td>
            <td>
              <div v-if="vente.client">
                <router-link :to="{ name: 'ClientView', params: { clientId: vente.client.id } }">{{ vente.client.id }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="vente.employe">
                <router-link :to="{ name: 'EmployeView', params: { employeId: vente.employe.id } }">{{ vente.employe.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'VenteView', params: { venteId: vente.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'VenteEdit', params: { venteId: vente.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(vente)"
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
        <span id="sellAmApp.vente.delete.question" data-cy="venteDeleteDialogHeading" v-text="t$('entity.delete.title')"></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-vente-heading" v-text="t$('sellAmApp.vente.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-vente"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeVente()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./vente.component.ts"></script>
