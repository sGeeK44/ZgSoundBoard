import { Component, OnInit } from '@angular/core';
import { Sound } from './sound';
import { SoundService } from './sound.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SoundService]
})
export class AppComponent implements OnInit {
  title = 'Zg SoundBoard!';
  sounds 
  
  constructor(private soundService: SoundService) { }

  ngOnInit(): void {
    this.soundService.getSounds().then(sounds => this.sounds = sounds);
  }

  onPlay(sound: Sound): void {
    var audio = new Audio(sound.source);
    audio.load();
    audio.play();
  }
}