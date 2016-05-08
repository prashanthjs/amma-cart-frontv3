export const route = {
    authentication: {
        abstract: true,
        templateUrl: 'app/auth/views/auth.layout.html'
    },
    'authentication.login': {
        url: '/login',
        templateUrl: 'app/auth/views/auth.login.html',
        controller: 'AuthLoginController',
        controllerAs: 'authLoginController'
    },
    'authentication.logout': {
        url: '/logout',
        template: '',
        controller: 'AuthLogoutController',
    },
};
