import { stringify } from 'qs';
import request from '@/utils/request';

//登录
export async function login(params) {
  return request(`/Api/user/change/login`,{
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
  return request(`/Api/user/get/getInfo?${stringify(params)}`);
}

export async function changeInfo(params) {
  return request(`/Api/user/change/editInfo`,{
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
  return request(`/Api/user/change/passwd`,{
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
  return request(`/Api/disease/get/find?${stringify(params)}`);
}

export async function addDisease(params) {
  return request(`/Api/disease/change/add`,{
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
  return request(`/Api/disease/change/update`,{
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
  return request(`/Api/disease/delete/batchDelete`,{
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
  return request(`/Api/disease/get/findSyndromeById?${stringify(params)}`);
}

export async function updateRelate(params) {
  return request(`/Api/disease/change/addSyndrome`,{
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
  return request(`/Api/syndrome/get/find?${stringify(params)}`);
}

export async function addSyndrome(params) {
  return request(`/Api/syndrome/change/add`,{
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
  return request(`/Api/syndrome/change/update`,{
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
  return request(`/Api/syndrome/delete/batchDelete`,{
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
  return request(`/Api/syndrome/get/findSymptomById?${stringify(params)}`);
}

export async function updateRelateSym(params) {
  return request(`/Api/syndrome/change/addSymptom`,{
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
  return request(`/Api/symptom/get/find?${stringify(params)}`);
}

export async function addSymptom(params) {
  return request(`/Api/symptom/change/add`,{
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
  return request(`/Api/symptom/change/update`,{
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
  return request(`/Api/symptom/delete/batchDelete`,{
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
  return request(`/Api/visit/get/GetByKey?${stringify(params)}`);
}

export async function addOrUpdateVisit(params) {
  return request(`/Api/visit/change/addOrUpdate`,{
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
  return request(`/Api/visit/delete/batchDelete`,{
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
  return request(`/Api/visit/get/GetRespondentRecord?${stringify(params)}`);
}

export async function getAllGauge() {
  return request( `/Api/gaugetable/get/lib`);
}

export async function getCognitionDetail(params) {
  return request(`/Api/questionnairerecord/get/getById?${stringify(params)}`);
}

export async function getMMSEDetail(params) {
  return request( `/Api/questionnairerecord/get/getById?${stringify(params)}`);
}

export async function getMOCADetail(params) {
  return request(`/Api/questionnairerecord/get/getById?${stringify(params)}`);
}

export async function getDiagnosisDetail(params) {
  return request(`/Api/medicalrecord/get/getById?${stringify(params)}`);
}

export async function getPhysicochemicalDetail(params) {
  return request(`/Api/gaugerecord/get/getById?${stringify(params)}`);
}

export async function uploadMedical(params) {
  return request(`/Api/medicalrecord/change/addOrUpdateRecord`,{
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
  return request(`/Api/symptom/get/findWithType?${stringify(params)}`);
}

export async function deleteMedical(params) {
  return request(`/Api/medicalrecord/delete/delete`,{
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
  return request(`/Api/gaugerecord/delete/byId`,{
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
  return request(`/Api/questionnaire/get/getById?${stringify(Id)}`)
}

export async function getAllQuestionnaire() {
  return request(`/Api/questionnaire/get/getAll`);
}

export async function changeQuestion(params) {
  return request(`/Api/questionnaire/change/addOrUpdate`, {
    method: 'POST',
    body: { ...params.body },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

export async function deleteQuestion(Id) {
  return request(`/Api/questionnaire/delete/delete`,{
    method:'POST',
    body:Id,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
}

export async function deleteQues(params) {
  return request(`/Api/questionnairerecord/delete/delete`,{
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
  return request(`/Api/questionnaire/get/getById?${stringify(params)}`);
}

export async function addOrUpdateQues(params) {
  return request(`/Api/questionnairerecord/change/addOrUpdate`,{
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
  return request(`/Api/gaugetable/get/getById?${stringify(params)}`);
}

export async function addOrUpdatePhy(params) {
  return request(`/Api/gaugerecord/change/add`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}
