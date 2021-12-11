// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAXV99nrvheAI-U9oA5d2lE-7slQO7s0Q4",
    authDomain: "ingreso-egraso.firebaseapp.com",
    projectId: "ingreso-egraso",
    storageBucket: "ingreso-egraso.appspot.com",
    messagingSenderId: "512659608156",
    appId: "1:512659608156:web:749caa0d641436e98f8c99",
    measurementId: "${config.measurementId}"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
