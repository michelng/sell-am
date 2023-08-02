<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.fournisseur.home.createOrEditLabel"
          data-cy="FournisseurCreateUpdateHeading"
          v-text="t$('sellAmApp.fournisseur.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="fournisseur.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="fournisseur.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.fournisseur.identifiant')" for="fournisseur-identifiant"></label>
            <input
              type="text"
              class="form-control"
              name="identifiant"
              id="fournisseur-identifiant"
              data-cy="identifiant"
              :class="{ valid: !v$.identifiant.$invalid, invalid: v$.identifiant.$invalid }"
              v-model="v$.identifiant.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.fournisseur.nomResponsable')" for="fournisseur-nomResponsable"></label>
            <input
              type="text"
              class="form-control"
              name="nomResponsable"
              id="fournisseur-nomResponsable"
              data-cy="nomResponsable"
              :class="{ valid: !v$.nomResponsable.$invalid, invalid: v$.nomResponsable.$invalid }"
              v-model="v$.nomResponsable.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.fournisseur.raisonSociale')" for="fournisseur-raisonSociale"></label>
            <input
              type="text"
              class="form-control"
              name="raisonSociale"
              id="fournisseur-raisonSociale"
              data-cy="raisonSociale"
              :class="{ valid: !v$.raisonSociale.$invalid, invalid: v$.raisonSociale.$invalid }"
              v-model="v$.raisonSociale.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.fournisseur.telephone1')" for="fournisseur-telephone1"></label>
            <input
              type="text"
              class="form-control"
              name="telephone1"
              id="fournisseur-telephone1"
              data-cy="telephone1"
              :class="{ valid: !v$.telephone1.$invalid, invalid: v$.telephone1.$invalid }"
              v-model="v$.telephone1.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.fournisseur.telephone2')" for="fournisseur-telephone2"></label>
            <input
              type="text"
              class="form-control"
              name="telephone2"
              id="fournisseur-telephone2"
              data-cy="telephone2"
              :class="{ valid: !v$.telephone2.$invalid, invalid: v$.telephone2.$invalid }"
              v-model="v$.telephone2.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.fournisseur.email')" for="fournisseur-email"></label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="fournisseur-email"
              data-cy="email"
              :class="{ valid: !v$.email.$invalid, invalid: v$.email.$invalid }"
              v-model="v$.email.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.fournisseur.logo')" for="fournisseur-logo"></label>
            <input
              type="text"
              class="form-control"
              name="logo"
              id="fournisseur-logo"
              data-cy="logo"
              :class="{ valid: !v$.logo.$invalid, invalid: v$.logo.$invalid }"
              v-model="v$.logo.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.fournisseur.description')" for="fournisseur-description"></label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="fournisseur-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.fournisseur.statut')" for="fournisseur-statut"></label>
            <select
              class="form-control"
              name="statut"
              :class="{ valid: !v$.statut.$invalid, invalid: v$.statut.$invalid }"
              v-model="v$.statut.$model"
              id="fournisseur-statut"
              data-cy="statut"
            >
              <option v-for="statut in statutValues" :key="statut" v-bind:value="statut" v-bind:label="t$('sellAmApp.Statut.' + statut)">
                {{ statut }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.cancel')"></span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.save')"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./fournisseur-update.component.ts"></script>
