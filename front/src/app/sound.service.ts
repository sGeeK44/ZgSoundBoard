import { Injectable, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { Sound } from './Sound';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const SOUNDS: Sound[] = [
  new Sound ('La mer noire', '/assets/sounds/la_mer_noire.mp3'),
  new Sound ('Tu ne connais pas ça', '/assets/sounds/tu_ne_connais_pas_ca.mp3'),
  new Sound ('Tu ne  pas ça', '/assets/sounds/tu_ne_connais_pas_ca.mp3')
];

@Injectable()
export class SoundService {
  http: Http;
  sounds: Array<Sound>;

  constructor(http: Http) {
    this.http = http;
  }

  getSounds(): Observable<Sound[]> {
    return this.http.get('http://api.zgsoundboard.com/sound')
                    .map(res => res.json())
                    .catch(error => Observable.throw(error.json().error || 'Server error'));
  }
}
