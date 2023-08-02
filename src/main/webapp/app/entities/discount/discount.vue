<template>
  <div>
    <h2 id="page-heading" data-cy="DiscountHeading">
      <span v-text="t$('sellAmApp.discount.home.title')" id="discount-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.discount.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'DiscountCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-discount"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.discount.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && discounts && discounts.length === 0">
      <span v-text="t$('sellAmApp.discount.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="discounts && discounts.length > 0">
      <table class="table table-striped" aria-describedby="discounts">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.discount.code')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.discount.description')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.discount.montant')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="discount in discounts" :key="discount.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'DiscountView', params: { discountId: discount.id } }">{{ discount.id }}</router-link>
            </td>
            <td>{{ discount.code }}</td>
            <td>{{ discount.description }}</td>
            <td>{{ discount.montant }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'DiscountView', params: { discountId: discount.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'DiscountEdit', params: { discountId: discount.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(discount)"
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
        <span id="sellAmApp.discount.delete.question" data-cy="discountDeleteDialogHeading" v-text="t$('entity.delete.title')"></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-discount-heading" v-text="t$('sellAmApp.discount.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-discount"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeDiscount()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./discount.component.ts"></script>
