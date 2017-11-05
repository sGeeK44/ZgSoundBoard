declare var gapi: any;
import { UserProfile } from "./UserProfile";

export class UnknownProfile extends UserProfile {
    googleId: string;

    constructor() {
        super();
        this.fullName = '';
        this.email = '';
        this.image_url = '';
        this.tokenId = '';
    }
}