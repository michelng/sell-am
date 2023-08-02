/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import MvtStckService from '../../../......mainwebappapp/entities/mvt-stck/mvt-stck.service';
import { MvtStck } from '../../../......mainwebappapp/shared/model/mvt-stck.model';
import { TypeMvt } from '@/shared/model/enumerations/type-mvt.model';

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
  describe('MvtStck Service', () => {
    let service: MvtStckService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new MvtStckService();
      currentDate = new Date();
      elemDefault = new MvtStck(123, currentDate, 0, 'ENTREE_DE_STOCK');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dateMvnt: dayjs(currentDate).format(DATE_TIME_FORMAT),
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

      it('should create a MvtStck', async () => {
        const returnedFromService = Object.assign(
          {
            id: 123,
            dateMvnt: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateMvnt: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a MvtStck', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a MvtStck', async () => {
        const returnedFromService = Object.assign(
          {
            dateMvnt: dayjs(currentDate).format(DATE_TIME_FORMAT),
            quantite: 1,
            typeMvt: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateMvnt: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a MvtStck', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a MvtStck', async () => {
        const patchObject = Object.assign(
          {
            dateMvnt: dayjs(currentDate).format(DATE_TIME_FORMAT),
            quantite: 1,
          },
          new MvtStck()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateMvnt: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a MvtStck', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of MvtStck', async () => {
        const returnedFromService = Object.assign(
          {
            dateMvnt: dayjs(currentDate).format(DATE_TIME_FORMAT),
            quantite: 1,
            typeMvt: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateMvnt: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of MvtStck', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a MvtStck', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a MvtStck', async () => {
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
