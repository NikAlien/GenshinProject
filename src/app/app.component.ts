import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, merge, of, Subscription, delay, Observable, throwError } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;
  errorMessge: string = 'Error accured: you are offline, please check for internet connection';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.checkNetworkStatus();
  }

  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }

  private checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        this.networkStatus = status;
        this.displayDiv();
      });
  }


  private displayDiv (): void {
    const divCenter = document.getElementById('center');
    const divErrorMessage = document.getElementById('errorMessage');
    if(this.networkStatus){
      console.log('Show div center');
      if(divErrorMessage)
        divErrorMessage.style.display = "none"; 
      if(divCenter)
        divCenter.style.display = "block";
      return;
    }
    console.log('Remove div center')
    if(divCenter)
      divCenter.style.display = "none"; 
    if(divErrorMessage)
      divErrorMessage.style.display = "block";
  }

}
