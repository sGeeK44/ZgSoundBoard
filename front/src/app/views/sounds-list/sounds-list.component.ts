import { Component, OnInit, Input } from '@angular/core';
import { Sound } from '../../business/Sounds/Sound'

@Component({
    selector: 'app-sounds-list',
    templateUrl: './sounds-list.component.html',
    styleUrls: ['./sounds-list.component.css']
  })

export class SoundsListComponent{
    @Input() sounds: Sound[];
    @Input() filterText: string;
}