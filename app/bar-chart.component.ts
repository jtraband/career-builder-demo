import { Component, Input, OnInit, ElementRef }   from 'angular2/core';

import { GoogleChartService} from './google-chart.service';

@Component({
    selector: 'bar-chart',
    template: `<div id="chart"></div>`
})
export class BarChartComponent implements OnInit {
    constructor(private _chartService: GoogleChartService, private _elementRef: ElementRef) {
    }
    
    @Input() data: any; // google.visualization.DataTable;
    @Input() options: google.visualization.BarChartOptions;

    ngOnInit() {
        this._chartService.init().then( () => this.drawChart());
    }
    
    drawChart() {
        var div = this._elementRef.nativeElement.firstElementChild;
        var chart = new this._chartService.BarChart(div);
        chart.draw(this.data, this.options);
    }

}
