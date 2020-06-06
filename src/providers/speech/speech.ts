import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

/*
  Generated class for the SpeechProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpeechProvider {

  public bgColor = new BehaviorSubject<string>('white');

  constructor(public http: HttpClient) {
    console.log('Hello SpeechProvider Provider');
  }

}
