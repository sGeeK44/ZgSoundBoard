import { Component, OnInit } from '@angular/core';
import { Sound } from './Sound';
import { SoundService } from './sound.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import * as path from 'path';


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
  newSouldFiles: any[];
  sounds: Sound[];
  insertResult: string;
  bulkInsertResult: string;

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

  onFileUpdated($event) {
    const files = $event.target.files || $event.srcElement.files;
    this.newSoundFile = files[0];
  }

  onFileBulkDragOver($event) {
    $event.stopPropagation();
    $event.preventDefault();
    $event.dataTransfer.dropEffect = 'copy';
  }

  onFileBulkDrop($event) {
    $event.stopPropagation();
    $event.preventDefault();
    console.log($event.dataTransfer);
    for (let i = 0, f; f = $event.dataTransfer.files[i]; i++) {
      console.log(f);
    }

    this.newSouldFiles = $event.dataTransfer.files;
  }

  onSubmit() {
    this.PostNewSound(this.newSoundName, this.newSoundFile, function(result) {
      this.insertResult = result;
    });
  }

  onSubmitBulk() {
    for (let i = 0, f; f = this.newSouldFiles[i]; i++) {
      const reader = new FileReader();
      const fileContent = reader.readAsArrayBuffer(f);
      const soundName = f.name.substring(0, f.name.lastIndexOf('.'));
      this.PostNewSound(soundName, f, function(json){
        console.log(json);
        if (json.result === 'success') {
          this.sounds.push(json.sound);
        } else {
          this.bulkInsertResult = 'Error: ' + soundName;
        }
      });
    }
  }

  PostNewSound(name: string, file: any, callback: (any)) {
    const formData = new FormData();
    console.log(file);
    formData.append('name', name);
    formData.append('file', file);

    const headers = new Headers({});
    const options = new RequestOptions({ headers });
    const url = 'http://api.zgsoundboard.com/sound';

    this.http.post(url, formData, options).subscribe(res => {
        const timer = Observable.timer(2000, 1000);
        const sub = timer.subscribe(_ => {
          sub.unsubscribe();
          this.insertResult = '';
        });
        callback(res.json());
    });
  }
}
