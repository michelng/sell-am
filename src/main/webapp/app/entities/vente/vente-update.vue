<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.vente.home.createOrEditLabel"
          data-cy="VenteCreateUpdateHeading"
          v-text="t$('sellAmApp.vente.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="vente.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="vente.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.vente.code')" for="vente-code"></label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="vente-code"
              data-cy="code"
              :class="{ valid: !v$.code.$invalid, invalid: v$.code.$invalid }"
              v-model="v$.code.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.vente.dateVente')" for="vente-dateVente"></label>
            <div class="d-flex">
              <input
                id="vente-dateVente"
                data-cy="dateVente"
                type="datetime-local"
                class="form-control"
                name="dateVente"
                :class="{ valid: !v$.dateVente.$invalid, invalid: v$.dateVente.$invalid }"
                :value="convertDateTimeFromServer(v$.dateVente.$model)"
                @change="updateInstantField('dateVente', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.vente.commentaire')" for="vente-commentaire"></label>
            <input
              type="text"
              class="form-control"
              name="commentaire"
              id="vente-commentaire"
              data-cy="commentaire"
              :class="{ valid: !v$.commentaire.$invalid, invalid: v$.commentaire.$invalid }"
              v-model="v$.commentaire.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.vente.montantTotal')" for="vente-montantTotal"></label>
            <input
              type="number"
              class="form-control"
              name="montantTotal"
              id="vente-montantTotal"
              data-cy="montantTotal"
              :class="{ valid: !v$.montantTotal.$invalid, invalid: v$.montantTotal.$invalid }"
              v-model.number="v$.montantTotal.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.vente.statutPaiement')" for="vente-statutPaiement"></label>
            <select
              class="form-control"
              name="statutPaiement"
              :class="{ valid: !v$.statutPaiement.$invalid, invalid: v$.statutPaiement.$invalid }"
              v-model="v$.statutPaiement.$model"
              id="vente-statutPaiement"
              data-cy="statutPaiement"
            >
              <option
                v-for="statutPaiement in statutPaiementValues"
                :key="statutPaiement"
                v-bind:value="statutPaiement"
                v-bind:label="t$('sellAmApp.StatutPaiement.' + statutPaiement)"
              >
                {{ statutPaiement }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.vente.client')" for="vente-client"></label>
            <select class="form-control" id="vente-client" data-cy="client" name="client" v-model="vente.client">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="vente.client && clientOption.id === vente.client.id ? vente.client : clientOption"
                v-for="clientOption in clients"
                :key="clientOption.id"
              >
                {{ clientOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.vente.employe')" for="vente-employe"></label>
            <select class="form-control" id="vente-employe" data-cy="employe" name="employe" v-model="vente.employe">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="vente.employe && employeOption.id === vente.employe.id ? vente.employe : employeOption"
                v-for="employeOption in employes"
                :key="employeOption.id"
              >
                {{ employeOption.id }}
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
<script lang="ts" src="./vente-update.component.ts"></script>
