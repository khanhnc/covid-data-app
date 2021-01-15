import { AfterViewInit, Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Country } from '../model';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit  {
  
  testData = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    }
  ];
  countries: Country[] = [];
  currentDate : string = '';
  globalData: any;

  scaleData :any = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('https://api.covid19api.com/summary').toPromise().then((data: any) => {
    this.countries = data.Countries;
    this.globalData = data.Global;
    this.currentDate = data.Date;
    for (let i = 0; i <30; i ++) {
      this.scaleData.push({ name: this.countries[i].Country, value: this.countries[i].NewConfirmed });
    }   
    })
  }


}
