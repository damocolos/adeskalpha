import { Action } from "@app/core";
import { members } from "@app/member/member.data";

export interface IMember {
    _id: number;
    nik: string;
    name: string;
    email: string;
    gender: string;
    birth_date: string;
    address: string;
    city: string;
    last_salary: number;
    salary_date: string;
    out_date: string;
    management: boolean;
    deposit: number;
    credit: number;
    deposit_result: number;
    credit_result: number;
    total_shu: number;
    created_at: string;
    update_at: string;
};

const data: IMember[] = members;

export const INITIAL_STATE: IMember[] = data;

export const MEMBER_INIT = 'MEMBER_INIT';
export const MEMBER_ADD = 'MEMBER_ADD';
export const MEMBER_UPDATE = 'MEMBER_UPDATE';
export const MEMBER_UPDATE_DEPOSIT = 'MEMBER_UPDATE_DEPOSIT';
export const MEMBER_UPDATE_CREDIT = 'MEMBER_UPDATE_CREDIT';
export const MEMBER_UPDATE_DEPOSIT_RESULT = 'MEMBER_UPDATE_DEPOSIT_RESULT';
export const MEMBER_UPDATE_CREDIT_RESULT = 'MEMBER_UPDATE_CREDIT_RESULT';
export const MEMBER_UPDATE_RESULT = 'MEMBER_UPDATE_RESULT';
export const MEMBER_REMOVE = 'MEMBER_REMOVE';
export const MEMBER_PERSIST = 'MEMBER_PERSIST';

export const actionInitMember = (data: IMember[]) => ({
    type: MEMBER_INIT,
    payload: data
});

export const actionAddMember = (data: IMember) => ({
    type: MEMBER_ADD,
    payload: data
});

export const actionUpdateMember = (data: IMember) => ({
    type: MEMBER_UPDATE,
    payload: data
});

export const actionUpdateCreditMember = (id: any, data: any) => ({
    type: MEMBER_UPDATE_CREDIT,
    payload: {
        id: id,
        data: data
    }
});

export const actionUpdateDepositMember = (id: any, data: any) => ({
    type: MEMBER_UPDATE_DEPOSIT,
    payload: {
        id: id,
        data: data
    }
});

export const actionUpdateCreditResultMember = (id: any, data: any) => ({
    type: MEMBER_UPDATE_CREDIT_RESULT,
    payload: {
        id: id,
        data: data
    }
});

export const actionUpdateDepositResultMember = (id: any, data: any) => ({
    type: MEMBER_UPDATE_DEPOSIT_RESULT,
    payload: {
        id: id,
        data: data
    }
});

export const actionUpdateResultMember = (data: any) => ({
    type: MEMBER_UPDATE_RESULT,
    payload: data
});

export const actionRemoveMember = (data: IMember) => ({
    type: MEMBER_REMOVE,
    payload: data
});

export const actionPersistMember = (data: IMember) => ({
    type: MEMBER_PERSIST,
    payload: data
});

export const selectorMembers = state => state.member;

export function memberReducer(state: IMember[] = INITIAL_STATE, action: Action): IMember[] {
    switch (action.type) {
        case MEMBER_INIT:
            return action.payload;
        case MEMBER_ADD:
            return [...state, action.payload];
        case MEMBER_UPDATE:
            state.some((item: IMember) => {
                if (item._id === action.payload._id) {
                    item.nik = action.payload.nik;
                    item.name = action.payload.name;
                    item.email = action.payload.email;
                    item.gender = action.payload.gender;
                    item.birth_date = action.payload.birth_date;
                    item.address = action.payload.address;
                    item.city = action.payload.city;
                    item.last_salary = action.payload.last_salary;
                    item.salary_date = action.payload.salary_date;
                    item.out_date = action.payload.out_date;
                    item.created_at = action.payload.created_at;
                    item.update_at = action.payload.update_at;
                    return true;
                }
            });
            return [...state];
        case MEMBER_UPDATE_RESULT:
            state.some((item: IMember) => {
                if (item.nik === action.payload.nik) {
                    item.deposit = action.payload.deposit;
                    item.credit = action.payload.credit;
                    item.deposit_result = action.payload.deposit_result;
                    item.credit_result = action.payload.credit_result;
                    item.total_shu = action.payload.total_shu;
                    return true;
                }
            });
            return [...state];
        case MEMBER_REMOVE:
            return state.filter((data: IMember) => data._id !== action.payload._id);
        default:
            return state;
    }
}