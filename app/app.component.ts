import {Component} from 'angular2/core';
import {GoogleChartService} from './google-chart.service';
import {PieChartComponent} from './pie-chart.component';
import {BarChartComponent} from './bar-chart.component';

@Component({
    selector: 'my-app',
    template: `
    <h1>Career Builder Chart Examples</h1>
    <bar-chart *ngIf="militaryBarData" [data]="militaryBarData" [options]="militaryBarOptions"></bar-chart>
    <bar-chart *ngIf="companyBarData" [data]="companyBarData" [options]="companyBarOptions"></bar-chart>
    <pie-chart *ngIf="pieData" [data]="pieData" [options]="pieOptions"></pie-chart>
    <div id="pie-chart"></div>
    `,
    directives: [PieChartComponent, BarChartComponent]

})
export class AppComponent {
    private pieData: any;
    private pieOptions: any;
    private militaryBarData: any;
    private militaryBarOptions: any;
    private companyBarData: any;
    private companyBarOptions: any;
    private topIndustriesBarData: any;
    private topIndustriesBarOptions: any;

    constructor(private _chartService: GoogleChartService) {

    }

    ngOnInit() {
        this._chartService.init().then(() => {
            this.initPieData();
            this.drawPieChart();
            this.initMilitaryBarData();
            this.initCompanyBarData();
        });
    }
    
    private initTopIndustriesBarData() {
        
    }
    
    private initCompanyBarData() {
        // 1st col is y axis group labels
        // 2nd col is 'demand' value
        // 3rd col is 'demand' annotation ( to show value inside of bar)
        // 4th col is 'supply' value
        // 5th col is 'supply' annotation ( to show value inside of bar)
        this.companyBarData = this._chartService.arrayToDataTable([
          ['Year', 'Demand', { role: 'annotation' }, 'Supply', {role: 'annotation'}],
          ['2016', 12000, '12000', 9000, '9000'],
          ['2015', 6000, '6000', 5000, '5000'],
          ['2014', 2000, '2000', 1000, '1000'],
        ]);
       
        this.companyBarOptions =  {
            'title': 'Company',
            'width': 400,
            'height': 400,
            'legend': 'bottom'
        }
    }
    
    private initMilitaryBarData() {
        this.militaryBarData = this._chartService.arrayToDataTable([
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
            'legend': 'none',  // suppress the legend for this one.
            'bar': {
                'groupWidth': '80%' // this controls how close together the bars are.
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

