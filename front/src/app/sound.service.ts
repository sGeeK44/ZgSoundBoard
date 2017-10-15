import { Injectable } from '@angular/core';
import { Sound } from '../../../business/Sound';

const SOUNDS: Sound[] = [
  { id: 11, name: 'T\'es malade toi', source: '/assets/sounds/tes_malade_to.mp3' },
  { id: 12, name: 'La mer noire', source: '/assets/sounds/la_mer_noire.mp3' },,
  { id: 13, name: 'Tu ne connais pas ça', source: '/assets/sounds/tu_ne_connais_pas_ca.mp3' }
  { id: 13, name: 'Tu ne  pas ça', source: '/assets/sounds/tu_ne_connais_pas_ca.mp3' }
];

@Injectable()
export class SoundService {
  getSounds(): Promise<Sound[]> {
    return Promise.resolve(SOUNDS);
  }
}
