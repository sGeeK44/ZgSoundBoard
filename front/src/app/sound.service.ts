import { Injectable, NgModule } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
  endpoint: string;

  constructor(http: Http) {
    this.http = http;
    this.endpoint = 'http://api.zgsoundboard.com/sound';
  }

  getSounds(): Observable<Sound[]> {
    return this.http.get(this.endpoint)
                    .map(res => res.json())
                    .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

  postNewSound(name: string, file: any, callback: (any)) {
    const formData = new FormData();
    console.log(file);
    formData.append('name', name);
    formData.append('file', file);

    const headers = new Headers({});
    const options = new RequestOptions({ headers });
    this.http.post(this.endpoint, formData, options).subscribe(res => {
        callback(res.json());
    });
  }
}
