import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Callback} from "../steem/callback.interface";

declare const steemconnect: any;

@Injectable()
export class AuthService {

  public authenticate(callback: Callback) {
    steemconnect.init({app: environment.steem.appName, callbackURL: environment.steem.host});
    steemconnect.isAuthenticated(callback);
  }

  public getLoginUrl() {
    return steemconnect.getLoginURL()
  }
}
