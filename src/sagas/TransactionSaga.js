import { put, takeLeading } from 'redux-saga/effects'

import TransactionActions, { TransactionTypes } from '../redux/TransactionRedux';

export function * fetchTransactionList () {
    yield takeLeading(TransactionTypes.TRANSACTION_LIST_REQUEST, fetchTransactionListAPI)
}

export function * fetchTransactionListAPI () {
    try {
        const respnse = yield fetch('https://nextar.flip.id/frontend-test')
        if (respnse.ok) {
            const dataObj = yield respnse.json()
            yield put(TransactionActions.transactionListSuccess(Object.values(dataObj)))
        } else {
            yield put(TransactionActions.transactionListFailure(respnse.statusText))
        }
    } catch (error) {
        yield put(TransactionActions.transactionListFailure(error))
    }
}