import { Component, OnInit, Input } from '@angular/core';
import { Sound } from '../../business/Sounds/Sound'

@Component({
    selector: 'app-sound',
    templateUrl: './sound.component.html',
    styleUrls: ['./sound.component.css'],
})

export class SoundComponent{
    @Input() sound: Sound

    onPlay(sound: Sound): void {
        const audio = new Audio(sound.link);
        audio.load();
        audio.play();
    }
}