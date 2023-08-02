<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.magasin.home.createOrEditLabel"
          data-cy="MagasinCreateUpdateHeading"
          v-text="t$('sellAmApp.magasin.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="magasin.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="magasin.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.magasin.nom')" for="magasin-nom"></label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="magasin-nom"
              data-cy="nom"
              :class="{ valid: !v$.nom.$invalid, invalid: v$.nom.$invalid }"
              v-model="v$.nom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.magasin.raisonSociale')" for="magasin-raisonSociale"></label>
            <input
              type="text"
              class="form-control"
              name="raisonSociale"
              id="magasin-raisonSociale"
              data-cy="raisonSociale"
              :class="{ valid: !v$.raisonSociale.$invalid, invalid: v$.raisonSociale.$invalid }"
              v-model="v$.raisonSociale.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.magasin.telephone1')" for="magasin-telephone1"></label>
            <input
              type="text"
              class="form-control"
              name="telephone1"
              id="magasin-telephone1"
              data-cy="telephone1"
              :class="{ valid: !v$.telephone1.$invalid, invalid: v$.telephone1.$invalid }"
              v-model="v$.telephone1.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.magasin.telephone2')" for="magasin-telephone2"></label>
            <input
              type="text"
              class="form-control"
              name="telephone2"
              id="magasin-telephone2"
              data-cy="telephone2"
              :class="{ valid: !v$.telephone2.$invalid, invalid: v$.telephone2.$invalid }"
              v-model="v$.telephone2.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.magasin.email')" for="magasin-email"></label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="magasin-email"
              data-cy="email"
              :class="{ valid: !v$.email.$invalid, invalid: v$.email.$invalid }"
              v-model="v$.email.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.magasin.logo')" for="magasin-logo"></label>
            <input
              type="text"
              class="form-control"
              name="logo"
              id="magasin-logo"
              data-cy="logo"
              :class="{ valid: !v$.logo.$invalid, invalid: v$.logo.$invalid }"
              v-model="v$.logo.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.magasin.description')" for="magasin-description"></label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="magasin-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.magasin.entreprise')" for="magasin-entreprise"></label>
            <select class="form-control" id="magasin-entreprise" data-cy="entreprise" name="entreprise" v-model="magasin.entreprise">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="magasin.entreprise && entrepriseOption.id === magasin.entreprise.id ? magasin.entreprise : entrepriseOption"
                v-for="entrepriseOption in entreprises"
                :key="entrepriseOption.id"
              >
                {{ entrepriseOption.id }}
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
<script lang="ts" src="./magasin-update.component.ts"></script>
