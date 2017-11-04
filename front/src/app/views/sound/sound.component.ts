import { Component, OnInit, Input } from '@angular/core';
import { Sound } from '../../business/Sounds/Sound'
import { SoundService } from '../../business/Sounds/sound.service';

@Component({
    selector: 'app-sound',
    templateUrl: './sound.component.html',
    styleUrls: ['./sound.component.css'],
})

export class SoundComponent {
    @Input() sound: Sound;
    hoverFavoriteStar: false;

    constructor(private soundService: SoundService) {
    }

    onPlay(sound: Sound): void {
        const audio = new Audio(sound.link);
        audio.load();
        audio.play();
    }

    onChangeFavoriteStatus(event) {
        if (!this.sound.is_favorite) {
            this.sound.is_favorite = true;
        } else {
            this.sound.is_favorite = false;
        }

        this.soundService.updateSound(this.sound,
        () => {
            console.log('Update success');
        }, () => {
            console.log('Update failed.');
        });
        event.stopPropagation();
    }
}
