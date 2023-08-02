import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import FournisseurService from '@/entities/fournisseur/fournisseur.service';
import { IFournisseur } from '@/shared/model/fournisseur.model';
import { ICmdFournisseur, CmdFournisseur } from '@/shared/model/cmd-fournisseur.model';
import CmdFournisseurService from './cmd-fournisseur.service';
import { StatutCmd } from '@/shared/model/enumerations/statut-cmd.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CmdFournisseurUpdate',
  setup() {
    const cmdFournisseurService = inject('cmdFournisseurService', () => new CmdFournisseurService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const cmdFournisseur: Ref<ICmdFournisseur> = ref(new CmdFournisseur());
    const fournisseurService = inject('fournisseurService', () => new FournisseurService());
    const fournisseurs: Ref<IFournisseur[]> = ref([]);
    const statutCmdValues: Ref<string[]> = ref(Object.keys(StatutCmd));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveCmdFournisseur = async cmdFournisseurId => {
      try {
        const res = await cmdFournisseurService().find(cmdFournisseurId);
        res.dateCommande = new Date(res.dateCommande);
        res.dateLivraisonPrevue = new Date(res.dateLivraisonPrevue);
        cmdFournisseur.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.cmdFournisseurId) {
      retrieveCmdFournisseur(route.params.cmdFournisseurId);
    }

    const initRelationships = () => {
      fournisseurService()
        .retrieve()
        .then(res => {
          fournisseurs.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      code: {},
      dateCommande: {},
      dateLivraisonPrevue: {},
      montantTotal: {},
      commentaire: {},
      statutCmd: {},
      fournisseur: {},
    };
    const v$ = useVuelidate(validationRules, cmdFournisseur as any);
    v$.value.$validate();

    return {
      cmdFournisseurService,
      alertService,
      cmdFournisseur,
      previousState,
      statutCmdValues,
      isSaving,
      currentLanguage,
      fournisseurs,
      v$,
      ...useDateFormat({ entityRef: cmdFournisseur }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.cmdFournisseur.id) {
        this.cmdFournisseurService()
          .update(this.cmdFournisseur)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.cmdFournisseur.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.cmdFournisseurService()
          .create(this.cmdFournisseur)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.cmdFournisseur.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
