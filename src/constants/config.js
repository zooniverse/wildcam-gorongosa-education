import { mergeDeep } from '../helpers';

const defaultConfig = {
  eduAPI: {
    students: 'students/classrooms/',
    teachers: 'teachers/classrooms/',
    users: 'users/'
  },
  routes: {
    students: 'students/classrooms/',
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
      root: 'https://learn.wildcamgorongosa.org/'
    },
    panoptesAppId: '442c8c4910fbb9be14bd9a92ee6e14ad29159d0217d0345fd9b2db3d881c4a7d',
    panoptesReturnUrl: 'https://learn.wildcamgorongosa.org/'
  }
};

export default mergeDeep(defaultConfig, envConfig[process.env.NODE_ENV]);
