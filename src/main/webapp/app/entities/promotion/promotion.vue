<template>
  <div>
    <h2 id="page-heading" data-cy="PromotionHeading">
      <span v-text="t$('sellAmApp.promotion.home.title')" id="promotion-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.promotion.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'PromotionCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-promotion"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.promotion.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && promotions && promotions.length === 0">
      <span v-text="t$('sellAmApp.promotion.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="promotions && promotions.length > 0">
      <table class="table table-striped" aria-describedby="promotions">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.promotion.code')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.promotion.description')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.promotion.dateDebut')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.promotion.dateFin')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="promotion in promotions" :key="promotion.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'PromotionView', params: { promotionId: promotion.id } }">{{ promotion.id }}</router-link>
            </td>
            <td>{{ promotion.code }}</td>
            <td>{{ promotion.description }}</td>
            <td>{{ formatDateShort(promotion.dateDebut) || '' }}</td>
            <td>{{ formatDateShort(promotion.dateFin) || '' }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'PromotionView', params: { promotionId: promotion.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'PromotionEdit', params: { promotionId: promotion.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(promotion)"
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
        <span id="sellAmApp.promotion.delete.question" data-cy="promotionDeleteDialogHeading" v-text="t$('entity.delete.title')"></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-promotion-heading" v-text="t$('sellAmApp.promotion.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-promotion"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removePromotion()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./promotion.component.ts"></script>
