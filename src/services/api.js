import { stringify } from 'qs';
import request from '@/utils/request';
import { service } from './config'

// 登录
export async function login(params) {
  return request(`${service}/user/change/login`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}

export async function queryUser(params) {
  return request(`${service}/user/get/getInfo?${stringify(params)}`);
}

export async function changeInfo(params) {
  return request(`${service}/user/change/editInfo`,{
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
  return request(`${service}/user/change/passwd`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}

// 疾病
export async function queryDisease(params) {
  return request(`${service}/disease/get/findWithPrevalent?${stringify(params)}`);
}
//疾病或 症状
export async function queryDisAndSyn(params) {
  return request(`${service}/disease/get/findInDisAndSyn?${stringify(params)}`);
}

export async function addDisease(params) {
  return request(`${service}/disease/change/add`,{
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
  return request(`${service}/disease/change/update`,{
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
  return request(`${service}/disease/delete/batchDelete`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
    traditional:true
  });
}

// 疾病关联
export async function queryRelate(params) {
  return request(`${service}/disease/get/findSyndromeById?${stringify(params)}`);
}

export async function updateRelate(params) {
  return request(`${service}/disease/change/addSyndrome`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
    traditional:true
  });
}


// 证型
export async function querySyndrome(params) {
  return request(`${service}/syndrome/get/find?${stringify(params)}`);
}

export async function addSyndrome(params) {
  return request(`${service}/syndrome/change/add`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    }
  });
}

export async function updateSyndrome(params) {
  return request(`${service}/syndrome/change/update`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    }
  });
}

export async function removeSyndrome(params) {
  return request(`${service}/syndrome/delete/batchDelete`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
    traditional:true
  });
}

// 证型关联
export async function queryRelateSym(params) {
  return request(`${service}/syndrome/get/findSymptomById?${stringify(params)}`);
}

export async function updateRelateSym(params) {
  return request(`${service}/syndrome/change/addSymptom`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
    traditional:true
  });
}


// 症状
export async function querySymptom(params) {
  return request(`${service}/symptom/get/findWithPrevalent?${stringify(params)}`);
}

export async function findSymptom(params) {
  return request(`${service}/symptom/get/find?${stringify(params)}`);
}

export async function addSymptom(params) {
  return request(`${service}/symptom/change/add`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    }
  });
}

export async function updateSymptom(params) {
  return request(`${service}/symptom/change/update`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    }
  });
}

export async function removeSymptom(params) {
  return request(`${service}/symptom/delete/batchDelete`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
    traditional:true
  });
}


// 类型
export async function querySearchSymType(params) {
  return request(`${service}/symptomtype/get/getByTypeName?${stringify(params)}`);
}

export async function querySymType(params) {
  return request(`${service}/symptomtype/get/getTypes?${stringify(params)}`);
}

export async function addSymType(params) {
  return request(`${service}/symptomtype/change/addOrUpdateType`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    }
  });
}

export async function removeSymType(params) {
  return request(`${service}/symptomtype/delete/deleteTypes`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
    traditional:true
  });
}

export async function queryRelateSymptom(params) {
  return request(`${service}/symptom/get/getRelateType?${stringify(params)}`)
}

export async function queryRestSymptom(params) {
  return request(`${service}/symptom/get/getRestType?${stringify(params)}`)
}

export async function updateRelateSymptom(params) {
  return request(`${service}/symptomtype/change/addOrUpdateRelationship`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
    traditional:true
  });
}

// 患者
export async function queryVisit(params) {
  return request(`${service}/visit/get/GetByKey?${stringify(params)}`);
}

export async function addOrUpdateVisit(params) {
  return request(`${service}/visit/change/addOrUpdate`,{
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
  return request(`${service}/visit/delete/batchDelete`,{
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

export async function queryFakeList(params) {
  return request(`${service}/visit/get/GetRespondentRecord?${stringify(params)}`);
}

export async function getCognitionDetail(params) {
  return request(`${service}/questionnairerecord/get/getById?${stringify(params)}`);
}

export async function getMMSEDetail(params) {
  return request( `${service}/questionnairerecord/get/getById?${stringify(params)}`);
}

export async function getMOCADetail(params) {
  return request(`${service}/questionnairerecord/get/getById?${stringify(params)}`);
}

export async function getDiagnosisDetail(params) {
  return request(`${service}/medicalrecord/get/getById?${stringify(params)}`);
}

export async function getPhysicochemicalDetail(params) {
  return request(`${service}/gaugerecord/get/getById?${stringify(params)}`);
}

export async function uploadMedical(params) {
  return request(`${service}/medicalrecord/change/addOrUpdateRecord`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}

export async function getSymByType(params) {
  return request(`${service}/symptom/get/findWithType?${stringify(params)}`);
}

export async function deleteMedical(params) {
  return request(`${service}/medicalrecord/delete/delete`,{
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
  return request(`${service}/gaugerecord/delete/byId`,{
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
  return request(`${service}/questionnaire/get/getById?${stringify(Id)}`)
}

export async function getAllQuestionnaire() {
  return request(`${service}/questionnaire/get/getAll`);
}

export async function changeQuestion(params) {
  return request(`${service}/questionnaire/change/addOrUpdate`, {
    method: 'POST',
    body: { ...params.body },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

export async function deleteQuestion(Id) {
  return request(`${service}/questionnaire/delete/delete`,{
    method:'POST',
    body:Id,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
}

export async function deleteQues(params) {
  return request(`${service}/questionnairerecord/delete/delete`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}

export async function queryQues(params) {
  return request(`${service}/questionnaire/get/getById?${stringify(params)}`);
}

export async function addOrUpdateQues(params) {
  return request(`${service}/questionnairerecord/change/addOrUpdate`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}

export async function getAllGauge() {
  return request( `${service}/gaugetable/get/lib`);
}

export async function getPhy(Id) {
  return request(`${service}/gaugetable/get/getById?${stringify(Id)}`)
}

export async function changePhy(params) {
  return request(`${service}/gaugetable/change/add`, {
    method: 'POST',
    body: { ...params.body },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

export async function deletePhy(params) {
  return request(`${service}/gaugetable/delete/byId`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}

export async function queryPhy(params) {
  return request(`${service}/gaugetable/get/getById?${stringify(params)}`);
}

export async function addOrUpdatePhy(params) {
  return request(`${service}/gaugerecord/change/add`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}

export async function addOrUpdatePic(params) {
  return request(`${service}/file/upload/image`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}
