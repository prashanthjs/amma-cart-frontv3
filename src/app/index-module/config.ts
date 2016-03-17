/* @ngInject */
export function Config($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider,
                       ChartJsProvider, $translateProvider, $translatePartialLoaderProvider,
                       APP_LANGUAGES, triLayoutProvider, $mdThemingProvider,
                       triThemingProvider, triSkinsProvider, triSettingsProvider
    , RestangularProvider:restangular.IProvider) {

    // 404 & 500 pages
    $stateProvider
        .state('404', {
            url: '/404',
            templateUrl: '404.tmpl.html',
            controllerAs: 'vm',
            controller: function ($state) {
                var vm = this;
                vm.goHome = function () {
                    $state.go('triangular.admin-default.dashboard-analytics');
                };
            }
        })

        .state('500', {
            url: '/500',
            templateUrl: '500.tmpl.html',
            controllerAs: 'vm',
            controller: function ($state) {
                var vm = this;
                vm.goHome = function () {
                    $state.go('triangular.admin-default.dashboard-analytics');
                };
            }
        });


    // set default routes when no path specified
    $urlRouterProvider.when('', '/dashboards/analytics');
    $urlRouterProvider.when('/', '/dashboards/analytics');
    $urlRouterProvider.otherwise('/404');


    // configure all charts to use material design colors
    ChartJsProvider.setOptions({
        colours: [
            '#4285F4',    // blue
            '#DB4437',    // red
            '#F4B400',    // yellow
            '#0F9D58',    // green
            '#AB47BC',    // purple
            '#00ACC1',    // light blue
            '#FF7043',    // orange
            '#9E9D24',    // browny yellow
            '#5C6BC0'     // dark blue
        ],
        responsive: true
    });


    /**
     *  each module loads its own translation file - making it easier to create translations
     *  also translations are not loaded when they aren't needed
     *  each module will have a il8n folder that will contain its translations
     */
    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '{part}/il8n/{lang}.json'
    });

    $translatePartialLoaderProvider.addPart('app/index-module');

    // make sure all values used in translate are sanitized for security
    $translateProvider.useSanitizeValueStrategy('sanitize');

    // cache translation files to save load on server
    $translateProvider.useLoaderCache(true);

    // setup available languages in translate
    var languageKeys = [];
    for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
        languageKeys.push(APP_LANGUAGES[lang].key);
    }

    /**
     *  try to detect the users language by checking the following
     *      navigator.language
     *      navigator.browserLanguage
     *      navigator.systemLanguage
     *      navigator.userLanguage
     */
    $translateProvider
        .registerAvailableLanguageKeys(languageKeys, {
            'en_US': 'en',
            'en_UK': 'en'
        })
        .use('en');

    // store the users language preference in a cookie
    $translateProvider.useLocalStorage();

    triLayoutProvider.setDefaultOption('toolbarSize', 'default');

    triLayoutProvider.setDefaultOption('toolbarShrink', false);

    triLayoutProvider.setDefaultOption('toolbarClass', '');

    triLayoutProvider.setDefaultOption('contentClass', '');

    triLayoutProvider.setDefaultOption('sideMenuSize', 'full');

    triLayoutProvider.setDefaultOption('showToolbar', true);

    triLayoutProvider.setDefaultOption('footer', true);

    /**
     *  PALETTES
     */
    $mdThemingProvider.definePalette('white', {
        '50': 'ffffff',
        '100': 'ffffff',
        '200': 'ffffff',
        '300': 'ffffff',
        '400': 'ffffff',
        '500': 'ffffff',
        '600': 'ffffff',
        '700': 'ffffff',
        '800': 'ffffff',
        '900': 'ffffff',
        'A100': 'ffffff',
        'A200': 'ffffff',
        'A400': 'ffffff',
        'A700': 'ffffff',
        'contrastDefaultColor': 'dark'
    });

    $mdThemingProvider.definePalette('black', {
        '50': 'e1e1e1',
        '100': 'b6b6b6',
        '200': '8c8c8c',
        '300': '646464',
        '400': '3a3a3a',
        '500': 'e1e1e1',
        '600': 'e1e1e1',
        '700': '232323',
        '800': '1a1a1a',
        '900': '121212',
        'A100': '3a3a3a',
        'A200': 'ffffff',
        'A400': 'ffffff',
        'A700': 'ffffff',
        'contrastDefaultColor': 'light'
    });

    var triCyanMap = $mdThemingProvider.extendPalette('cyan', {
        'contrastDefaultColor': 'light',
        'contrastLightColors': '500 700 800 900',
        'contrastStrongLightColors': '500 700 800 900'
    });

    // register the new color palette map with the name triCyan
    $mdThemingProvider.definePalette('triCyan', triCyanMap);

    /**
     *  SKINS
     */

        // cyan cloud skin
    triThemingProvider.theme('cyan')
        .primaryPalette('triCyan')
        .accentPalette('amber')
        .warnPalette('deep-orange');

    triThemingProvider.theme('white-cyan')
        .primaryPalette('white')
        .accentPalette('triCyan', {
            'default': '500'
        })
        .warnPalette('deep-orange');

    triSkinsProvider.skin('cyan-cloud', 'Cyan Cloud')
        .sidebarTheme('cyan')
        .toolbarTheme('white-cyan')
        .logoTheme('cyan')
        .contentTheme('cyan');

    // red dwarf skin
    triThemingProvider.theme('red')
        .primaryPalette('red')
        .accentPalette('amber')
        .warnPalette('purple');

    triThemingProvider.theme('white-red')
        .primaryPalette('white')
        .accentPalette('red', {
            'default': '500'
        })
        .warnPalette('purple');

    triSkinsProvider.skin('red-dwarf', 'Red Dwarf')
        .sidebarTheme('red')
        .toolbarTheme('white-red')
        .logoTheme('red')
        .contentTheme('red');

    // plumb purple skin
    triThemingProvider.theme('purple')
        .primaryPalette('purple')
        .accentPalette('deep-orange')
        .warnPalette('amber');

    triThemingProvider.theme('white-purple')
        .primaryPalette('white')
        .accentPalette('purple', {
            'default': '400'
        })
        .warnPalette('deep-orange');

    triSkinsProvider.skin('plumb-purple', 'Plumb Purple')
        .sidebarTheme('purple')
        .toolbarTheme('white-purple')
        .logoTheme('purple')
        .contentTheme('purple');

    // dark knight skin
    triThemingProvider.theme('dark')
        .primaryPalette('black', {
            'default': '300',
            'hue-1': '400'
        })
        .accentPalette('amber')
        .warnPalette('deep-orange')
        .backgroundPalette('black')
        .dark();

    triSkinsProvider.skin('dark-knight', 'Dark Knight')
        .sidebarTheme('dark')
        .toolbarTheme('dark')
        .logoTheme('dark')
        .contentTheme('dark');

    // battleship grey skin
    triThemingProvider.theme('blue-grey')
        .primaryPalette('blue-grey')
        .accentPalette('amber')
        .warnPalette('orange');

    triThemingProvider.theme('white-blue-grey')
        .primaryPalette('white')
        .accentPalette('blue-grey', {
            'default': '400'
        })
        .warnPalette('orange');

    triSkinsProvider.skin('battleship-grey', 'Battleship Grey')
        .sidebarTheme('blue-grey')
        .toolbarTheme('white-blue-grey')
        .logoTheme('blue-grey')
        .contentTheme('blue-grey');

    // zesty orange skin
    triThemingProvider.theme('orange')
        .primaryPalette('orange', {
            'default': '800'
        })
        .accentPalette('lime')
        .warnPalette('amber');

    triThemingProvider.theme('white-orange')
        .primaryPalette('white')
        .accentPalette('orange', {
            'default': '500'
        })
        .warnPalette('lime');

    triSkinsProvider.skin('zesty-orange', 'Zesty Orange')
        .sidebarTheme('orange')
        .toolbarTheme('white-orange')
        .logoTheme('orange')
        .contentTheme('orange');


    // indigo island skin
    triThemingProvider.theme('indigo')
        .primaryPalette('indigo', {
            'default': '600'
        })
        .accentPalette('red')
        .warnPalette('lime');

    triSkinsProvider.skin('indigo-island', 'Indigo Island')
        .sidebarTheme('indigo')
        .toolbarTheme('indigo')
        .logoTheme('indigo')
        .contentTheme('indigo');

    // kermit green skin
    triThemingProvider.theme('light-green')
        .primaryPalette('light-green', {
            'default': '400'
        })
        .accentPalette('amber')
        .warnPalette('deep-orange');

    triThemingProvider.theme('white-light-green')
        .primaryPalette('white')
        .accentPalette('light-green', {
            'default': '400'
        })
        .warnPalette('deep-orange');

    triSkinsProvider.skin('kermit-green', 'Kermit Green')
        .sidebarTheme('light-green')
        .toolbarTheme('white-light-green')
        .logoTheme('light-green')
        .contentTheme('light-green');


    /**
     *  FOR DEMO PURPOSES ALLOW SKIN TO BE SAVED IN A COOKIE
     *  This overrides any skin set in a call to triSkinsProvider.setSkin if there is a cookie
     *  REMOVE LINE BELOW FOR PRODUCTION SITE
     */
    triSkinsProvider.useSkinCookie(true);

    /**
     *  SET DEFAULT SKIN
     */
    triSkinsProvider.setSkin('cyan-cloud');


    var now = new Date();
    // set app name & logo (used in loader, sidemenu, footer, login pages, etc)
    triSettingsProvider.setName('Amma Cart');
    triSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' ammacart.com');
    triSettingsProvider.setLogo('assets/images/logo.png');
    // set current version of app (shown in footer)
    triSettingsProvider.setVersion('2.3.0');

    // setup available languages in triangular
    for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
        triSettingsProvider.addLanguage({
            name: APP_LANGUAGES[lang].name,
            key: APP_LANGUAGES[lang].key
        });
    }


    RestangularProvider.setRestangularFields({
        id: '_id'
    });
    RestangularProvider.addResponseInterceptor((data:any, operation:string, what:string, url:string) => {
        let extractedData;
        extractedData = data;
        if (operation === 'getList') {
            if (data._embedded && data._embedded.result) {
                extractedData = data._embedded.result;
            }
            if (data.meta) {
                extractedData.meta = data.meta;
            }
        }
        return extractedData;
    });

    RestangularProvider.addRequestInterceptor((element:any, operation:string, what:string, url:string) => {
        if (operation === 'put') {
            delete element._links;
            delete element.__v;
            delete element.createdAt;
            delete element.updatedAt;
            delete element.internal;
        }
        return element;
    });

}

