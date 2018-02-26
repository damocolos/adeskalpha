import { Action } from "@app/core";

export interface IPrint {
    date: IDate;
};

interface IDate {
    from: string;
    to: string;
}

const data: IPrint = {
    date: {
        from: '',
        to: '',
    }
};

export const INITIAL_STATE: IPrint = data;

export const PRINT_INIT = 'PRINT_INIT';
export const PRINT_UPDATE = 'PRINT_UPDATE';
export const PRINT_UPDATE_DATE = 'PRINT_UPDATE_DATE';
export const PRINT_PERSIST = 'PRINT_PERSIST';

export const actionInitPrint = (data: IPrint) => ({
    type: PRINT_INIT,
    payload: data
});

export const actionUpdatePrint = (data: IPrint) => ({
    type: PRINT_UPDATE,
    payload: data
});

export const actionUpdateDatePrint = (data: IDate) => ({
    type: PRINT_UPDATE_DATE,
    payload: data
});

export const actionPersistPrint = (data: IPrint) => ({
    type: PRINT_PERSIST,
    payload: data
});

export const selectorPrint = state => state.print;

export function printReducer(state: IPrint = INITIAL_STATE, action: Action): IPrint {
    switch (action.type) {
        case PRINT_INIT:
            return action.payload;
        case PRINT_UPDATE:
            // state.some((item: IPrint) => {
                // if (item._id === action.payload._id) {
                //     item = action.payload;
                //     return true;
                // }
                // return true;
            // });
            return state;
        case PRINT_UPDATE_DATE:
            state.date = action.payload;
            return state;
        default:
            return state;
    }
}


