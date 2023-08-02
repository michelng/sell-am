<template>
  <div>
    <h2 id="page-heading" data-cy="FournisseurHeading">
      <span v-text="t$('sellAmApp.fournisseur.home.title')" id="fournisseur-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.fournisseur.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'FournisseurCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-fournisseur"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.fournisseur.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && fournisseurs && fournisseurs.length === 0">
      <span v-text="t$('sellAmApp.fournisseur.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="fournisseurs && fournisseurs.length > 0">
      <table class="table table-striped" aria-describedby="fournisseurs">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.fournisseur.identifiant')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.fournisseur.nomResponsable')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.fournisseur.raisonSociale')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.fournisseur.telephone1')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.fournisseur.telephone2')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.fournisseur.email')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.fournisseur.logo')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.fournisseur.description')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.fournisseur.statut')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fournisseur in fournisseurs" :key="fournisseur.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'FournisseurView', params: { fournisseurId: fournisseur.id } }">{{ fournisseur.id }}</router-link>
            </td>
            <td>{{ fournisseur.identifiant }}</td>
            <td>{{ fournisseur.nomResponsable }}</td>
            <td>{{ fournisseur.raisonSociale }}</td>
            <td>{{ fournisseur.telephone1 }}</td>
            <td>{{ fournisseur.telephone2 }}</td>
            <td>{{ fournisseur.email }}</td>
            <td>{{ fournisseur.logo }}</td>
            <td>{{ fournisseur.description }}</td>
            <td v-text="t$('sellAmApp.Statut.' + fournisseur.statut)"></td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'FournisseurView', params: { fournisseurId: fournisseur.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'FournisseurEdit', params: { fournisseurId: fournisseur.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(fournisseur)"
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
        <span id="sellAmApp.fournisseur.delete.question" data-cy="fournisseurDeleteDialogHeading" v-text="t$('entity.delete.title')"></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-fournisseur-heading" v-text="t$('sellAmApp.fournisseur.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-fournisseur"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeFournisseur()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./fournisseur.component.ts"></script>
