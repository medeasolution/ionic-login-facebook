import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FacebookLoginResponse, Facebook} from "@ionic-native/facebook";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    user: { email: string, first_name: string, id: string, last_name: string, name: string, picture: { data: { url: string } } };

    constructor(public navCtrl: NavController, private fb: Facebook) {

    }

    onClickFacebook() {
        this.fb.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => this.getUserInfo(res.authResponse.userID))
            .catch(e => this.loginFacebookError(e));
    }

    getUserInfo(userId: string) {
        this.fb.api('me?fields=' + ['name', 'email', 'first_name', 'last_name', 'picture.type(large)'].join(), null)
            .then((res: any) => this.setFacebookUserInfo(res))
            .catch(e => this.loginFacebookError(e));
    }

    setFacebookUserInfo(user: any) {
        this.user = user;
    }

    loginFacebookError(error: any) {
        console.info('Error logging into Facebook', error);
    }
}
