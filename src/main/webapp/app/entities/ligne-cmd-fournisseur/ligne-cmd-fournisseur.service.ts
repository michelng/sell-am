import axios from 'axios';

import { ILigneCmdFournisseur } from '@/shared/model/ligne-cmd-fournisseur.model';

const baseApiUrl = 'api/ligne-cmd-fournisseurs';

export default class LigneCmdFournisseurService {
  public find(id: number): Promise<ILigneCmdFournisseur> {
    return new Promise<ILigneCmdFournisseur>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: ILigneCmdFournisseur): Promise<ILigneCmdFournisseur> {
    return new Promise<ILigneCmdFournisseur>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(entity: ILigneCmdFournisseur): Promise<ILigneCmdFournisseur> {
    return new Promise<ILigneCmdFournisseur>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public partialUpdate(entity: ILigneCmdFournisseur): Promise<ILigneCmdFournisseur> {
    return new Promise<ILigneCmdFournisseur>((resolve, reject) => {
      axios
        .patch(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
