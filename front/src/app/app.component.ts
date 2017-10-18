import { Component, OnInit } from '@angular/core';
import { Sound } from './Sound';
import { SoundService } from './sound.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SoundService]
})
export class AppComponent implements OnInit {
  title = 'Zg SoundBoard!';
  newSoundName: string;
  newSoundFile: any;
  sounds: Sound[];
  insertResult: string;

  constructor(private soundService: SoundService, private http: Http) { }

  ngOnInit(): void {
    this.loadSounds();
  }

  loadSounds() {
       this.soundService.getSounds()
                        .subscribe(sound => this.sounds = sound,
                                   err => console.log(err));
  }

  onPlay(sound: Sound): void {
    const audio = new Audio(sound.link);
    audio.load();
    audio.play();
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.newSoundName);
    formData.append('file', this.newSoundFile);

    const headers = new Headers({});
    const options = new RequestOptions({ headers });
    const url = 'http://api.zgsoundboard.com/sound';

    this.http.post(url, formData, options).subscribe(res => {
       this.insertResult = res.json().result;
       const timer = Observable.timer(2000, 1000);
       const sub = timer.subscribe(_ => {
         this.insertResult = '';
         sub.unsubscribe();
       });
    });
  }

  onFileUpdated($event) {
    const files = $event.target.files || $event.srcElement.files;
    this.newSoundFile = files[0];
  }
}
