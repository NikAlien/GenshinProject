import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, merge, of, Subscription, delay, Observable, throwError, retry } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { catchError, map, repeat } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  networkStatus: boolean = false;
  backEndStatus: boolean = true;
  networkStatus$: Subscription = Subscription.EMPTY;
  errorMessge: string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.checkBackEndStatus();
    this.checkNetworkStatus();
  }

  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }

  private backEndChecker: Observable<string> = 
    this.http.get<string>('http://localhost:8080/api/v1/status', 
          { headers: new HttpHeaders({timeout: `${6000}`})})
          .pipe(
            catchError(() => 
              {
                this.backEndStatus = false;
                this.errorMessge = 'Server is down, please retry later';
                this.displayDiv();
                return throwError(() => new Error('No back-end...'))
              }), retry()
          )

  private checkBackEndStatus() {
    this.backEndChecker
      .pipe(repeat({delay : 3000}))
      .subscribe((_) => {
        this.backEndStatus = true;
        this.displayDiv();
      });
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
        this.errorMessge = 'Error acquired: you are offline, please check for internet connection';
        this.displayDiv();
      });
  }



  private displayDiv (): void {
    const divCenter = document.getElementById('center');
    const divErrorMessage = document.getElementById('errorMessage');
    if(this.networkStatus && this.backEndStatus){
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
