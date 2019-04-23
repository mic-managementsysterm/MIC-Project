import { stringify } from 'qs';
import request from '@/utils/request';

//登录
export async function login(params) {
  return request(`http://10.126.6.112:5010/user/change/login`,{
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
  return request(`http://10.126.6.112:5010/user/get/getInfo?${stringify(params)}`);
}

export async function changeInfo(params) {
  return request(`http://10.126.6.112:5010/user/change/editInfo`,{
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
  return request(`http://10.126.6.112:5010/user/change/passwd`,{
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
  return request(`http://10.126.6.112:5010/disease/get/findWithPrevalent?${stringify(params)}`);
}
//疾病或 症状
export async function queryDisAndSyn(params) {
  return request(`http://10.126.6.112:5010/disease/get/findInDisAndSyn?${stringify(params)}`);
}

export async function addDisease(params) {
  return request(`http://10.126.6.112:5010/disease/change/add`,{
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
  return request(`http://10.126.6.112:5010/disease/change/update`,{
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
  return request(`http://10.126.6.112:5010/disease/delete/batchDelete`,{
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
  return request(`http://10.126.6.112:5010/disease/get/findSyndromeById?${stringify(params)}`);
}

export async function updateRelate(params) {
  return request(`http://10.126.6.112:5010/disease/change/addSyndrome`,{
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
  return request(`http://10.126.6.112:5010/syndrome/get/find?${stringify(params)}`);
}

export async function addSyndrome(params) {
  return request(`http://10.126.6.112:5010/syndrome/change/add`,{
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
  return request(`http://10.126.6.112:5010/syndrome/change/update`,{
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
  return request(`http://10.126.6.112:5010/syndrome/delete/batchDelete`,{
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
  return request(`http://10.126.6.112:5010/syndrome/get/findSymptomById?${stringify(params)}`);
}

export async function updateRelateSym(params) {
  return request(`http://10.126.6.112:5010/syndrome/change/addSymptom`,{
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
  return request(`http://10.126.6.112:5010/symptom/get/findWithPrevalent?${stringify(params)}`);
}

export async function addSymptom(params) {
  return request(`http://10.126.6.112:5010/symptom/change/add`,{
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
  return request(`http://10.126.6.112:5010/symptom/change/update`,{
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
  return request(`http://10.126.6.112:5010/symptom/delete/batchDelete`,{
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


//类型
export async function querySearchSymType(params) {
  return request(`http://10.126.6.112:5010/symptomtype/get/getByTypeName?${stringify(params)}`);
}

export async function querySymType(params) {
  return request(`http://10.126.6.112:5010/symptomtype/get/getTypes?${stringify(params)}`);
}

export async function addSymType(params) {
  return request(`http://10.126.6.112:5010/symptomtype/change/addOrUpdateType`,{
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
  return request(`http://10.126.6.112:5010/symptomtype/delete/deleteTypes`,{
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
  return request(`http://10.126.6.112:5010/visit/get/GetByKey?${stringify(params)}`);
}

export async function addOrUpdateVisit(params) {
  return request(`http://10.126.6.112:5010/visit/change/addOrUpdate`,{
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
  return request(`http://10.126.6.112:5010/visit/delete/batchDelete`,{
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
  return request(`http://10.126.6.112:5010/visit/get/GetRespondentRecord?${stringify(params)}`);
}

export async function getCognitionDetail(params) {
  return request(`http://10.126.6.112:5010/questionnairerecord/get/getById?${stringify(params)}`);
}

export async function getMMSEDetail(params) {
  return request( `http://10.126.6.112:5010/questionnairerecord/get/getById?${stringify(params)}`);
}

export async function getMOCADetail(params) {
  return request(`http://10.126.6.112:5010/questionnairerecord/get/getById?${stringify(params)}`);
}

export async function getDiagnosisDetail(params) {
  return request(`http://10.126.6.112:5010/medicalrecord/get/getById?${stringify(params)}`);
}

export async function getPhysicochemicalDetail(params) {
  return request(`http://10.126.6.112:5010/gaugerecord/get/getById?${stringify(params)}`);
}

export async function uploadMedical(params) {
  return request(`http://10.126.6.112:5010/medicalrecord/change/addOrUpdateRecord`,{
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
  return request(`http://10.126.6.112:5010/symptom/get/findWithType?${stringify(params)}`);
}

export async function deleteMedical(params) {
  return request(`http://10.126.6.112:5010/medicalrecord/delete/delete`,{
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
  return request(`http://10.126.6.112:5010/gaugerecord/delete/byId`,{
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
  return request(`http://10.126.6.112:5010/questionnaire/get/getById?${stringify(Id)}`)
}

export async function getAllQuestionnaire() {
  return request(`http://10.126.6.112:5010/questionnaire/get/getAll`);
}

export async function changeQuestion(params) {
  return request(`http://10.126.6.112:5010/questionnaire/change/addOrUpdate`, {
    method: 'POST',
    body: { ...params.body },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

export async function deleteQuestion(Id) {
  return request(`http://10.126.6.112:5010/questionnaire/delete/delete`,{
    method:'POST',
    body:Id,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
}

export async function deleteQues(params) {
  return request(`http://10.126.6.112:5010/questionnairerecord/delete/delete`,{
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
  return request(`http://10.126.6.112:5010/questionnaire/get/getById?${stringify(params)}`);
}

export async function addOrUpdateQues(params) {
  return request(`http://10.126.6.112:5010/questionnairerecord/change/addOrUpdate`,{
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
  return request( `http://10.126.6.112:5010/gaugetable/get/lib`);
}

export async function getPhy(Id) {
  return request(`http://10.126.6.112:5010/gaugetable/get/getById?${stringify(Id)}`)
}

export async function changePhy(params) {
  return request(`http://10.126.6.112:5010/gaugetable/change/add`, {
    method: 'POST',
    body: { ...params.body },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

export async function deletePhy(params) {
  return request(`http://10.126.6.112:5010/gaugetable/delete/byId`,{
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
  return request(`http://10.126.6.112:5010/gaugetable/get/getById?${stringify(params)}`);
}

export async function addOrUpdatePhy(params) {
  return request(`http://10.126.6.112:5010/gaugerecord/change/add`,{
    method: 'POST',
    body: {
      ...params,
    },
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
  });
}
