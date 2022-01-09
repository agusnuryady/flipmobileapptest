import { all, fork } from 'redux-saga/effects';

/* ------------- Sagas ------------- */
import { fetchTransactionList } from './TransactionSaga'

function * ClientSagas () {
    yield all([
        fork(fetchTransactionList)
    ])
}

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
    yield all([
        fork(ClientSagas)
    ])
}