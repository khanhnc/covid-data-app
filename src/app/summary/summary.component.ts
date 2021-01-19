import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Country } from '../model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit  {
  
  countries: Country[] = [];
  currentDate : string = '';
  globalData: any;
  scaleData :any = [];
  dataSource : Country [] = []; 
  displayedColumns: string[] = ['name', 'newConfirmed', 'newDeaths', 'newRecovered', 'totalConfirmed', 'totalDeaths', 'totalRevored'];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('https://api.covid19api.com/summary').toPromise().then((data: any) => {
    this.countries = data.Countries;
    this.globalData = data.Global;
    this.currentDate = data.Date;
    this.dataSource = data.Countries;
    console.log(data)
    })
  }
}
