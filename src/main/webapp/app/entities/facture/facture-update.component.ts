import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import VenteService from '@/entities/vente/vente.service';
import { IVente } from '@/shared/model/vente.model';
import ClientService from '@/entities/client/client.service';
import { IClient } from '@/shared/model/client.model';
import { IFacture, Facture } from '@/shared/model/facture.model';
import FactureService from './facture.service';
import { StatutPaiement } from '@/shared/model/enumerations/statut-paiement.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'FactureUpdate',
  setup() {
    const factureService = inject('factureService', () => new FactureService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const facture: Ref<IFacture> = ref(new Facture());
    const venteService = inject('venteService', () => new VenteService());
    const ventes: Ref<IVente[]> = ref([]);
    const clientService = inject('clientService', () => new ClientService());
    const clients: Ref<IClient[]> = ref([]);
    const statutPaiementValues: Ref<string[]> = ref(Object.keys(StatutPaiement));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveFacture = async factureId => {
      try {
        const res = await factureService().find(factureId);
        res.dateFacture = new Date(res.dateFacture);
        res.dateEcheance = new Date(res.dateEcheance);
        facture.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.factureId) {
      retrieveFacture(route.params.factureId);
    }

    const initRelationships = () => {
      venteService()
        .retrieve()
        .then(res => {
          ventes.value = res.data;
        });
      clientService()
        .retrieve()
        .then(res => {
          clients.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      numero: {},
      dateFacture: {},
      dateEcheance: {},
      montantTotal: {},
      commentaire: {},
      statutPaiement: {},
      vente: {},
      client: {},
    };
    const v$ = useVuelidate(validationRules, facture as any);
    v$.value.$validate();

    return {
      factureService,
      alertService,
      facture,
      previousState,
      statutPaiementValues,
      isSaving,
      currentLanguage,
      ventes,
      clients,
      v$,
      ...useDateFormat({ entityRef: facture }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.facture.id) {
        this.factureService()
          .update(this.facture)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.facture.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.factureService()
          .create(this.facture)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.facture.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
