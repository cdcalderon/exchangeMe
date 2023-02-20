// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  stockMarketQuotesWithIndicatorsApiBaseUrl:
    'https://warm-journey-46979.herokuapp.com',
  //udfApiBaseUrl: 'http://localhost:50894',
  udfApiBaseUrl: 'https://investipsquotesgateway.azurewebsites.net',
  stockMarketUDFApiBaseUrl: 'https://enigmatic-waters-56889.herokuapp.com',
  investipsServerWebAPIBaseUrl: 'http://localhost:3308',
  investipsDotnetApi: 'http://investipsapi.azurewebsites.net',

  // udfApiBaseUrl: 'https://localhost:5002',

  // production: false,
  // stockMarketQuotesWithIndicatorsApiBaseUrl: 'http://localhost:4000',
  // stockMarketUDFApiBaseUrl: 'http://localhost:4600',
  // investipsServerWebAPIBaseUrl: 'http://localhost:3308',
  // investipsDotnetApi: 'http://investipsapi.azurewebsites.net'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
