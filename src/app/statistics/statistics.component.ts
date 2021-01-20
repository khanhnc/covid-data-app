import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LineChartComponent, LineSeriesComponent } from '@swimlane/ngx-charts';
import { Country, APCovidData, APPlotData } from '../model';




@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @ViewChild('chart') chart: LineChartComponent

  view: any[] = [1000, 500];
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Number of Cases';
  timeline: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  intervall: number;
  isLoaded: boolean =  false;
  countries: Country[] = [];
  dataByCountry: APCovidData = {};
  plotData: APPlotData[] = [];
  results = [];

  constructor(private httpClient: HttpClient) { 
    this.plotData.push({name: 'Confirmed Cases', series:[]});    
  }

  ngOnInit(): void {
    this.httpClient.get('https://corona-api.com/countries').toPromise().then((resData: any) => {
    resData.data.map((d: any) => {
      this.countries.push({name: d.name, code: d.code});
      })
    })
  }

  selectionChanged(event: any){
    this.isLoaded = false;
    if(!event) {
      return;
    } else {
      this.httpClient.get(`https://corona-api.com/countries/${event.value}`).subscribe((res: any) => {
        this.dataByCountry = res.data;
        console.log(this.dataByCountry, res.data.timeline.length)
        if(res.data.timeline.length > 0) {
          this.calculateAllDataByDay(res.data.timeline.length);
         this.isLoaded = true;
          console.log(this.plotData)
        } else {
          this.isLoaded = false;
        }
      })
    }
  }

  calculateAllDataByDay(n :number) {
    this.plotData[0].series = [];
    for (let i = this.dataByCountry.timeline.length -1 ; i > this.dataByCountry.timeline.length-n ; i --) {
      this.plotData[0].series.push({name: this.dataByCountry.timeline[i].updated_at, 
        value: this.dataByCountry.timeline[i].confirmed })
    }
    this.results = [...this.plotData];
  }

  changeIntervall(){
    if(!this.intervall) {
      this.calculateAllDataByDay(this.dataByCountry.timeline?.length);
    }
    if(this.intervall > this.dataByCountry.timeline?.length) {
      return;
    }else {
      this.calculateAllDataByDay(this.intervall);
      console.log(this.plotData, this.chart)
    }
  }

}
