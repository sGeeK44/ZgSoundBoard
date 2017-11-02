import { Injectable, NgModule } from '@angular/core';
import { Sound } from './Sound';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiClient } from '../../core/ApiClient';

@Injectable()
export class SoundService {
  sounds: Array<Sound>;
  resourceName: string;

  constructor(private api: ApiClient) {
    this.resourceName = 'sound';
  }

  getSounds(): Observable<Sound[]> {
    return this.api.get(this.resourceName)
                   .map(res => res.json())
                   .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

  postNewSound(name: string, file: any, callback: (any)) {
    const formData = new FormData();
    console.log(file);
    formData.append('name', name);
    formData.append('file', file);

    this.api.post(this.resourceName, formData).subscribe(res => {
      callback(res.json());
    }, err => {
      callback(JSON.parse('{"result":"error"}'));
    });
  }

  deleteSound(id: string, success: () => void, error: () => void): void {
    this.api.delete(this.resourceName, id).subscribe(res => success(), err => error());
  }
}
