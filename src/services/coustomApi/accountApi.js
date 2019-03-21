import { stringify } from 'qs';
import Config from './config';
import request from '@/utils/request';

// 新增问卷

export async function queryUser(params) {
  return request(`${Config.service}/user/get/getInfo?${stringify(params)}`);
}
export async function changeInfo(params) {
  return request(`${Config.service}/user/change/editInfo`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}
export async function changePwd(params) {
  return request(`${Config.service}/user/change/passwd`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}

