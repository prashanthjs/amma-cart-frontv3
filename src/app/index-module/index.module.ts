/// <reference path="../../../.tmp/typings/tsd.d.ts" />
import {modulesAvailable} from './configs/modules-available';
import {AppLanguages} from './configs/app-languages';
import {googleChartApiConfig} from './configs/google-chart-api-config';
import { Config } from './config';
import {Run} from './run';
import {ToolbarController} from "./controllers/toolbar.controller";



declare var angularDragula: any;

module ammaCart {
  angular
    .module('ammaCart', modulesAvailable)
    .constant('APP_LANGUAGES', AppLanguages)
    .constant('API_CONFIG', {
      'url': 'http://localhost:5555'
    })
    .config(Config)
      .controller('ToolbarController', ToolbarController)
    .value('googleChartApiConfig', googleChartApiConfig)
    .run(Run);
}

