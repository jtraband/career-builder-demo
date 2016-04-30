import { Component, Input, OnInit, ElementRef }   from 'angular2/core';

import { GoogleChartService} from './google-chart.service';

@Component({
    selector: 'column-chart',
    template: `<div id="chart"></div>`
})
export class ColumnChartComponent implements OnInit {
    constructor(private _chartService: GoogleChartService, private _elementRef: ElementRef) {
    }
    
    @Input() data: any;
    @Input() options: google.visualization.ColumnChartOptions;

    ngOnInit() {
        this._chartService.init().then( () => this.drawChart());
    }
    
    drawChart() {
        var div = this._elementRef.nativeElement.firstElementChild;
        var chart = new this._chartService.ColumnChart(div);
        chart.draw(this.data, this.options);
    }

}
