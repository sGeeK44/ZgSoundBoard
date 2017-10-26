declare var gapi: any;
export class GoogleProfile{
    email: string;
    fullName: string;
    image_url: string;
    googleId: string;
    token_id: string;

    constructor(public profile: any){
        if(profile instanceof gapi.auth2.BasicProfile){
            this.fullName = profile.getName(),
            this.email = profile.getEmail(),
            this.image_url = profile.getImageUrl(),
            this.googleId = profile.getId()
        }
        console.log("Profil chargé: ");
        console.log(this);
    }
}