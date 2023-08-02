<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="discount">
        <h2 class="jh-entity-heading" data-cy="discountDetailsHeading">
          <span v-text="t$('sellAmApp.discount.detail.title')"></span> {{ discount.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.discount.code')"></span>
          </dt>
          <dd>
            <span>{{ discount.code }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.discount.description')"></span>
          </dt>
          <dd>
            <span>{{ discount.description }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.discount.montant')"></span>
          </dt>
          <dd>
            <span>{{ discount.montant }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="discount.id" :to="{ name: 'DiscountEdit', params: { discountId: discount.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./discount-details.component.ts"></script>
