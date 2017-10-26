import { Component, OnInit } from '@angular/core';
import { SoundService } from '../sound.service';
import { Observable } from 'rxjs/Rx';
import * as path from 'path';

@Component({
  selector: 'app-add-sounds',
  templateUrl: './add-sounds.component.html',
  styleUrls: ['./add-sounds.component.css'],
  providers: [SoundService]
})
export class AddSoundsComponent implements OnInit {
  newSoundName: string;
  newSoundFile: any;
  newSouldFiles: any[];
  insertResult: string;
  bulkInsertResult: string;

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
    console.log($event.dataTransfer);
    for (let i = 0, f; f = $event.dataTransfer.files[i]; i++) {
      console.log(f);
    }

    this.newSouldFiles = $event.dataTransfer.files;
  }

  onSubmitBulk() {
    for (let i = 0, f; f = this.newSouldFiles[i]; i++) {
      const reader = new FileReader();
      const fileContent = reader.readAsArrayBuffer(f);
      const soundName = f.name.substring(0, f.name.lastIndexOf('.'));
      this.soundService.postNewSound(soundName, f, function(json){
        console.log(json);
        if (json.result === 'success') {
          this.sounds.push(json.sound);
        } else {
          this.bulkInsertResult = 'Error: ' + soundName;
        }
        const timer = Observable.timer(2000, 1000);
        const sub = timer.subscribe(_ => {
          sub.unsubscribe();
          this.insertResult = '';
        });
      });
    }
  }
}
