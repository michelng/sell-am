/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import LigneCmdFournisseurService from '../../../......mainwebappapp/entities/ligne-cmd-fournisseur/ligne-cmd-fournisseur.service';
import { LigneCmdFournisseur } from '../../../......mainwebappapp/shared/model/ligne-cmd-fournisseur.model';
import { StatutCmd } from '@/shared/model/enumerations/statut-cmd.model';

const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

const axiosStub = {
  get: sinon.stub(axios, 'get'),
  post: sinon.stub(axios, 'post'),
  put: sinon.stub(axios, 'put'),
  patch: sinon.stub(axios, 'patch'),
  delete: sinon.stub(axios, 'delete'),
};

describe('Service Tests', () => {
  describe('LigneCmdFournisseur Service', () => {
    let service: LigneCmdFournisseurService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new LigneCmdFournisseurService();
      currentDate = new Date();
      elemDefault = new LigneCmdFournisseur(123, 0, 0, currentDate, 0, 'AAAAAAA', 'EN_COURS_DE_TRAITEMENT');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dateLivraisonPrevu: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault
        );
        axiosStub.get.resolves({ data: returnedFromService });

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should not find an element', async () => {
        axiosStub.get.rejects(error);
        return service
          .find(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a LigneCmdFournisseur', async () => {
        const returnedFromService = Object.assign(
          {
            id: 123,
            dateLivraisonPrevu: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateLivraisonPrevu: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a LigneCmdFournisseur', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a LigneCmdFournisseur', async () => {
        const returnedFromService = Object.assign(
          {
            quantite: 1,
            prixUnitaire: 1,
            dateLivraisonPrevu: dayjs(currentDate).format(DATE_TIME_FORMAT),
            montantTotal: 1,
            commentaire: 'BBBBBB',
            statutCmd: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateLivraisonPrevu: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a LigneCmdFournisseur', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a LigneCmdFournisseur', async () => {
        const patchObject = Object.assign(
          {
            prixUnitaire: 1,
            dateLivraisonPrevu: dayjs(currentDate).format(DATE_TIME_FORMAT),
            montantTotal: 1,
            commentaire: 'BBBBBB',
            statutCmd: 'BBBBBB',
          },
          new LigneCmdFournisseur()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateLivraisonPrevu: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a LigneCmdFournisseur', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of LigneCmdFournisseur', async () => {
        const returnedFromService = Object.assign(
          {
            quantite: 1,
            prixUnitaire: 1,
            dateLivraisonPrevu: dayjs(currentDate).format(DATE_TIME_FORMAT),
            montantTotal: 1,
            commentaire: 'BBBBBB',
            statutCmd: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateLivraisonPrevu: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of LigneCmdFournisseur', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a LigneCmdFournisseur', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a LigneCmdFournisseur', async () => {
        axiosStub.delete.rejects(error);

        return service
          .delete(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});
