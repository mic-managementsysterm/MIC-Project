import { stringify } from 'qs';
import Config from './config';
import request from '@/utils/request';

// 患者
export async function queryVisit(params) {
  return request(`${Config.service}/visit/get/GetByKey?${stringify(params)}`);
}
export async function addOrUpdateVisit(params) {
  return request(`${Config.service}/visit/change/addOrUpdate`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    }
  });
}
export async function removeVisit(params) {
  return request(`${Config.service}/visit/delete/batchDelete`,{
    method: 'POST',
    body: {
      ...params
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
    traditional:true
  });
}

