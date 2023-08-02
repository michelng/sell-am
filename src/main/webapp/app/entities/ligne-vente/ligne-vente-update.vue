<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.ligneVente.home.createOrEditLabel"
          data-cy="LigneVenteCreateUpdateHeading"
          v-text="t$('sellAmApp.ligneVente.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="ligneVente.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="ligneVente.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.ligneVente.quantite')" for="ligne-vente-quantite"></label>
            <input
              type="number"
              class="form-control"
              name="quantite"
              id="ligne-vente-quantite"
              data-cy="quantite"
              :class="{ valid: !v$.quantite.$invalid, invalid: v$.quantite.$invalid }"
              v-model.number="v$.quantite.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.ligneVente.prixUnitaire')" for="ligne-vente-prixUnitaire"></label>
            <input
              type="number"
              class="form-control"
              name="prixUnitaire"
              id="ligne-vente-prixUnitaire"
              data-cy="prixUnitaire"
              :class="{ valid: !v$.prixUnitaire.$invalid, invalid: v$.prixUnitaire.$invalid }"
              v-model.number="v$.prixUnitaire.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.ligneVente.montantRemise')" for="ligne-vente-montantRemise"></label>
            <input
              type="number"
              class="form-control"
              name="montantRemise"
              id="ligne-vente-montantRemise"
              data-cy="montantRemise"
              :class="{ valid: !v$.montantRemise.$invalid, invalid: v$.montantRemise.$invalid }"
              v-model.number="v$.montantRemise.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.ligneVente.montantTotal')" for="ligne-vente-montantTotal"></label>
            <input
              type="number"
              class="form-control"
              name="montantTotal"
              id="ligne-vente-montantTotal"
              data-cy="montantTotal"
              :class="{ valid: !v$.montantTotal.$invalid, invalid: v$.montantTotal.$invalid }"
              v-model.number="v$.montantTotal.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.ligneVente.taxe')" for="ligne-vente-taxe"></label>
            <input
              type="number"
              class="form-control"
              name="taxe"
              id="ligne-vente-taxe"
              data-cy="taxe"
              :class="{ valid: !v$.taxe.$invalid, invalid: v$.taxe.$invalid }"
              v-model.number="v$.taxe.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.ligneVente.commentaire')" for="ligne-vente-commentaire"></label>
            <input
              type="text"
              class="form-control"
              name="commentaire"
              id="ligne-vente-commentaire"
              data-cy="commentaire"
              :class="{ valid: !v$.commentaire.$invalid, invalid: v$.commentaire.$invalid }"
              v-model="v$.commentaire.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.ligneVente.statutVente')" for="ligne-vente-statutVente"></label>
            <select
              class="form-control"
              name="statutVente"
              :class="{ valid: !v$.statutVente.$invalid, invalid: v$.statutVente.$invalid }"
              v-model="v$.statutVente.$model"
              id="ligne-vente-statutVente"
              data-cy="statutVente"
            >
              <option
                v-for="statutVente in statutVenteValues"
                :key="statutVente"
                v-bind:value="statutVente"
                v-bind:label="t$('sellAmApp.StatutVente.' + statutVente)"
              >
                {{ statutVente }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.ligneVente.vente')" for="ligne-vente-vente"></label>
            <select class="form-control" id="ligne-vente-vente" data-cy="vente" name="vente" v-model="ligneVente.vente">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="ligneVente.vente && venteOption.id === ligneVente.vente.id ? ligneVente.vente : venteOption"
                v-for="venteOption in ventes"
                :key="venteOption.id"
              >
                {{ venteOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.ligneVente.article')" for="ligne-vente-article"></label>
            <select class="form-control" id="ligne-vente-article" data-cy="article" name="article" v-model="ligneVente.article">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="ligneVente.article && articleOption.id === ligneVente.article.id ? ligneVente.article : articleOption"
                v-for="articleOption in articles"
                :key="articleOption.id"
              >
                {{ articleOption.id }}
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
<script lang="ts" src="./ligne-vente-update.component.ts"></script>
