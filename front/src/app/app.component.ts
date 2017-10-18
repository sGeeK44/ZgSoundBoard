import { Component, OnInit } from '@angular/core';
import { Sound } from './Sound';
import { SoundService } from './sound.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SoundService]
})
export class AppComponent implements OnInit {
  title = 'Zg SoundBoard!';
  sounds: Sound[];

  constructor(private soundService: SoundService) { }

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
