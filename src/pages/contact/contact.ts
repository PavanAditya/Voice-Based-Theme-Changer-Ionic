import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from "@ionic-native/speech-recognition";
import { SpeechProvider } from '../../providers/speech/speech';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public bgcolor: string = 'white';

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
      }
      )
  }

  public roomClicked(house: string, room: string): void {
    alert(`${house} has ${room}`);
  }

}
