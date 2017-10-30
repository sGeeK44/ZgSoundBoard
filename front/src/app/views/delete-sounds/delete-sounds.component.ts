import { Component, OnInit } from '@angular/core';
import { SoundService } from '../../business/Sounds/sound.service';
import { Observable } from 'rxjs/Rx';
import * as path from 'path';
import { Sound } from '../../business/Sounds/Sound';
import { FilterPipe } from '../../Pipes/filter';

class DeleteSoundViewModel extends Sound {
  isSelected: boolean;

  constructor(sound: Sound) {
    super(sound);
    this.isSelected = false;
  }
}

@Component({
  selector: 'app-delete-sounds',
  templateUrl: './delete-sounds.component.html',
  styleUrls: ['./delete-sounds.component.css'],
  providers: [SoundService]
})
export class DeleteSoundsComponent implements OnInit {
  sounds: DeleteSoundViewModel[];
  selectedAll: any;
  filterText: string;

  constructor(private soundService: SoundService) {
  }

  ngOnInit(): void {
    this.sounds = new Array<DeleteSoundViewModel>();
    this.loadSounds();
  }

  loadSounds() {
       this.soundService.getSounds()
                        .subscribe(sounds => {
                          sounds.forEach(element => {
                            const item = new DeleteSoundViewModel(element);
                            this.sounds.push(item);
                          });
                        }, err => console.log(err));
  }

  selectAll() {
    const filter = new FilterPipe();
    const filteredSound = filter.transform(this.sounds, this.filterText);
    for (let i = 0; i < filteredSound.length; i++) {
      filteredSound[i].isSelected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.sounds.every(function(item: any) {
        return item.isselected === true;
      });
  }

  deleteSelected() {
    this.sounds.forEach(element => {
      if (element.isSelected) {
        this.delete(element);
      }
    });
  }

  delete(sound: Sound) {
    this.soundService.deleteSound(sound.id,
      function() { },
      function() {
        console.log('Failed to delete:' + sound.id);
      });
  }
}
