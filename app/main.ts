import {bootstrap}    from 'angular2/platform/browser';

import {AppComponent} from './app.component';
import {GoogleChartService} from './google-chart.service';

bootstrap(AppComponent, [GoogleChartService]);
