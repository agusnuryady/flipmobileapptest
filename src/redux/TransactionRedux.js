import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    transactionListRequest: ['data'],
    transactionListSuccess: ['data'],
    transactionListFailure: ['err']
})

export const TransactionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    success: false,
    data: null,
    err: null
}

/* ------------- Reducers ------------- */

export const request = (state) => {
    return {
        ...state,
        fetching: true,
        success: false,
        err: null,
    }
}

export const success = (state, { data }) => {
    return {
        ...state,
        fetching: false,
        success: true,
        err: null,
        data
    }
}

export const failure = (state, { err }) => {
    return {
        ...state,
        fetching: false,
        success: false,
        err
    }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.TRANSACTION_LIST_REQUEST]: request,
    [Types.TRANSACTION_LIST_SUCCESS]: success,
    [Types.TRANSACTION_LIST_FAILURE]: failure
})