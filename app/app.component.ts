import {Component} from 'angular2/core';
import {GoogleChartService} from './google-chart.service';
import {PieChartComponent} from './pie-chart.component';

@Component({
    selector: 'my-app',
    template: `
    <h1>Career Builder Chart Examples</h1>
    <div id="pie-chart"></div>
    <pie-chart *ngIf="pieData" [data]="pieData" [options]="pieOptions"></pie-chart>
    `,
    directives: [PieChartComponent]
    
})
export class AppComponent {
    private pieData: any;
    private pieOptions: any;
    
    constructor(private _chartService: GoogleChartService) {
 
    }
    
    ngOnInit() {
        this._chartService.init().then( () => {
            this.pieData = new this._chartService.DataTable();
            this.pieData.addColumn('string', 'Topping');
            this.pieData.addColumn('number', 'Slices');
            this.pieData.addRows([
            ['Mushrooms', 3],
            ['Onions', 1],
            ['Olives', 1],
            ['Zucchini', 1],
            ['Pepperoni', 2]
            ]);

            // Set chart options
            this.pieOptions = {'title':'Pizza Topping Popularity',
                        'width':400,
                        'height':300};

            this.drawPieChart();
        });
    }

    drawPieChart() {
        // using the chartService directly
        var chart = new this._chartService.PieChart(document.getElementById('pie-chart'));
        chart.draw(this.pieData, this.pieOptions);
    }
    
    drawPieChartWithDirective() {
        
    }
    

 }

