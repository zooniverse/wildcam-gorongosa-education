/*
Configuration Settings
----------------------

The config settings change depending on which environment the app is running in.
By default, this is the development environment, but this can be changed either by:

- An env query string, e.g. localhost?env=production
  (This changes the Panoptes JS Client does)
- The NODE_ENV environment variable on the system running the app.

 */

var DEFAULT_ENV = 'development';
var envFromBrowser = locationMatch(/\W?env=(\w+)/);
var envFromShell = process.env.NODE_ENV;
var env = envFromBrowser || envFromShell || DEFAULT_ENV;

if (!env.match(/^(production|staging|development)$/)) {
  throw new Error(`Error: Invalid Environment - ${envFromShell}`);
}

import { mergeDeep } from '../helpers';

const defaultConfig = {
  eduAPI: {
    assignments: 'assignments/',
    programs: 'programs/',
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
      root:'https://education-api-staging.zooniverse.org/',
      programId: '4'
    },
    routes: {
      root:'http://localhost:3000/'
    },
    panoptesAppId: '24ad5676d5d25c6aa850dc5d5f63ec8c03dbc7ae113b6442b8571fce6c5b974c',
    panoptesReturnUrl: 'http://localhost:3000/'
  },
  production: {
    eduAPI: {
      root: 'https://education-api.zooniverse.org/',
      programId: '' // TODO add program id for wildcam gorongosa when it exists in production
    },
    routes: {
      root: 'https://lab.wildcamgorongosa.org/'
    },
    panoptesAppId: '5de4d5dc1566a34e6ea1aafe18a6045f16af62bc58475cd23ed6c4b295425ae4',
    panoptesReturnUrl: 'https://lab.wildcamgorongosa.org/'
  }
};
envConfig.development = envConfig.staging;

export default mergeDeep(defaultConfig, envConfig[env]);
export { env };

// Try and match the location.search property against a regex. Basically mimics
// the CoffeeScript existential operator, in case we're not in a browser.
function locationMatch(regex) {
  var match;
  if (typeof location !== 'undefined' && location !== null) {
    match = location.search.match(regex);
  }
  return (match && match[1]) ? match[1] : undefined;
}
