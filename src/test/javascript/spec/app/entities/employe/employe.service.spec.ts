/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import EmployeService from '../../../......mainwebappapp/entities/employe/employe.service';
import { Employe } from '../../../......mainwebappapp/shared/model/employe.model';
import { StatutEmploi } from '@/shared/model/enumerations/statut-emploi.model';
import { Statut } from '@/shared/model/enumerations/statut.model';

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
  describe('Employe Service', () => {
    let service: EmployeService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new EmployeService();
      currentDate = new Date();
      elemDefault = new Employe(
        123,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'TEMPS_PLEIN',
        'ACTIF'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dateNaissance: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateEmbauche: dayjs(currentDate).format(DATE_TIME_FORMAT),
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

      it('should create a Employe', async () => {
        const returnedFromService = Object.assign(
          {
            id: 123,
            dateNaissance: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateEmbauche: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateNaissance: currentDate,
            dateEmbauche: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a Employe', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a Employe', async () => {
        const returnedFromService = Object.assign(
          {
            identifiant: 'BBBBBB',
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            dateNaissance: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateEmbauche: dayjs(currentDate).format(DATE_TIME_FORMAT),
            telephone1: 'BBBBBB',
            telephone2: 'BBBBBB',
            email: 'BBBBBB',
            salaire: 1,
            photo: 'BBBBBB',
            fonction: 'BBBBBB',
            statutEmploi: 'BBBBBB',
            statut: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaissance: currentDate,
            dateEmbauche: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a Employe', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a Employe', async () => {
        const patchObject = Object.assign(
          {
            identifiant: 'BBBBBB',
            prenom: 'BBBBBB',
            dateNaissance: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateEmbauche: dayjs(currentDate).format(DATE_TIME_FORMAT),
            telephone2: 'BBBBBB',
            email: 'BBBBBB',
            statutEmploi: 'BBBBBB',
          },
          new Employe()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateNaissance: currentDate,
            dateEmbauche: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a Employe', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of Employe', async () => {
        const returnedFromService = Object.assign(
          {
            identifiant: 'BBBBBB',
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            dateNaissance: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateEmbauche: dayjs(currentDate).format(DATE_TIME_FORMAT),
            telephone1: 'BBBBBB',
            telephone2: 'BBBBBB',
            email: 'BBBBBB',
            salaire: 1,
            photo: 'BBBBBB',
            fonction: 'BBBBBB',
            statutEmploi: 'BBBBBB',
            statut: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateNaissance: currentDate,
            dateEmbauche: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of Employe', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a Employe', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a Employe', async () => {
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
