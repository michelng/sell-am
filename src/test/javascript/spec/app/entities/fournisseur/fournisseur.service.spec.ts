/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';

import FournisseurService from '../../../......mainwebappapp/entities/fournisseur/fournisseur.service';
import { Fournisseur } from '../../../......mainwebappapp/shared/model/fournisseur.model';
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
  describe('Fournisseur Service', () => {
    let service: FournisseurService;
    let elemDefault;

    beforeEach(() => {
      service = new FournisseurService();
      elemDefault = new Fournisseur(123, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'ACTIF');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
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

      it('should create a Fournisseur', async () => {
        const returnedFromService = Object.assign(
          {
            id: 123,
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a Fournisseur', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a Fournisseur', async () => {
        const returnedFromService = Object.assign(
          {
            identifiant: 'BBBBBB',
            nomResponsable: 'BBBBBB',
            raisonSociale: 'BBBBBB',
            telephone1: 'BBBBBB',
            telephone2: 'BBBBBB',
            email: 'BBBBBB',
            logo: 'BBBBBB',
            description: 'BBBBBB',
            statut: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a Fournisseur', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a Fournisseur', async () => {
        const patchObject = Object.assign(
          {
            identifiant: 'BBBBBB',
            nomResponsable: 'BBBBBB',
            telephone1: 'BBBBBB',
            logo: 'BBBBBB',
            statut: 'BBBBBB',
          },
          new Fournisseur()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a Fournisseur', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of Fournisseur', async () => {
        const returnedFromService = Object.assign(
          {
            identifiant: 'BBBBBB',
            nomResponsable: 'BBBBBB',
            raisonSociale: 'BBBBBB',
            telephone1: 'BBBBBB',
            telephone2: 'BBBBBB',
            email: 'BBBBBB',
            logo: 'BBBBBB',
            description: 'BBBBBB',
            statut: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of Fournisseur', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a Fournisseur', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a Fournisseur', async () => {
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
