<template>
  <div>
    <h2 id="page-heading" data-cy="EntrepriseHeading">
      <span v-text="t$('sellAmApp.entreprise.home.title')" id="entreprise-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.entreprise.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'EntrepriseCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-entreprise"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.entreprise.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && entreprises && entreprises.length === 0">
      <span v-text="t$('sellAmApp.entreprise.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="entreprises && entreprises.length > 0">
      <table class="table table-striped" aria-describedby="entreprises">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.entreprise.nom')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.entreprise.raisonSociale')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.entreprise.telephone1')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.entreprise.telephone2')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.entreprise.email')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.entreprise.logo')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.entreprise.description')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.entreprise.sitWeb')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.entreprise.statut')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entreprise in entreprises" :key="entreprise.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'EntrepriseView', params: { entrepriseId: entreprise.id } }">{{ entreprise.id }}</router-link>
            </td>
            <td>{{ entreprise.nom }}</td>
            <td>{{ entreprise.raisonSociale }}</td>
            <td>{{ entreprise.telephone1 }}</td>
            <td>{{ entreprise.telephone2 }}</td>
            <td>{{ entreprise.email }}</td>
            <td>{{ entreprise.logo }}</td>
            <td>{{ entreprise.description }}</td>
            <td>{{ entreprise.sitWeb }}</td>
            <td v-text="t$('sellAmApp.Statut.' + entreprise.statut)"></td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'EntrepriseView', params: { entrepriseId: entreprise.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'EntrepriseEdit', params: { entrepriseId: entreprise.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(entreprise)"
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
        <span id="sellAmApp.entreprise.delete.question" data-cy="entrepriseDeleteDialogHeading" v-text="t$('entity.delete.title')"></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-entreprise-heading" v-text="t$('sellAmApp.entreprise.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-entreprise"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeEntreprise()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./entreprise.component.ts"></script>
