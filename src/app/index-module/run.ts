/* @ngInject */

export function Run(Restangular:restangular.IService, API_CONFIG, $location) {
    Restangular.setBaseUrl(API_CONFIG.url);
    Restangular.setErrorInterceptor(function (resp) {
        if (resp.status === 404) {
            $location.path('/404');
        }
        return resp;
    });
}
