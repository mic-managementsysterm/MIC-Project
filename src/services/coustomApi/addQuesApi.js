import { stringify } from 'qs';
import Config from './config';
import request from '@/utils/request';

// 新增问卷

export async function queryQues(params) {
  return request(`http://localhost:5010/questionnaire/get/getById?${stringify(params)}`);
}
export async function addOrUpdateQues(params) {
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

