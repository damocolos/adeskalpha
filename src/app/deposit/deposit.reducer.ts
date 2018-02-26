import { Action } from "@app/core";

export interface IDeposit {
    _id: number;
    type: string;
    nik: string;
    amount: number;
    description: string;
    created_at: string;
    update_at: string;
};

const data: IDeposit[] = [
    {
        _id: 1,
        type: 'wajib',
        nik: 'KOP-889189',
        amount: 100000,
        description: 'iuran wajib',
        created_at: '2018-02-14T07:24:38.188Z',
        update_at: '2018-02-14T07:24:38.188Z'
    },
    {
        _id: 2,
        type: 'wajib',
        nik: 'KOP-505634',
        amount: 100000,
        description: 'iuran wajib',
        created_at: '2018-02-14T07:24:38.188Z',
        update_at: '2018-02-14T07:24:38.188Z'
    },
    {
        _id: 3,
        type: 'sukarela',
        nik: 'KOP-684938',
        amount: 1000000,
        description: 'iuran sukarela',
        created_at: '2018-02-28T07:24:38.188Z',
        update_at: '2018-02-28T07:24:38.188Z'
    },
    {
        _id: 4,
        type: 'sukarela',
        nik: 'KOP-905350',
        amount: 2500000,
        description: 'iuran sukarela',
        created_at: '2018-02-27T07:24:38.188Z',
        update_at: '2018-02-27T07:24:38.188Z'
    }
];

export const INITIAL_STATE: IDeposit[] = data;

export const DEPOSIT_INIT = 'DEPOSIT_INIT';
export const DEPOSIT_ADD = 'DEPOSIT_ADD';
export const DEPOSIT_UPDATE = 'DEPOSIT_UPDATE';
export const DEPOSIT_REMOVE = 'DEPOSIT_REMOVE';
export const DEPOSIT_PERSIST = 'DEPOSIT_PERSIST';

export const actionInitDeposit = (data: IDeposit[]) => ({
    type: DEPOSIT_INIT,
    payload: data
});

export const actionAddDeposit = (data: IDeposit) => ({
    type: DEPOSIT_ADD,
    payload: data
});

export const actionUpdateDeposit = (data: IDeposit) => ({
    type: DEPOSIT_UPDATE,
    payload: data
});

export const actionRemoveDeposit = (data: IDeposit) => ({
    type: DEPOSIT_REMOVE,
    payload: data
});

export const actionPersistDeposit = (data: IDeposit) => ({
    type: DEPOSIT_PERSIST,
    payload: data
});

export const selectorDeposits = state => state.deposit;

export function depositReducer(state: IDeposit[] = INITIAL_STATE, action: Action): IDeposit[] {
    switch (action.type) {
        case DEPOSIT_INIT:
            return action.payload;
        case DEPOSIT_ADD:
            return [...state, action.payload];
        case DEPOSIT_UPDATE:
            state.some((item: IDeposit) => {
                if (item._id === action.payload._id) {
                    item.type = action.payload.type;
                    item.nik = action.payload.nik;
                    item.amount = action.payload.amount;
                    item.description = action.payload.description;
                    return true;
                }
            });
            return [...state];
        case DEPOSIT_REMOVE:
            return state.filter((data: IDeposit) => data._id !== action.payload._id);
        default:
            return state;
    }
}


