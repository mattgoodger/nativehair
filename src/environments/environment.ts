// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBfcLQGmGTjb9OsoxVE10hfp-kEzwmlHAM",
    authDomain: "nativehair-2018.firebaseapp.com",
    databaseURL: "https://nativehair-2018.firebaseio.com",
    projectId: "nativehair-2018",
    storageBucket: "nativehair-2018.appspot.com",
    messagingSenderId: "1013556241798"
  },
  social: {
    fblink: 'https://www.facebook.com/nativehair',
    iglink: 'https://www.instagram.com/nativehair'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
