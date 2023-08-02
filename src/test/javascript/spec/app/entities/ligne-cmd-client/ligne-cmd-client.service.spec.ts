/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import LigneCmdClientService from '../../../......mainwebappapp/entities/ligne-cmd-client/ligne-cmd-client.service';
import { LigneCmdClient } from '../../../......mainwebappapp/shared/model/ligne-cmd-client.model';
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
  describe('LigneCmdClient Service', () => {
    let service: LigneCmdClientService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new LigneCmdClientService();
      currentDate = new Date();
      elemDefault = new LigneCmdClient(123, 0, 0, currentDate, 0, 'AAAAAAA', 'EN_COURS_DE_TRAITEMENT');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dateLivraisonPrevue: dayjs(currentDate).format(DATE_TIME_FORMAT),
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

      it('should create a LigneCmdClient', async () => {
        const returnedFromService = Object.assign(
          {
            id: 123,
            dateLivraisonPrevue: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateLivraisonPrevue: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a LigneCmdClient', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a LigneCmdClient', async () => {
        const returnedFromService = Object.assign(
          {
            quantite: 1,
            prixUnitaire: 1,
            dateLivraisonPrevue: dayjs(currentDate).format(DATE_TIME_FORMAT),
            montantTotal: 1,
            commentaire: 'BBBBBB',
            statutCmd: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateLivraisonPrevue: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a LigneCmdClient', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a LigneCmdClient', async () => {
        const patchObject = Object.assign(
          {
            prixUnitaire: 1,
            dateLivraisonPrevue: dayjs(currentDate).format(DATE_TIME_FORMAT),
            commentaire: 'BBBBBB',
          },
          new LigneCmdClient()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateLivraisonPrevue: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a LigneCmdClient', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of LigneCmdClient', async () => {
        const returnedFromService = Object.assign(
          {
            quantite: 1,
            prixUnitaire: 1,
            dateLivraisonPrevue: dayjs(currentDate).format(DATE_TIME_FORMAT),
            montantTotal: 1,
            commentaire: 'BBBBBB',
            statutCmd: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateLivraisonPrevue: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of LigneCmdClient', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a LigneCmdClient', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a LigneCmdClient', async () => {
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
