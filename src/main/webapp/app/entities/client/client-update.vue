<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.client.home.createOrEditLabel"
          data-cy="ClientCreateUpdateHeading"
          v-text="t$('sellAmApp.client.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="client.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="client.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.client.identifiant')" for="client-identifiant"></label>
            <input
              type="text"
              class="form-control"
              name="identifiant"
              id="client-identifiant"
              data-cy="identifiant"
              :class="{ valid: !v$.identifiant.$invalid, invalid: v$.identifiant.$invalid }"
              v-model="v$.identifiant.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.client.nom')" for="client-nom"></label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="client-nom"
              data-cy="nom"
              :class="{ valid: !v$.nom.$invalid, invalid: v$.nom.$invalid }"
              v-model="v$.nom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.client.prenom')" for="client-prenom"></label>
            <input
              type="text"
              class="form-control"
              name="prenom"
              id="client-prenom"
              data-cy="prenom"
              :class="{ valid: !v$.prenom.$invalid, invalid: v$.prenom.$invalid }"
              v-model="v$.prenom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.client.telephone1')" for="client-telephone1"></label>
            <input
              type="text"
              class="form-control"
              name="telephone1"
              id="client-telephone1"
              data-cy="telephone1"
              :class="{ valid: !v$.telephone1.$invalid, invalid: v$.telephone1.$invalid }"
              v-model="v$.telephone1.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.client.telephone2')" for="client-telephone2"></label>
            <input
              type="text"
              class="form-control"
              name="telephone2"
              id="client-telephone2"
              data-cy="telephone2"
              :class="{ valid: !v$.telephone2.$invalid, invalid: v$.telephone2.$invalid }"
              v-model="v$.telephone2.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.client.email')" for="client-email"></label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="client-email"
              data-cy="email"
              :class="{ valid: !v$.email.$invalid, invalid: v$.email.$invalid }"
              v-model="v$.email.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.client.photo')" for="client-photo"></label>
            <input
              type="text"
              class="form-control"
              name="photo"
              id="client-photo"
              data-cy="photo"
              :class="{ valid: !v$.photo.$invalid, invalid: v$.photo.$invalid }"
              v-model="v$.photo.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.client.description')" for="client-description"></label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="client-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.client.typeClient')" for="client-typeClient"></label>
            <select
              class="form-control"
              name="typeClient"
              :class="{ valid: !v$.typeClient.$invalid, invalid: v$.typeClient.$invalid }"
              v-model="v$.typeClient.$model"
              id="client-typeClient"
              data-cy="typeClient"
            >
              <option
                v-for="typeClient in typeClientValues"
                :key="typeClient"
                v-bind:value="typeClient"
                v-bind:label="t$('sellAmApp.TypeClient.' + typeClient)"
              >
                {{ typeClient }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.client.statut')" for="client-statut"></label>
            <select
              class="form-control"
              name="statut"
              :class="{ valid: !v$.statut.$invalid, invalid: v$.statut.$invalid }"
              v-model="v$.statut.$model"
              id="client-statut"
              data-cy="statut"
            >
              <option v-for="statut in statutValues" :key="statut" v-bind:value="statut" v-bind:label="t$('sellAmApp.Statut.' + statut)">
                {{ statut }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.client.carteCredit')" for="client-carteCredit"></label>
            <input
              type="text"
              class="form-control"
              name="carteCredit"
              id="client-carteCredit"
              data-cy="carteCredit"
              :class="{ valid: !v$.carteCredit.$invalid, invalid: v$.carteCredit.$invalid }"
              v-model="v$.carteCredit.$model"
            />
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
<script lang="ts" src="./client-update.component.ts"></script>
