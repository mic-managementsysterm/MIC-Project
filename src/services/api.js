import { stringify } from 'qs';
import request from '@/utils/request';
import Config from "./coustomApi/config";

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}


export async function queryDisease(params) {
  return request(`/api/disease?${stringify(params)}`);
}

export async function removeDisease(params) {
  return request('/api/disease', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addDisease(params) {
  return request('/api/disease', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateDisease(params = {}) {
  return request(`/api/disease?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}


export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`http://localhost:5010/visit/get/GetRespondentRecord?${stringify(params)}`,{
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

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function getAllQuestionnaire() {
  const path = `http://localhost:5010/questionnaire/get/getAll`;
  return request(path,{
    method: 'GET',
  });
}

export async function getAllGauge() {
  const path = `http://localhost:5010/gaugetable/get/lib`;
  return request(path,{
    method: 'GET',
  });
}

export async function getCognitionDetail(params) {
  const path = `http://localhost:5010/questionnairerecord/get/getById?${stringify(params)}`;
  return request(path,{
    method: 'GET',
  });
}

export async function getMMSEDetail(params) {
  const path = `http://localhost:5010/questionnairerecord/get/getById?${stringify(params)}`;
  return request(path,{
    method: 'GET',
  });
}

export async function getMOCADetail(params) {
  const path = `http://localhost:5010/questionnairerecord/get/getById?${stringify(params)}`;
  return request(path,{
    method: 'GET',
  });
}

export async function getDiagnosisDetail(params) {
  const path = `http://localhost:5010/medicalrecord/get/getById?${stringify(params)}`;
  return request(path,{
    method: 'GET',
  });
}

export async function getPhysicochemicalDetail(params) {
  const path = `http://localhost:5010/gaugerecord/get/getById?${stringify(params)}`;
  return request(path,{
    method: 'GET',
  });
}

export async function uploadMedical(params) {
  const path = `http://localhost:5010/medicalrecord/change/addOrUpdateRecord`;
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
  const path = `http://localhost:5010/user/change/login`;
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
  const path = `http://localhost:5010/medicalrecord/delete/delete`;
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
  const path = `http://localhost:5010/gaugerecord/delete/byId`;
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


