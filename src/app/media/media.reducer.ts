import { Action } from "@app/core";

export interface IMedia {
    id: string;
    name: string;
    size: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

export const INITIAL_STATE: IMedia[] = [
    {
        id: '',
        name: '',
        size: '',
        url: '',
        createdAt: '',
        updatedAt: '',
    }
];

export const MEDIA_INIT     = 'MEDIA_INIT';
export const MEDIA_ADD      = 'MEDIA_ADD';
export const MEDIA_UPDATE   = 'MEDIA_UPDATE';
export const MEDIA_REMOVE   = 'MEDIA_REMOVE';
export const MEDIA_PERSIST  = 'MEDIA_PERSIST';

export const actionInitMedia = (data: IMedia[]) => ({
    type: MEDIA_INIT,
    payload: data
});

export const actionAddMedia = (data: IMedia) => ({
    type: MEDIA_ADD,
    payload: data
});

export const actionUpdateMedia = (data: IMedia) => ({
    type: MEDIA_UPDATE,
    payload: data
});

export const actionRemoveMedia = (id: string) => ({
    type: MEDIA_REMOVE,
    payload: id
});

export const actionPersistMedia = (data: IMedia) => ({
    type: MEDIA_PERSIST,
    payload: data
});

export const selectorMedias = state => state.media;

export function mediaReducer(state: IMedia[] = INITIAL_STATE, action: Action): IMedia[] {
    switch (action.type) {
        case MEDIA_INIT:
            return action.payload;
        case MEDIA_ADD:
            return [action.payload, ...state];
        case MEDIA_UPDATE:
            state.some((item: IMedia) => {
                if (item.id === action.payload.id) {
                    item.name = action.payload.name;
                    item.createdAt = action.payload.createdAt;
                    item.updatedAt = action.payload.updatedAt;
                    item.size = action.payload.size;
                    item.url = action.payload.url;
                    return true;
                }
            });
            return [...state];
        case MEDIA_REMOVE:
            return state.filter((data: IMedia) => data.id !== action.payload);
        default:
            return state
    }
}


