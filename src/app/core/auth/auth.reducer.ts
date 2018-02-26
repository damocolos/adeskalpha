import { Action } from '../core.interfaces';

export const initialState = {
  isAuthenticated: false,
  token: '',
};

export const AUTH_KEY = 'AUTH';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const login = (token) => (
    { 
        type: AUTH_LOGIN, 
        payload: token 
    });
export const logout = () => (
    { 
        type: AUTH_LOGOUT 
    });

export const selectorAuth = state => state.auth;

export function authReducer(state = initialState, action: Action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return Object.assign({}, state, {
        isAuthenticated: true,
        token: action.payload
      });

    case AUTH_LOGOUT:
      return Object.assign({}, state, {
        isAuthenticated: false
      });

    default:
      return state;
  }
}
