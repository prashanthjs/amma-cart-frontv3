/** @ngInject */
export function UserRestService(Restangular) {
  return Restangular.service('users');
}
