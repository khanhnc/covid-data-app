import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-charts';

  constructor( ) {  
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    console.log(event)
  }
}
