import { Action } from "@app/core";

export interface ICredit {
    _id: number;
    type: string;
    nik: string;
    amount: number;
    status: string;
    description: string;
    interest: number;
    time_periods: number;
    paid: number;
    repayment_date: string;
    created_at: string;
    update_at: string;
};

const data: ICredit[] = [
    {
        _id: 1,
        type: 'satu',
        nik: 'KOP-889189',
        amount: 1000000,
        status: 'aktif',
        description: 'iuran wajib',
        interest: 2,
        time_periods: 5,
        paid: 100000,
        repayment_date: '',
        created_at: '2018-02-10T07:24:38.188Z',
        update_at: '2018-02-10T07:24:38.188Z'
    },
    {
        _id: 2,
        type: 'dua',
        nik: 'KOP-505634',
        amount: 900000,
        status: 'aktif',
        description: 'iuran wajib',
        interest: 2,
        time_periods: 5,
        paid: 90000,
        repayment_date: '',
        created_at: '2018-02-14T07:24:38.188Z',
        update_at: '2018-02-14T07:24:38.188Z'
    },
    {
        _id: 3,
        type: 'dua',
        nik: 'KOP-905350',
        amount: 900000,
        status: 'aktif',
        description: 'iuran wajib',
        interest: 2,
        time_periods: 5,
        paid: 900000,
        repayment_date: '',
        created_at: '2018-02-28T07:24:38.188Z',
        update_at: '2018-02-28T07:24:38.188Z'
    },
];

export const INITIAL_STATE: ICredit[] = data;

export const CREDIT_INIT = 'CREDIT_INIT';
export const CREDIT_ADD = 'CREDIT_ADD';
export const CREDIT_UPDATE = 'CREDIT_UPDATE';
export const CREDIT_REMOVE = 'CREDIT_REMOVE';
export const CREDIT_PERSIST = 'CREDIT_PERSIST';

export const actionInitCredit = (data: ICredit[]) => ({
    type: CREDIT_INIT,
    payload: data
});

export const actionAddCredit = (data: ICredit) => ({
    type: CREDIT_ADD,
    payload: data
});

export const actionUpdateCredit = (data: ICredit) => ({
    type: CREDIT_UPDATE,
    payload: data
});

export const actionRemoveCredit = (data: ICredit) => ({
    type: CREDIT_REMOVE,
    payload: data
});

export const actionPersistCredit = (data: ICredit) => ({
    type: CREDIT_PERSIST,
    payload: data
});

export const selectorCredits = state => state.credit;

export function creditReducer(state: ICredit[] = INITIAL_STATE, action: Action): ICredit[] {
    switch (action.type) {
        case CREDIT_INIT:
            return action.payload;
        case CREDIT_ADD:
            return [...state, action.payload];
        case CREDIT_UPDATE:
            state.some((item: ICredit) => {
                if (item._id === action.payload._id) {
                    item.nik = action.payload.nik;
                    item.type = action.payload.type;
                    item.amount = action.payload.amount;
                    item.description = action.payload.description;
                    item.interest = action.payload.interest;
                    item.paid = action.payload.paid;
                    item.repayment_date = action.payload.repayment_date;
                    item.status = action.payload.status;
                    item.time_periods = action.payload.time_periods;
                    item.update_at = action.payload.update_at;
                    return true;
                }
            });
            return [...state];
        case CREDIT_REMOVE:
            return state.filter((data: ICredit) => data._id !== action.payload._id);
        default:
            return state;
    }
}


