import { Action } from "@app/core";

export interface IUser {
    id: string;
    username: string;
    email: string;
    role: string;
}

// {
//     id: '',
//     username: '',
//     email: '',
//     role: '',
// }

export const INITIAL_STATE: IUser[] = [];

export const USER_INIT     = 'USER_INIT';
export const USER_ADD      = 'USER_ADD';
export const USER_UPDATE   = 'USER_UPDATE';
export const USER_REMOVE   = 'USER_REMOVE';
export const USER_PERSIST  = 'USER_PERSIST';

export const actionInitUser = (data: IUser[]) => ({
    type: USER_INIT,
    payload: data
});

export const actionAddUser = (data: IUser) => ({
    type: USER_ADD,
    payload: data
});

export const actionUpdateUser = (data: IUser) => ({
    type: USER_UPDATE,
    payload: data
});

export const actionRemoveUser = (id: string) => ({
    type: USER_REMOVE,
    payload: id
});

export const actionPersistUser = (data: IUser) => ({
    type: USER_PERSIST,
    payload: data
});

export const selectorUsers = state => state.user.users;

export function userReducer(state: IUser[] = INITIAL_STATE, action: Action): IUser[] {
    switch (action.type) {
        case USER_INIT:
            return action.payload;
        case USER_ADD:
            return [...state, action.payload];
        case USER_UPDATE:
            state.some((item: IUser) => {
                if (item.id === action.payload.id) {
                    item.username = action.payload.username;
                    item.email = action.payload.email;
                    item.role = action.payload.role;
                    return true;
                }
            });
            return [...state];
        case USER_REMOVE:
            return state.filter((data: IUser) => data.id !== action.payload);
        default:
            return state
    }
}


