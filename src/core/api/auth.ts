import { ILogin } from '@/types/login';
import {
  AUTH_FORGOT_PASSWORD,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
} from '../http/endpoint-urls';
import http from '../http/http';
import Resource from './resource';

class AuthResource extends Resource {
  constructor() {
    super('auth');
  }

  loginUser(loginUser: ILogin) {
    return http({
      url: AUTH_LOGIN,
      method: 'post',
      data: loginUser,
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  forgetPassword(email: string) {
    return http({
      url: AUTH_FORGOT_PASSWORD,
      method: 'post',
      data: { email },
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
  logout(refreshToken: string) {
    return http({
      url: AUTH_LOGOUT,
      method: 'post',
      data: { refresh_token: refreshToken },
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
  refreshUser(refreshToken: string) {
    return http({
      url: AUTH_REFRESH_TOKEN,
      method: 'post',
      data: { refresh: refreshToken },
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
}

export { AuthResource as default };
