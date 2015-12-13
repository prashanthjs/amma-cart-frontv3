/* @ngInject */

export function Run(Restangular: restangular.IService, API_CONFIG) {
  Restangular.setBaseUrl(API_CONFIG.url);
}
