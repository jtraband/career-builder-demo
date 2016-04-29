import {Component} from 'angular2/core';
import {GoogleChartService} from './google-chart.service';
import {PieChartComponent} from './pie-chart.component';
import {BarChartComponent} from './bar-chart.component';

@Component({
    selector: 'my-app',
    template: `
    <h1>Career Builder Chart Examples</h1>
    <pie-chart *ngIf="pieData" [data]="pieData" [options]="pieOptions"></pie-chart>
    <div id="pie-chart"></div>
    <bar-chart *ngIf="militaryBarData" [data]="militaryBarData" [options]="militaryBarOptions"></bar-chart>
    `,
    directives: [PieChartComponent, BarChartComponent]

})
export class AppComponent {
    private pieData: any;
    private pieOptions: any;
    private militaryBarData: any;
    private militaryBarOptions: any;

    constructor(private _chartService: GoogleChartService) {

    }

    ngOnInit() {
        this._chartService.init().then(() => {
            this.initPieData();
            this.drawPieChart();
            this.initMilitaryBarData();
        });
    }
    
    private initMilitaryBarData() {
        this.militaryBarData = this._chartService.visualization.arrayToDataTable([
            ['CountTitle', 'Count',  { role: 'annotation' } ],
            ['574', 574, 'Veteran' ],
            ['113', 113, 'No Obligation'],
            ['79', 79, 'Active Duty'],
            ['78', 78, 'Retired Military'],
            ['56', 56, 'Reserve Drilling'],
            ['45', 45, 'Inactive Reserve'],
            ['35', 35, 'National Guard-Drilling'],
            ['13', 35, 'Inactive National Guard'],
            ['10', 35, 'Unfilled'],
            ['4', 35, 'Filled']
            
        ]);
       this.militaryBarOptions = {
            'title': 'Military',
            'width': 400,
            'height': 400,
            'legend': 'none',
            'bar': {
                'groupWidth': '80%'
            }
        };
    }

    private initPieData() {
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

        this.pieOptions = {
            'title': 'Pizza Topping Popularity - using PieChartComponent',
            'width': 400,
            'height': 300
        };
    }

    drawPieChart() {
        // using the chartService directly
        var chart = new this._chartService.PieChart(document.getElementById('pie-chart'));
        var altPieOptions = {
            'title': 'Pizza Topping Popularity - using ChartService directly',
            'width': 400,
            'height': 300
        };
        chart.draw(this.pieData, altPieOptions);
    }


}

