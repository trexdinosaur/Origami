import * as types from './actionTypes';
import { addDeployed } from '../api/Nongh/addDeployed';
import { getDeployed } from '../api/Nongh/getDeployed';
import { modifyDeployed } from '../api/Nongh/modifyDeployed';
import { deleteDeployed } from '../api/Nongh/deleteDeployed';

export function updateNonGHDemoModelSuccess(model) {
  return { type: types.BUILD_NEW_NONGH_DEMO_MODEL_SUCCESS, model };
}

export function killNonGHDemoModelSuccess() {
  return { type: types.KILL_NONGH_DEMO_MODEL_SUCCESS };
}

export function addToDBNonGHDemoModel(newModelData) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      getDeployed(newModelData.userid, newModelData.id).then((data) => {
        if (JSON.parse(data).length > 0) {
          modifyDeployed(newModelData.userid, newModelData).then((data) => {
            resolve('dispatched nongh model update call');
          })
            .catch((err) => {
              reject('cannot dispatch nongh model update call, DB failed');
            });

        } else {
          addDeployed(newModelData.userid, newModelData).then((data) => {
            resolve('dispatched nongh model update call');
          })
            .catch((err) => {
              reject('cannot dispatch nongh model update call, DB failed');
            });
        }
      });
    });
  };
}

export function updateNonGHDemoModel(newModelData) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(updateNonGHDemoModelSuccess(newModelData));
      resolve('dispatched nongh model update call');
    });
  };
}

export function killNonGHDemoModel(userid, repoId) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      deleteDeployed(userid, repoId).then(() => {
        dispatch(killNonGHDemoModelSuccess());
        resolve('dispatched nongh demo kill call');
      })
        .catch((err) => {
          reject('cannot dispatch nongh demo kill call, DB failed');
        });
    });
  };
}
