import { Component, OnInit } from '@angular/core';
import { Sound } from '../../business/Sounds/Sound';
import { SoundService } from '../../business/Sounds/sound.service';
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
}
