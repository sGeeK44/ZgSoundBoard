import { Component, OnInit } from '@angular/core';
import { SoundService } from '../../business/Sounds/sound.service';
import { Observable } from 'rxjs/Rx';
import * as path from 'path';

@Component({
  selector: 'app-add-sounds',
  templateUrl: './add-sounds.component.html',
  styleUrls: ['./add-sounds.component.css'],
  providers: [SoundService]
})
export class AddSoundsComponent implements OnInit {
  newSouldFiles: any[];

  constructor(private soundService: SoundService) { }

  ngOnInit(): void {
  }

  onFileBulkDragOver($event) {
    $event.stopPropagation();
    $event.preventDefault();
    $event.dataTransfer.dropEffect = 'copy';
  }

  onFileBulkDrop($event) {
    $event.stopPropagation();
    $event.preventDefault();
    for (let i = 0, f; f = $event.dataTransfer.files[i]; i++) {
      f.result = undefined;
    }

    this.newSouldFiles = $event.dataTransfer.files;
  }

  getFileResultClass(file) {
      if (file.result === true) {
        return 'label-success';
      }

      if (file.result === false) {
        return 'label-danger';
      }

      return 'label-info';
  }

  clearDropZone() {
    this.newSouldFiles = undefined;
  }

  addSounds() {
    for (let i = 0, f; f = this.newSouldFiles[i]; i++) {
      const reader = new FileReader();
      const fileContent = reader.readAsArrayBuffer(f);
      const soundName = f.name.substring(0, f.name.lastIndexOf('.'));
      this.soundService.postNewSound(soundName, f, function(json){
        console.log(json);
        if (json.result === 'success') {
          f.result = true;
        } else {
          f.result = false;
        }
      });
    }
  }
}
