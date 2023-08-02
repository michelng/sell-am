<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.facture.home.createOrEditLabel"
          data-cy="FactureCreateUpdateHeading"
          v-text="t$('sellAmApp.facture.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="facture.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="facture.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.facture.numero')" for="facture-numero"></label>
            <input
              type="text"
              class="form-control"
              name="numero"
              id="facture-numero"
              data-cy="numero"
              :class="{ valid: !v$.numero.$invalid, invalid: v$.numero.$invalid }"
              v-model="v$.numero.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.facture.dateFacture')" for="facture-dateFacture"></label>
            <div class="d-flex">
              <input
                id="facture-dateFacture"
                data-cy="dateFacture"
                type="datetime-local"
                class="form-control"
                name="dateFacture"
                :class="{ valid: !v$.dateFacture.$invalid, invalid: v$.dateFacture.$invalid }"
                :value="convertDateTimeFromServer(v$.dateFacture.$model)"
                @change="updateInstantField('dateFacture', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.facture.dateEcheance')" for="facture-dateEcheance"></label>
            <div class="d-flex">
              <input
                id="facture-dateEcheance"
                data-cy="dateEcheance"
                type="datetime-local"
                class="form-control"
                name="dateEcheance"
                :class="{ valid: !v$.dateEcheance.$invalid, invalid: v$.dateEcheance.$invalid }"
                :value="convertDateTimeFromServer(v$.dateEcheance.$model)"
                @change="updateInstantField('dateEcheance', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.facture.montantTotal')" for="facture-montantTotal"></label>
            <input
              type="number"
              class="form-control"
              name="montantTotal"
              id="facture-montantTotal"
              data-cy="montantTotal"
              :class="{ valid: !v$.montantTotal.$invalid, invalid: v$.montantTotal.$invalid }"
              v-model.number="v$.montantTotal.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.facture.commentaire')" for="facture-commentaire"></label>
            <input
              type="text"
              class="form-control"
              name="commentaire"
              id="facture-commentaire"
              data-cy="commentaire"
              :class="{ valid: !v$.commentaire.$invalid, invalid: v$.commentaire.$invalid }"
              v-model="v$.commentaire.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.facture.statutPaiement')" for="facture-statutPaiement"></label>
            <select
              class="form-control"
              name="statutPaiement"
              :class="{ valid: !v$.statutPaiement.$invalid, invalid: v$.statutPaiement.$invalid }"
              v-model="v$.statutPaiement.$model"
              id="facture-statutPaiement"
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
            <label class="form-control-label" v-text="t$('sellAmApp.facture.vente')" for="facture-vente"></label>
            <select class="form-control" id="facture-vente" data-cy="vente" name="vente" v-model="facture.vente">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="facture.vente && venteOption.id === facture.vente.id ? facture.vente : venteOption"
                v-for="venteOption in ventes"
                :key="venteOption.id"
              >
                {{ venteOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.facture.client')" for="facture-client"></label>
            <select class="form-control" id="facture-client" data-cy="client" name="client" v-model="facture.client">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="facture.client && clientOption.id === facture.client.id ? facture.client : clientOption"
                v-for="clientOption in clients"
                :key="clientOption.id"
              >
                {{ clientOption.id }}
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
<script lang="ts" src="./facture-update.component.ts"></script>
