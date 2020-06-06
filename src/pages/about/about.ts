import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from "@ionic-native/speech-recognition";
import { TextToSpeech } from "@ionic-native/text-to-speech";
import { SpeechProvider } from '../../providers/speech/speech';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public bgcolor: string = 'white';
  public text: string;
  public matches: Array<string>;

  constructor(
    public navCtrl: NavController,
    private speechRecognition: SpeechRecognition,
    private tts: TextToSpeech,
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
      .subscribe(
        (matches: Array<string>) => {
          console.log('matches');
          this.matches = matches;
          this.bgcolor = matches[0];
          this.speechService.bgColor.next(this.bgcolor);
        }
      )
  }

}
