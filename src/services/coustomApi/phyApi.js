import { stringify } from 'qs';
import Config from './config';
import request from '@/utils/request';

// 新增问卷

export async function queryPhy(params) {
  return request(`http://localhost:5010/gaugetable/get/getById?${stringify(params)}`);
}
export async function addOrUpdatePhy(params) {
  return request(`${Config.service}/gaugerecord/change/add`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}

