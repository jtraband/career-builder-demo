import { Component, Input, OnInit, ElementRef }   from 'angular2/core';

import { GoogleChartService} from './google-chart.service';

@Component({
    selector: 'pie-chart',
    template: `<div id="chart"></div>`
})
export class PieChartComponent implements OnInit {
    constructor(private _chartService: GoogleChartService, private _elementRef: ElementRef) {
    }
    
    @Input() data: any; // DataTable
    @Input() options: google.visualization.PieChartOptions;

    ngOnInit() {
        this._chartService.init().then( () => this.drawChart());
    }
    
    drawChart() {
        var div = this._elementRef.nativeElement.firstElementChild;
        var chart = new this._chartService.PieChart(div);
        chart.draw(this.data, this.options);
    }

}
