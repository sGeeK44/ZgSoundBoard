import { Injectable } from '@angular/core';
import { Sound } from './Sound';

const SOUNDS: Sound[] = [
  new Sound ('La mer noire', '/assets/sounds/la_mer_noire.mp3'),
  new Sound ('Tu ne connais pas ça', '/assets/sounds/tu_ne_connais_pas_ca.mp3'),
  new Sound ('Tu ne  pas ça', '/assets/sounds/tu_ne_connais_pas_ca.mp3')
];

@Injectable()
export class SoundService {
  getSounds(): Promise<Sound[]> {
    return Promise.resolve(SOUNDS);
  }
}
