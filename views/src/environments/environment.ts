// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'https://staging-ssanotaai-api.herokuapp.com',
  moskit: 'https://moskit.herokuapp.com/auth/moskit',
  firebase: {
    apiKey: 'AIzaSyATcmFVuIq51Csk75VcQLWPdO-1FgOQSMY',
    authDomain: 'vendas-anotaai.firebaseapp.com',
    databaseURL: 'https://vendas-anotaai.firebaseio.com',
    projectId: 'vendas-anotaai',
    storageBucket: 'vendas-anotaai.appspot.com',
    messagingSenderId: '635630891816',
    appId: '1:635630891816:web:0f4c7913b608a8ff',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
