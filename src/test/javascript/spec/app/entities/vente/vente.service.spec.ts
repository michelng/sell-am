/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import VenteService from '../../../......mainwebappapp/entities/vente/vente.service';
import { Vente } from '../../../......mainwebappapp/shared/model/vente.model';
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
  describe('Vente Service', () => {
    let service: VenteService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new VenteService();
      currentDate = new Date();
      elemDefault = new Vente(123, 'AAAAAAA', currentDate, 'AAAAAAA', 0, 'EN_ATTENTE_DE_PAIEMENT');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dateVente: dayjs(currentDate).format(DATE_TIME_FORMAT),
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

      it('should create a Vente', async () => {
        const returnedFromService = Object.assign(
          {
            id: 123,
            dateVente: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateVente: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a Vente', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a Vente', async () => {
        const returnedFromService = Object.assign(
          {
            code: 'BBBBBB',
            dateVente: dayjs(currentDate).format(DATE_TIME_FORMAT),
            commentaire: 'BBBBBB',
            montantTotal: 1,
            statutPaiement: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateVente: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a Vente', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a Vente', async () => {
        const patchObject = Object.assign(
          {
            code: 'BBBBBB',
            montantTotal: 1,
          },
          new Vente()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateVente: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a Vente', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of Vente', async () => {
        const returnedFromService = Object.assign(
          {
            code: 'BBBBBB',
            dateVente: dayjs(currentDate).format(DATE_TIME_FORMAT),
            commentaire: 'BBBBBB',
            montantTotal: 1,
            statutPaiement: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateVente: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of Vente', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a Vente', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a Vente', async () => {
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
