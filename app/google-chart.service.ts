import { Injectable} from 'angular2/core';


@Injectable()
export class GoogleChartService {
    // 'google' is a global namespace var here because it is brought in by the Google visualization d.ts file in 
    // the typings folder.
    
    // Google visualization d.ts does not have this defined 
    private _charts: any;
    private _initialized: boolean;
    
    constructor( ) {
        this._charts = (<any> google).charts;
        this._charts.load('current', {packages: ['corechart']});
        this._charts.setOnLoadCallback( () => this._initialized = true);
    }
    
    init(): Promise<any> {
       if (this._initialized) return Promise.resolve();
       return new Promise( (resolve, reject) => {
           this._charts.setOnLoadCallback(() => {
               this._initialized = true;
               resolve();
           })
       });
    }
    
    arrayToDataTable(arr: any[]) {
        this.checkInit();
        return google.visualization.arrayToDataTable(arr);
    }
    
    get DataTable() {
        this.checkInit();
        return google.visualization.DataTable;
    }
    
    get PieChart() {
        this.checkInit();
        return google.visualization.PieChart;
    }
    
    get BarChart() {
        this.checkInit();
        return google.visualization.BarChart;
    }
    
    get ColumnChart() {
        this.checkInit();
        return google.visualization.ColumnChart;
    }
    
    get LineChart() {
        this.checkInit();
        return google.visualization.LineChart;
    }
    
    get visualization() {
        this.checkInit();
        return google.visualization;
    }
    
    private checkInit() {
        if (!this._initialized) {
            throw new Error("You must call init() first.")
        }         
    }
    

} 