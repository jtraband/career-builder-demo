import { Injectable} from 'angular2/core';


@Injectable()
export class GoogleChartService {
    public google: any;
    public charts: any;
    private _initialized: boolean;
    
    constructor( ) {
        this.google = (<any> window).google;
        this.charts = this.google.charts;
        this.google.charts.load('current', {packages: ['corechart']});
        // Next line would be needed if you wanted to use Google's Material charts ( still in Beta)
        // alongside the 'classic' charts.
        // this.google.charts.load('current', {packages: ['corechart', 'bar']});
        

        this.google.charts.setOnLoadCallback(this.init.bind(this));
    }
    
    init(): Promise<any> {
       if (this._initialized) return Promise.resolve();
       return new Promise( (resolve, reject) => {
           this.google.charts.setOnLoadCallback(() => {
               resolve();
               this._initialized = true;
           })
       });
    }
    
    arrayToDataTable(arr: any[]) {
        return this.google.visualization.arrayToDataTable(arr);
    }
    
    get visualization() {
        this.checkInit();
        return this.google.visualization;
    }
    
    get DataTable() {
        this.checkInit();
        return this.google.visualization.DataTable;
    }
    
    get PieChart() {
        this.checkInit();
        return this.google.visualization.PieChart;
    }
    
    get BarChart() {
        this.checkInit();
        return this.google.visualization.BarChart;
    }
    
    get ColumnChart() {
        this.checkInit();
        return this.google.visualization.ColumnChart;
    }
    
    private checkInit() {
        if (!this._initialized) {
            throw new Error("You must call init() first.")
        }         
    }
    

} 