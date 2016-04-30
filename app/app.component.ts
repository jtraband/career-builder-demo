import {Component} from 'angular2/core';
import {GoogleChartService} from './google-chart.service';
import {PieChartComponent} from './pie-chart.component';
import {BarChartComponent} from './bar-chart.component';
import {ColumnChartComponent} from './column-chart.component';
import {LineChartComponent} from './line-chart.component';

@Component({
    selector: 'my-app',
    template: `
    <h1>Career Builder Chart Examples</h1>
    <column-chart *ngIf="topIndustriesData" [data]="topIndustriesData" [options]="topIndustriesOptions"></column-chart>
    <bar-chart *ngIf="militaryData" [data]="militaryData" [options]="militaryOptions"></bar-chart>
    <bar-chart *ngIf="companyData" [data]="companyData" [options]="companyOptions"></bar-chart>
    <line-chart *ngIf="lineData" [data]="lineData" [options]="lineOptions"></line-chart>
    <pie-chart *ngIf="pieData" [data]="pieData" [options]="pieOptions"></pie-chart>
    <div id="pie-chart"></div>
    `,
    directives: [PieChartComponent, BarChartComponent, ColumnChartComponent, LineChartComponent]

})
export class AppComponent {

    private militaryData: google.visualization.DataTable;
    private militaryOptions: google.visualization.BarChartOptions;
    
    private companyData: google.visualization.DataTable;
    private companyOptions: google.visualization.BarChartOptions;
    
    private topIndustriesData: google.visualization.DataTable;
    private topIndustriesOptions: google.visualization.ColumnChartOptions;
    
    private pieData: google.visualization.DataTable;
    private pieOptions: google.visualization.PieChartOptions;
    
    private lineData: google.visualization.DataTable;
    private lineOptions: google.visualization.LineChartOptions;

    // injects GoogleChartService
    constructor(private _chartService: GoogleChartService) {

    }

    ngOnInit() {
        this._chartService.init().then(() => {
            this.initMilitaryData();
            this.initCompanyData();
            this.initTopIndustriesData();
            this.initLineData();
            this.initPieData();
            this.drawPieChart();
        });
    }

    private initMilitaryData() {
        this.militaryData = this._chartService.arrayToDataTable([
            ['CountTitle', 'Count', { role: 'annotation' }],
            ['574', 574, 'Veteran'],
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
        this.militaryOptions = {
            title: 'Military',
            width: 400,
            height: 400,
            legend: 'none',  // suppress the legend for this one.
            bar: {
                groupWidth: '80%' // this controls how close together the bars are.
            }
        };
    }


    private initCompanyData() {
        // 1st col is y axis group labels
        // 2nd col is 'demand' value
        // 3rd col is 'demand' annotation ( to show value inside of bar)
        // 4th col is 'supply' value
        // 5th col is 'supply' annotation ( to show value inside of bar)
        this.companyData = this._chartService.arrayToDataTable([
            ['Year', 'Demand', { role: 'annotation' }, 'Supply', { role: 'annotation' }],
            ['2016', 12000, '12000', 9000, '9000'],
            ['2015', 6000, '6000', 5000, '5000'],
            ['2014', 2000, '2000', 1000, '1000'],
        ]);

        this.companyOptions = {
            title: 'Company',
            width: 400,
            height: 400,
            legend: 'bottom'
        }
    }

    private initTopIndustriesData() {
        this.topIndustriesData = this._chartService.arrayToDataTable([
            ['Title', 'General Medical', { role: 'annotation' }, 'Employment Planning', { role: 'annotation' }, 'Office Administration', { role: 'annotation' }],
            ['Total', 172561, '172,561', 264352, '264,352', 616402, '616,402'],
        ]);
        this.topIndustriesOptions = {
            title: 'Top Industries',
            width: 400,
            height: 400,
            annotations: { alwaysOutside: true }, // moves column annotations on top of the bars.
            targetAxisIndex: 1,
            legend: { position: 'top', maxLines: 6 },
        }
    }

    private initLineData() {
        this.lineData = this._chartService.arrayToDataTable([
            ['Year', 'Sales', 'Expenses'],
            ['2013', 1000, 400],
            ['2014', 1170, 460],
            ['2015', 660, 1120],
            ['2016', 1030, 540]
        ]);

        this.lineOptions = {
            title: 'Company Performance',
            width: 400,
            height: 400,
            // curveType: 'function',
            legend: { position: 'bottom' }
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

    private drawPieChart() {
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

