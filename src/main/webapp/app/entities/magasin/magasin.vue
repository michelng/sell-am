<template>
  <div>
    <h2 id="page-heading" data-cy="MagasinHeading">
      <span v-text="t$('sellAmApp.magasin.home.title')" id="magasin-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.magasin.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'MagasinCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-magasin"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.magasin.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && magasins && magasins.length === 0">
      <span v-text="t$('sellAmApp.magasin.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="magasins && magasins.length > 0">
      <table class="table table-striped" aria-describedby="magasins">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.magasin.nom')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.magasin.raisonSociale')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.magasin.telephone1')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.magasin.telephone2')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.magasin.email')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.magasin.logo')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.magasin.description')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.magasin.entreprise')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="magasin in magasins" :key="magasin.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'MagasinView', params: { magasinId: magasin.id } }">{{ magasin.id }}</router-link>
            </td>
            <td>{{ magasin.nom }}</td>
            <td>{{ magasin.raisonSociale }}</td>
            <td>{{ magasin.telephone1 }}</td>
            <td>{{ magasin.telephone2 }}</td>
            <td>{{ magasin.email }}</td>
            <td>{{ magasin.logo }}</td>
            <td>{{ magasin.description }}</td>
            <td>
              <div v-if="magasin.entreprise">
                <router-link :to="{ name: 'EntrepriseView', params: { entrepriseId: magasin.entreprise.id } }">{{
                  magasin.entreprise.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'MagasinView', params: { magasinId: magasin.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'MagasinEdit', params: { magasinId: magasin.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(magasin)"
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
        <span id="sellAmApp.magasin.delete.question" data-cy="magasinDeleteDialogHeading" v-text="t$('entity.delete.title')"></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-magasin-heading" v-text="t$('sellAmApp.magasin.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-magasin"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeMagasin()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./magasin.component.ts"></script>
