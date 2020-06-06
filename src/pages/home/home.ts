import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from "@ionic-native/speech-recognition";
import { SpeechProvider } from '../../providers/speech/speech';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public bgcolor: string = 'white';
  public loginDisplay = true;

  constructor(
    public navCtrl: NavController,
    private speechRecognition: SpeechRecognition,
    private speechService: SpeechProvider
  ) { }

  ngOnInit() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('denied')
            )
        }
      });
    this.speechService.bgColor.next(this.bgcolor);
    this.speechService.bgColor.subscribe(resp => {
      this.bgcolor = resp;
    });
  }

  public start(): void {
    this.speechRecognition.startListening()
      .subscribe((matches: Array<string>) => {
        console.log('matches')
        this.bgcolor = matches[0];
        this.speechService.bgColor.next(this.bgcolor);
      });
  }

  public changeDisplayCard(): void {
    this.loginDisplay = !this.loginDisplay;
  }

  public forgotPassword(): void {
    alert(`No Help will be done.
    Try Remembring Passwords
    😆😆`);
  }

  public login(): void {
    alert('Temporary Login');
  }

  public register(): void {
    alert('Temporary Registration');
  }

}
