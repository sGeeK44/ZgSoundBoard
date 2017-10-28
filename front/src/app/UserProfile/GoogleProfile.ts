declare var gapi: any;
import { UserProfile } from "./UserProfile";

export class GoogleProfile extends UserProfile {
    googleId: string;

    constructor(public profile: any, id_token : string) {
        super();
        if(profile instanceof gapi.auth2.BasicProfile) {
            this.fullName = profile.getName(),
            this.email = profile.getEmail(),
            this.image_url = profile.getImageUrl(),
            this.googleId = profile.getId()
        }
        //How use this token server side https://developers.google.com/identity/sign-in/web/backend-auth
        this.tokenId = id_token;
        console.log("Profil google chargé: ");
        console.log(this);
    }
}