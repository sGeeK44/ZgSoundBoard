import { Component, OnInit } from '@angular/core';
import { Sound } from '../Sound';
import { SoundService } from '../sound.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import * as path from 'path';


@Component({
  selector: 'app-display-sounds',
  templateUrl: './display-sounds.component.html',
  styleUrls: ['./display-sounds.component.css'],
  providers: [SoundService]
})
export class DisplaySoundsComponent implements OnInit {
  sounds: Sound[];
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
}
