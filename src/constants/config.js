import { mergeDeep } from '../helpers';

const defaultConfig = {
  eduAPI: {
    assignments: 'assignments/',
    students: 'students/classrooms/',
    teachers: 'teachers/classrooms/',
    users: 'users/'
  },
  routes: {
    students: 'students/',
    loginPrompt: '/login'
  },

};

const envConfig = {
  staging: {
    eduAPI: {
      root:'https://education.staging.zooniverse.org/'
    },
    routes: {
      root:'http://localhost:3000/'
    },
    panoptesAppId: '24ad5676d5d25c6aa850dc5d5f63ec8c03dbc7ae113b6442b8571fce6c5b974c',
    panoptesReturnUrl: 'http://localhost:3000/'
  },
  production: {
    eduAPI: {
      root: 'https://education-api.zooniverse.org/'
    },
    routes: {
      root: 'https://lab.wildcamgorongosa.org/'
    },
    panoptesAppId: '5de4d5dc1566a34e6ea1aafe18a6045f16af62bc58475cd23ed6c4b295425ae4',
    panoptesReturnUrl: 'https://lab.wildcamgorongosa.org/'
  }
};

export default mergeDeep(defaultConfig, envConfig[process.env.NODE_ENV]);
