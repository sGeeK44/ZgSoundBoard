import { Injectable } from "@angular/core";
import { UserProfile } from "./UserProfile";

@Injectable()
export class UserProfileService {
    private static LOCALSTORAGE_KEY: string = "UserProfile";

    public Set(profile: UserProfile) : void
    {
        let serializedProfile = this.Serialize(profile);
        localStorage.setItem(UserProfileService.LOCALSTORAGE_KEY, serializedProfile);
    }

    public Get() : UserProfile {
        let profileSerialized = localStorage.getItem(UserProfileService.LOCALSTORAGE_KEY);
        return this.Deserialize(profileSerialized);
    }

    private Serialize(profile: UserProfile) : string
    {
        return JSON.stringify(profile);
    }

    private Deserialize(profileSerialized: string) : UserProfile
    {
        return JSON.parse(profileSerialized);
    }
}