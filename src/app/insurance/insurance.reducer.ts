import { Action } from "@app/core";

export interface IInsuranceProfile {
    id: string;
    insurance: IInsurance;
    email: string;
    logo: string;
    phone: string;
    address: string;
    detail: string;
}

export interface IInsurance {
    id: string;
    name: string;
}

export const INITIAL_STATE: IInsuranceProfile[] = [
    // {
    //     id: '',
    //     insurance: {
    //         id: '',
    //         name: ''
    //     },
    //     email: '',
    //     logo: '',
    //     phone: '',
    //     address: '',
    //     detail: ''
    // }
];

export const INSURANCE_INIT     = 'INSURANCE_INIT';
export const INSURANCE_ADD      = 'INSURANCE_ADD';
export const INSURANCE_UPDATE   = 'INSURANCE_UPDATE';
export const INSURANCE_REMOVE   = 'INSURANCE_REMOVE';
export const INSURANCE_PERSIST  = 'INSURANCE_PERSIST';

export const actionInitInsurance = (data: IInsuranceProfile[]) => ({
    type: INSURANCE_INIT,
    payload: data
});

export const actionAddInsurance = (data: IInsuranceProfile) => ({
    type: INSURANCE_ADD,
    payload: data
});

export const actionUpdateInsurance = (data: IInsuranceProfile) => ({
    type: INSURANCE_UPDATE,
    payload: data
});

export const actionRemoveInsurance = (id: string) => ({
    type: INSURANCE_REMOVE,
    payload: id
});

export const actionPersistInsurance = (data: IInsuranceProfile) => ({
    type: INSURANCE_PERSIST,
    payload: data
});

export const selectorInsurances = state => state.insurance;

export function insuranceReducer(state: IInsuranceProfile[] = INITIAL_STATE, action: Action): IInsuranceProfile[] {
    switch (action.type) {
        case INSURANCE_INIT:
            return action.payload;
        case INSURANCE_ADD:
            return [action.payload, ...state];
        case INSURANCE_UPDATE:
            state.some((item: IInsuranceProfile) => {
                if (item.id === action.payload.id) {
                    item.insurance = action.payload.insurance;
                    item.phone = action.payload.phone;
                    item.email = action.payload.email;
                    item.logo = action.payload.logo;
                    item.detail = action.payload.detail;
                    item.address = action.payload.address;
                    return true;
                }
            });
            return [...state];
        case INSURANCE_REMOVE:
            return state.filter((data: IInsuranceProfile) => data.id !== action.payload);
        default:
            return state
    }
}


