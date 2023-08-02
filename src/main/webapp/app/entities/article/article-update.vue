<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.article.home.createOrEditLabel"
          data-cy="ArticleCreateUpdateHeading"
          v-text="t$('sellAmApp.article.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="article.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="article.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.article.code')" for="article-code"></label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="article-code"
              data-cy="code"
              :class="{ valid: !v$.code.$invalid, invalid: v$.code.$invalid }"
              v-model="v$.code.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.article.designation')" for="article-designation"></label>
            <input
              type="text"
              class="form-control"
              name="designation"
              id="article-designation"
              data-cy="designation"
              :class="{ valid: !v$.designation.$invalid, invalid: v$.designation.$invalid }"
              v-model="v$.designation.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.article.prixUnitaireHt')" for="article-prixUnitaireHt"></label>
            <input
              type="number"
              class="form-control"
              name="prixUnitaireHt"
              id="article-prixUnitaireHt"
              data-cy="prixUnitaireHt"
              :class="{ valid: !v$.prixUnitaireHt.$invalid, invalid: v$.prixUnitaireHt.$invalid }"
              v-model.number="v$.prixUnitaireHt.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.article.tauxTva')" for="article-tauxTva"></label>
            <input
              type="number"
              class="form-control"
              name="tauxTva"
              id="article-tauxTva"
              data-cy="tauxTva"
              :class="{ valid: !v$.tauxTva.$invalid, invalid: v$.tauxTva.$invalid }"
              v-model.number="v$.tauxTva.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.article.prixUnitaireTtc')" for="article-prixUnitaireTtc"></label>
            <input
              type="number"
              class="form-control"
              name="prixUnitaireTtc"
              id="article-prixUnitaireTtc"
              data-cy="prixUnitaireTtc"
              :class="{ valid: !v$.prixUnitaireTtc.$invalid, invalid: v$.prixUnitaireTtc.$invalid }"
              v-model.number="v$.prixUnitaireTtc.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.article.photo')" for="article-photo"></label>
            <input
              type="text"
              class="form-control"
              name="photo"
              id="article-photo"
              data-cy="photo"
              :class="{ valid: !v$.photo.$invalid, invalid: v$.photo.$invalid }"
              v-model="v$.photo.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.article.quantiteEnStock')" for="article-quantiteEnStock"></label>
            <input
              type="number"
              class="form-control"
              name="quantiteEnStock"
              id="article-quantiteEnStock"
              data-cy="quantiteEnStock"
              :class="{ valid: !v$.quantiteEnStock.$invalid, invalid: v$.quantiteEnStock.$invalid }"
              v-model.number="v$.quantiteEnStock.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.article.seuilDeReapprovisionnement')"
              for="article-seuilDeReapprovisionnement"
            ></label>
            <input
              type="number"
              class="form-control"
              name="seuilDeReapprovisionnement"
              id="article-seuilDeReapprovisionnement"
              data-cy="seuilDeReapprovisionnement"
              :class="{ valid: !v$.seuilDeReapprovisionnement.$invalid, invalid: v$.seuilDeReapprovisionnement.$invalid }"
              v-model.number="v$.seuilDeReapprovisionnement.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.article.magasin')" for="article-magasin"></label>
            <select class="form-control" id="article-magasin" data-cy="magasin" name="magasin" v-model="article.magasin">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="article.magasin && magasinOption.id === article.magasin.id ? article.magasin : magasinOption"
                v-for="magasinOption in magasins"
                :key="magasinOption.id"
              >
                {{ magasinOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.article.categorie')" for="article-categorie"></label>
            <select class="form-control" id="article-categorie" data-cy="categorie" name="categorie" v-model="article.categorie">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="article.categorie && categorieOption.id === article.categorie.id ? article.categorie : categorieOption"
                v-for="categorieOption in categories"
                :key="categorieOption.id"
              >
                {{ categorieOption.id }}
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
<script lang="ts" src="./article-update.component.ts"></script>
