<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.entreprise.home.createOrEditLabel"
          data-cy="EntrepriseCreateUpdateHeading"
          v-text="t$('sellAmApp.entreprise.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="entreprise.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="entreprise.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.entreprise.nom')" for="entreprise-nom"></label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="entreprise-nom"
              data-cy="nom"
              :class="{ valid: !v$.nom.$invalid, invalid: v$.nom.$invalid }"
              v-model="v$.nom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.entreprise.raisonSociale')" for="entreprise-raisonSociale"></label>
            <input
              type="text"
              class="form-control"
              name="raisonSociale"
              id="entreprise-raisonSociale"
              data-cy="raisonSociale"
              :class="{ valid: !v$.raisonSociale.$invalid, invalid: v$.raisonSociale.$invalid }"
              v-model="v$.raisonSociale.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.entreprise.telephone1')" for="entreprise-telephone1"></label>
            <input
              type="text"
              class="form-control"
              name="telephone1"
              id="entreprise-telephone1"
              data-cy="telephone1"
              :class="{ valid: !v$.telephone1.$invalid, invalid: v$.telephone1.$invalid }"
              v-model="v$.telephone1.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.entreprise.telephone2')" for="entreprise-telephone2"></label>
            <input
              type="text"
              class="form-control"
              name="telephone2"
              id="entreprise-telephone2"
              data-cy="telephone2"
              :class="{ valid: !v$.telephone2.$invalid, invalid: v$.telephone2.$invalid }"
              v-model="v$.telephone2.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.entreprise.email')" for="entreprise-email"></label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="entreprise-email"
              data-cy="email"
              :class="{ valid: !v$.email.$invalid, invalid: v$.email.$invalid }"
              v-model="v$.email.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.entreprise.logo')" for="entreprise-logo"></label>
            <input
              type="text"
              class="form-control"
              name="logo"
              id="entreprise-logo"
              data-cy="logo"
              :class="{ valid: !v$.logo.$invalid, invalid: v$.logo.$invalid }"
              v-model="v$.logo.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.entreprise.description')" for="entreprise-description"></label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="entreprise-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.entreprise.sitWeb')" for="entreprise-sitWeb"></label>
            <input
              type="text"
              class="form-control"
              name="sitWeb"
              id="entreprise-sitWeb"
              data-cy="sitWeb"
              :class="{ valid: !v$.sitWeb.$invalid, invalid: v$.sitWeb.$invalid }"
              v-model="v$.sitWeb.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.entreprise.statut')" for="entreprise-statut"></label>
            <select
              class="form-control"
              name="statut"
              :class="{ valid: !v$.statut.$invalid, invalid: v$.statut.$invalid }"
              v-model="v$.statut.$model"
              id="entreprise-statut"
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
<script lang="ts" src="./entreprise-update.component.ts"></script>
