<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.employe.home.createOrEditLabel"
          data-cy="EmployeCreateUpdateHeading"
          v-text="t$('sellAmApp.employe.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="employe.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="employe.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.identifiant')" for="employe-identifiant"></label>
            <input
              type="text"
              class="form-control"
              name="identifiant"
              id="employe-identifiant"
              data-cy="identifiant"
              :class="{ valid: !v$.identifiant.$invalid, invalid: v$.identifiant.$invalid }"
              v-model="v$.identifiant.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.nom')" for="employe-nom"></label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="employe-nom"
              data-cy="nom"
              :class="{ valid: !v$.nom.$invalid, invalid: v$.nom.$invalid }"
              v-model="v$.nom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.prenom')" for="employe-prenom"></label>
            <input
              type="text"
              class="form-control"
              name="prenom"
              id="employe-prenom"
              data-cy="prenom"
              :class="{ valid: !v$.prenom.$invalid, invalid: v$.prenom.$invalid }"
              v-model="v$.prenom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.dateNaissance')" for="employe-dateNaissance"></label>
            <div class="d-flex">
              <input
                id="employe-dateNaissance"
                data-cy="dateNaissance"
                type="datetime-local"
                class="form-control"
                name="dateNaissance"
                :class="{ valid: !v$.dateNaissance.$invalid, invalid: v$.dateNaissance.$invalid }"
                :value="convertDateTimeFromServer(v$.dateNaissance.$model)"
                @change="updateInstantField('dateNaissance', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.dateEmbauche')" for="employe-dateEmbauche"></label>
            <div class="d-flex">
              <input
                id="employe-dateEmbauche"
                data-cy="dateEmbauche"
                type="datetime-local"
                class="form-control"
                name="dateEmbauche"
                :class="{ valid: !v$.dateEmbauche.$invalid, invalid: v$.dateEmbauche.$invalid }"
                :value="convertDateTimeFromServer(v$.dateEmbauche.$model)"
                @change="updateInstantField('dateEmbauche', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.telephone1')" for="employe-telephone1"></label>
            <input
              type="text"
              class="form-control"
              name="telephone1"
              id="employe-telephone1"
              data-cy="telephone1"
              :class="{ valid: !v$.telephone1.$invalid, invalid: v$.telephone1.$invalid }"
              v-model="v$.telephone1.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.telephone2')" for="employe-telephone2"></label>
            <input
              type="text"
              class="form-control"
              name="telephone2"
              id="employe-telephone2"
              data-cy="telephone2"
              :class="{ valid: !v$.telephone2.$invalid, invalid: v$.telephone2.$invalid }"
              v-model="v$.telephone2.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.email')" for="employe-email"></label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="employe-email"
              data-cy="email"
              :class="{ valid: !v$.email.$invalid, invalid: v$.email.$invalid }"
              v-model="v$.email.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.salaire')" for="employe-salaire"></label>
            <input
              type="number"
              class="form-control"
              name="salaire"
              id="employe-salaire"
              data-cy="salaire"
              :class="{ valid: !v$.salaire.$invalid, invalid: v$.salaire.$invalid }"
              v-model.number="v$.salaire.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.photo')" for="employe-photo"></label>
            <input
              type="text"
              class="form-control"
              name="photo"
              id="employe-photo"
              data-cy="photo"
              :class="{ valid: !v$.photo.$invalid, invalid: v$.photo.$invalid }"
              v-model="v$.photo.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.fonction')" for="employe-fonction"></label>
            <input
              type="text"
              class="form-control"
              name="fonction"
              id="employe-fonction"
              data-cy="fonction"
              :class="{ valid: !v$.fonction.$invalid, invalid: v$.fonction.$invalid }"
              v-model="v$.fonction.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.statutEmploi')" for="employe-statutEmploi"></label>
            <select
              class="form-control"
              name="statutEmploi"
              :class="{ valid: !v$.statutEmploi.$invalid, invalid: v$.statutEmploi.$invalid }"
              v-model="v$.statutEmploi.$model"
              id="employe-statutEmploi"
              data-cy="statutEmploi"
            >
              <option
                v-for="statutEmploi in statutEmploiValues"
                :key="statutEmploi"
                v-bind:value="statutEmploi"
                v-bind:label="t$('sellAmApp.StatutEmploi.' + statutEmploi)"
              >
                {{ statutEmploi }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.statut')" for="employe-statut"></label>
            <select
              class="form-control"
              name="statut"
              :class="{ valid: !v$.statut.$invalid, invalid: v$.statut.$invalid }"
              v-model="v$.statut.$model"
              id="employe-statut"
              data-cy="statut"
            >
              <option v-for="statut in statutValues" :key="statut" v-bind:value="statut" v-bind:label="t$('sellAmApp.Statut.' + statut)">
                {{ statut }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.employe.entreprise')" for="employe-entreprise"></label>
            <select class="form-control" id="employe-entreprise" data-cy="entreprise" name="entreprise" v-model="employe.entreprise">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="employe.entreprise && entrepriseOption.id === employe.entreprise.id ? employe.entreprise : entrepriseOption"
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
<script lang="ts" src="./employe-update.component.ts"></script>
