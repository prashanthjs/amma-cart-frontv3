import {Config} from './config';
import {SeedPageController} from './seed-page.controller';
import {SampleGridService} from './services/sample-grid.service';
import {SampleRestService} from './services/sample-rest.service';
export module seedModule {
  angular
    .module('seed-module', ['kendo.directives'])
    .config(Config)
    .controller('SeedPageController', SeedPageController)
    .service('SampleRest', SampleRestService);
}

