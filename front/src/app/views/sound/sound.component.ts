import { Component, OnInit, Input } from '@angular/core';
import { Sound } from '../../business/Sounds/Sound'

@Component({
    selector: 'app-sound',
    templateUrl: './sound.component.html',
    styleUrls: ['./sound.component.css'],
})

export class SoundComponent{
    @Input() sound: Sound;
    isFavorite: boolean;
    hoverFavoriteStar: false;

    onPlay(sound: Sound): void {
        const audio = new Audio(sound.link);
        audio.load();
        audio.play();
    }

    onChangeFavoriteStatus(event){
        if(!this.isFavorite){
            this.AddFavorite()
        }
        else{
            this.DeleteFavorite();
        }
        event.stopPropagation();
    }

    AddFavorite():void{
        console.log("add fav");
        this.isFavorite = true;
        console.log("star visible: "+ this.hoverFavoriteStar || this.isFavorite)
    }

    DeleteFavorite():void{
        console.log("delete fav");
        this.isFavorite = false;
        this.hoverFavoriteStar = false;
        console.log("star visible: "+ this.hoverFavoriteStar || this.isFavorite)
    }
}