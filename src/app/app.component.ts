import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';


// TODO: 2. validation and error messages ?? we'll see 
// 4. sort by ...

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
