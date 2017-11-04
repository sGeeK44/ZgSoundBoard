import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs} from '@angular/http';
import { UserProfileService } from '../business/UserProfile/UserProfile.service';

@Injectable()
export class ApiClient {
    endpoint: string;

    constructor(private http: Http, private userProfileService: UserProfileService) {
        this.endpoint = 'http://api.zgsoundboard.com/';
    }

    addOAuthHeader(headers: Headers) {
        const profile = this.userProfileService.Get();
        if (profile == null) {
            return;
        }
        headers.append('TokenId', profile.tokenId);
    }

    get(resource) {
        const headers = new Headers();
        this.addOAuthHeader(headers);
        return this.http.get(this.getUrl(resource), {
            headers: headers
        });
    }

    post(resource, data) {
        const headers = new Headers();
        this.addOAuthHeader(headers);
        return this.http.post(this.getUrl(resource), data, {
        headers: headers
        });
    }

    update(resource, data) {
        const updateUri = this.getUrl(resource) + '/' + data.id;
        const headers = new Headers();
        this.addOAuthHeader(headers);
        return this.http.put(updateUri, data, {
            headers: headers
        });
    }

    delete(resource, id) {
        const deleteUri = this.getUrl(resource) + '/' + id;
        const headers = new Headers();
        this.addOAuthHeader(headers);
        return this.http.delete(deleteUri, {
            headers: headers
        });
    }

    getUrl(resource): string {
        return this.endpoint + resource;
    }
}
