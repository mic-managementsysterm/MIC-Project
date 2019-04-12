export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/disease/disease-list' },
      // 疾病管理
      {
        path: '/disease',
        icon: 'table',
        name: 'disease',
        routes: [
          {
            path: '/disease/disease-list',
            name: 'diseaseList',
            component: './Disease/Disease',
          },
          {
            path: '/disease/syndrome-list',
            name: 'syndromeList',
            component: './Disease/Syndrome',
          },
          {
            path: '/disease/symptom-list',
            name: 'symptomList',
            component: './Disease/Symptom',
          },
        ],
      },
      //量表管理
      {
        path: '/gauge',
        icon: 'profile',
        name: 'gauge',
        routes: [
          {
            path: '/gauge/question-list',
            name: 'question',
            component: './Gauge/Question',
          },
          {
            path: '/gauge/question-list/questionEdit-list',
            hideInMenu:true,
            name: 'questionEdit',
            component: './Gauge/QuestionEdit',
          },
        ],
      },
      //理化单管理
      {
        path: '/phy',
        icon: 'form',
        name: 'phy',
        routes: [
          {
            path: '/phy/phy-list',
            name: 'phy',
            component: './Phy/Phy',
          },
          {
            path: '/phy/phy-list/phyAdd-list',
            hideInMenu:true,
            name: 'phyAdd',
            component: './Phy/PhyEdit',
          },
          {
            path: '/phy/phy-list/phyEdit-list',
            hideInMenu:true,
            name: 'phyEdit',
            component: './Phy/PhyEdit',
          },
        ],
      },
      //受访者管理
      {
        path: '/respondent',
        icon: 'user',
        name: 'respondent',
        routes: [
          {
            path: '/respondent/respondent-list',
            name: 'respondentList',
            component: './Respondent/Respondent',
          },
          {
            path: '/respondent/respondent-list/respondent-record',
            name: 'respondentRecord',
            component: './Respondent/RespondentRecord',
            hideInMenu:true,
          },
          {
            path: '/respondent/respondent-list/respondent-record/four-dagnostic',
            name: 'fourDagnostic',
            component: './Respondent/Detail/FourDagnostic',
            hideInMenu:true,
          },
          {
            path: '/respondent/respondent-list/respondent-record/Physicochemical',
            name: 'physicochemical',
            component: './Respondent/Detail/Physicochemical',
            hideInMenu:true,
          },
          {
            path: '/respondent/respondent-list/respondent-record/cognition',
            name: 'cognition',
            component: './Respondent/Detail/Cognition',
            hideInMenu:true,
          },
          {
            path: '/respondent/respondent-list/respondent-record/MMSE',
            name: 'mmse',
            component: './Respondent/Detail/MMSE',
            hideInMenu:true,
          },
          {
            path: '/respondent/respondent-list/respondent-record/moca',
            name: 'moca',
            component: './Respondent/Detail/MOCA',
            hideInMenu:true,
          },
          {
            path: '/respondent/respondent-list/respondent-record/add-record',
            name: 'addRecord',
            component: './Respondent/AddRecord',
            hideInMenu:true,
          },
          {
            path: '/respondent/respondent-list/respondent-record/add-record/diagnosis',
            name: 'diagnosis',
            component: './AddRecord/Diagnosis',
            hideInMenu:true,
          },
          {
            path: '/respondent/respondent-list/respondent-record/add-record/physiology',
            name: 'physiology',
            component: './AddRecord/Physiology',
            hideInMenu:true,
          },
          {
            path: '/respondent/respondent-list/respondent-record/add-record/add-questionnaire',
            name: 'addQuestionnaire',
            component: './AddRecord/AddQuestionnaire',
            hideInMenu:true,
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        hideInMenu: true,
        routes: [
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
