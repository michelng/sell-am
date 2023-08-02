/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import FactureService from '../../../......mainwebappapp/entities/facture/facture.service';
import { Facture } from '../../../......mainwebappapp/shared/model/facture.model';
import { StatutPaiement } from '@/shared/model/enumerations/statut-paiement.model';

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
  describe('Facture Service', () => {
    let service: FactureService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new FactureService();
      currentDate = new Date();
      elemDefault = new Facture(123, 'AAAAAAA', currentDate, currentDate, 0, 'AAAAAAA', 'EN_ATTENTE_DE_PAIEMENT');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dateFacture: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateEcheance: dayjs(currentDate).format(DATE_TIME_FORMAT),
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

      it('should create a Facture', async () => {
        const returnedFromService = Object.assign(
          {
            id: 123,
            dateFacture: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateEcheance: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateFacture: currentDate,
            dateEcheance: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a Facture', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a Facture', async () => {
        const returnedFromService = Object.assign(
          {
            numero: 'BBBBBB',
            dateFacture: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateEcheance: dayjs(currentDate).format(DATE_TIME_FORMAT),
            montantTotal: 1,
            commentaire: 'BBBBBB',
            statutPaiement: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateFacture: currentDate,
            dateEcheance: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a Facture', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a Facture', async () => {
        const patchObject = Object.assign(
          {
            dateEcheance: dayjs(currentDate).format(DATE_TIME_FORMAT),
            montantTotal: 1,
            statutPaiement: 'BBBBBB',
          },
          new Facture()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateFacture: currentDate,
            dateEcheance: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a Facture', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of Facture', async () => {
        const returnedFromService = Object.assign(
          {
            numero: 'BBBBBB',
            dateFacture: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateEcheance: dayjs(currentDate).format(DATE_TIME_FORMAT),
            montantTotal: 1,
            commentaire: 'BBBBBB',
            statutPaiement: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateFacture: currentDate,
            dateEcheance: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of Facture', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a Facture', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a Facture', async () => {
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
