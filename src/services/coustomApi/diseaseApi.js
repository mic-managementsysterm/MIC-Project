import { stringify } from 'qs';
import Config from './config';
import request from '@/utils/request';

// 疾病
export async function queryDisease(params) {
  // return request(`/Api/disease/get/find?${stringify(params)}`);
  return request(`${Config.service}/disease/get/find?${stringify(params)}`);
}
export async function addDisease(params) {
  return request(`${Config.service}/disease/change/add`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    }
  });
}
export async function updateDisease(params) {
  return request(`${Config.service}/disease/change/update`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    }
  });
}
export async function removeDisease(params) {
  return request(`${Config.service}/disease/delete/batchDelete`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    }
  });
}

// 疾病关联
export async function queryRelate(params) {
  return request(`${Config.service}/disease/get/findSyndromeById?${stringify(params)}`);
}
export async function queryRest(params) {
  return request(`${Config.service}/disease/get/findRestSyndrome?${stringify(params)}`);
}
export async function querySyndrome(params) {
  return request(`${Config.service}/syndrome/get/find?${stringify(params)}`);
}
export async function updateRelate(params) {
  return request(`${Config.service}/disease/change/addSyndrome`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    }
  });
}
