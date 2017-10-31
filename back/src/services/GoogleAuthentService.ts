var request = require('request');
import { UserRepository } from '../repository/UserRepository'
import { IUser } from '../interfaces/IUser'

class GoogleAuthentService{

    private readonly GOOGLE_VERIFY_TOKEN_URL="https://www.googleapis.com/oauth2/v3/tokeninfo?"
    private userRepository = new UserRepository;

    public Authent(id_token){
        const userRepo = new UserRepository();
        // Configure the request
        var options = {
            url: this.GOOGLE_VERIFY_TOKEN_URL+'id_token='+id_token,
        }
        var user: IUser
        // Start the request
        request.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const user_mail = JSON.parse(body).email
                this.userRepository.getOrCreateByMail(user_mail, user)
                console.log("user authent: "+user)
                return true;
            }
            else{
                console.log("Erreur lors de la requête d'authentification google");
                return false;
            }
        })
    }
}

const googleAuthentService = new GoogleAuthentService
export default googleAuthentService;