import { Action } from "@app/core";

export interface IBookkeeping {
    _id: number;
    type: string;
    amount: number;
    date: string;
    description: string;
    created_at: string;
    update_at: string;
};

const data: IBookkeeping[] = [
    {
        _id: 7,
        type: 'deposit',
        amount: 5500000,
        description: 'deposit',
        date: '2017-12-14T07:24:38.188Z',
        created_at: '2017-12-14T07:24:38.188Z',
        update_at: '2017-12-14T07:24:38.188Z'
    },
    {
        _id: 8,
        type: 'credit',
        amount: 7800000,
        description: 'credit',
        date: '2017-12-14T07:24:38.188Z',
        created_at: '2017-12-14T07:24:38.188Z',
        update_at: '2017-12-14T07:24:38.188Z'
    },
    {
        _id: 9,
        type: 'other',
        amount: 20000000,
        description: 'other',
        date: '2018-01-01T07:24:38.188Z',
        created_at: '2018-01-28T07:24:38.188Z',
        update_at: '2018-01-28T07:24:38.188Z'
    },
    {
        _id: 4,
        type: 'deposit',
        amount: 2100000,
        description: 'deposit',
        date: '2018-01-14T07:24:38.188Z',
        created_at: '2018-01-14T07:24:38.188Z',
        update_at: '2018-01-14T07:24:38.188Z'
    },
    {
        _id: 5,
        type: 'credit',
        amount: 5400000,
        description: 'credit',
        date: '2018-01-14T07:24:38.188Z',
        created_at: '2018-01-14T07:24:38.188Z',
        update_at: '2018-01-14T07:24:38.188Z'
    },
    {
        _id: 6,
        type: 'other',
        amount: 25000000,
        description: 'other',
        date: '2018-02-01T07:24:38.188Z',
        created_at: '2018-02-28T07:24:38.188Z',
        update_at: '2018-02-28T07:24:38.188Z'
    },
    {
        _id: 1,
        type: 'deposit',
        amount: 1300000,
        description: 'deposit',
        date: '2018-02-14T07:24:38.188Z',
        created_at: '2018-02-14T07:24:38.188Z',
        update_at: '2018-02-14T07:24:38.188Z'
    },
    {
        _id: 2,
        type: 'credit',
        amount: 3000000,
        description: 'credit',
        date: '2018-02-14T07:24:38.188Z',
        created_at: '2018-02-14T07:24:38.188Z',
        update_at: '2018-02-14T07:24:38.188Z'
    },
    {
        _id: 3,
        type: 'other',
        amount: 50000000,
        description: 'other',
        date: '2018-03-01T07:24:38.188Z',
        created_at: '2018-02-28T07:24:38.188Z',
        update_at: '2018-02-28T07:24:38.188Z'
    },
];

export const INITIAL_STATE: IBookkeeping[] = data;

export const BOOKKEEPING_INIT = 'BOOKKEEPING_INIT';
export const BOOKKEEPING_ADD = 'BOOKKEEPING_ADD';
export const BOOKKEEPING_UPDATE = 'BOOKKEEPING_UPDATE';
export const BOOKKEEPING_REMOVE = 'BOOKKEEPING_REMOVE';
export const BOOKKEEPING_PERSIST = 'BOOKKEEPING_PERSIST';

export const actionInitBookkeeping = (data: IBookkeeping[]) => ({
    type: BOOKKEEPING_INIT,
    payload: data
});

export const actionAddBookkeeping = (data: IBookkeeping) => ({
    type: BOOKKEEPING_ADD,
    payload: data
});

export const actionUpdateBookkeeping = (data: IBookkeeping) => ({
    type: BOOKKEEPING_UPDATE,
    payload: data
});

export const actionRemoveBookkeeping = (_id: number) => ({
    type: BOOKKEEPING_REMOVE,
    payload: _id
});

export const actionPersistBookkeeping = (data: IBookkeeping) => ({
    type: BOOKKEEPING_PERSIST,
    payload: data
});

export const selectorBookkeepings = state => state.bookkeeping;

export function bookkeepingReducer(state: IBookkeeping[] = INITIAL_STATE, action: Action): IBookkeeping[] {
    switch (action.type) {
        case BOOKKEEPING_INIT:
            return action.payload;
        case BOOKKEEPING_ADD:
            return [...state, action.payload];
        case BOOKKEEPING_UPDATE:
            state.some((item: IBookkeeping) => {
                if (item._id === action.payload._id) {
                    item = action.payload;
                    return true;
                }
            });
            return [...state];
        case BOOKKEEPING_REMOVE:
            return state.filter((data: IBookkeeping) => data._id !== action.payload);
        default:
            return state;
    }
}


