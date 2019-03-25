import { stringify } from 'qs';
import request from '@/utils/request';
import Config from './config';


export async function queryFakeList(params) {
  return request(`/Api/visit/get/GetRespondentRecord?${stringify(params)}`,{
    // body: params,
    // method: 'GET',
  });
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}



export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}


export async function getAllGauge() {
  const path = `/Api/gaugetable/get/lib`;
  return request(path,{
    method: 'GET',
  });
}

export async function getCognitionDetail(params) {
  const path = `/Api/questionnairerecord/get/getById?${stringify(params)}`;
  return request(path,{
    method: 'GET',
  });
}

export async function getMMSEDetail(params) {
  const path = `/Api/questionnairerecord/get/getById?${stringify(params)}`;
  return request(path,{
    method: 'GET',
  });
}

export async function getMOCADetail(params) {
  const path = `/Api/questionnairerecord/get/getById?${stringify(params)}`;
  return request(path,{
    method: 'GET',
  });
}

export async function getDiagnosisDetail(params) {
  const path = `/Api/medicalrecord/get/getById?${stringify(params)}`;
  return request(path,{
    method: 'GET',
  });
}

export async function getPhysicochemicalDetail(params) {
  const path = `/Api/gaugerecord/get/getById?${stringify(params)}`;
  return request(path,{
    method: 'GET',
  });
}

export async function uploadMedical(params) {
  const path = `/Api/medicalrecord/change/addOrUpdateRecord`;
  return request(path,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}

export async function login(params) {
  const path = `/Api/user/change/login`;
  return request(path,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}
export async function deleteMedical(params) {
  const path = `/Api/medicalrecord/delete/delete`;
  return request(path,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}
export async function deleteGauge(params) {
  const path = `/Api/gaugerecord/delete/byId`;
  return request(path,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}
export async function getQuestion(Id) {
  const path = `/Api/questionnaire/get/getById?${stringify(Id)}`;
  return request(path)
}

export async function getAllQuestionnaire() {
  const path = `/Api/questionnaire/get/getAll`;
  return request(path);
}


export async function changeQuestion(params) {
  const path=`/Api/questionnaire/change/addOrUpdate`;
  return request(path, {
    method: 'POST',
    body: { ...params.body },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

export async function deleteQuestion(Id) {
  const path=`/Api/questionnaire/delete/delete`;
  return request(path,{
    method:'POST',
    body:Id,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
}
export async function deleteQues(params) {
  const path = `http://localhost:5010/questionnairerecord/delete/delete`;
  return request(path,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}


