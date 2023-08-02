<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="promotion">
        <h2 class="jh-entity-heading" data-cy="promotionDetailsHeading">
          <span v-text="t$('sellAmApp.promotion.detail.title')"></span> {{ promotion.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.promotion.code')"></span>
          </dt>
          <dd>
            <span>{{ promotion.code }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.promotion.description')"></span>
          </dt>
          <dd>
            <span>{{ promotion.description }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.promotion.dateDebut')"></span>
          </dt>
          <dd>
            <span v-if="promotion.dateDebut">{{ formatDateLong(promotion.dateDebut) }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.promotion.dateFin')"></span>
          </dt>
          <dd>
            <span v-if="promotion.dateFin">{{ formatDateLong(promotion.dateFin) }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="promotion.id"
          :to="{ name: 'PromotionEdit', params: { promotionId: promotion.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./promotion-details.component.ts"></script>
