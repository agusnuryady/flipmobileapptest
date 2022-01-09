import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import styles from '../styles'
import { WORDS } from '../constants'
import { HeaderComponent, ListTransactionComponent, SearchComponent, SortListModalComponent } from '../components'
import ContextProvider from '../context/CustomContext'
import TransactionActions from '../redux/TransactionRedux'

export default function TransactionListPage({ navigation }) {
    const dispatch = useDispatch()
    const transactionState = useSelector(state => state.transaction)
    const [sortModalVisible, setSortModalVisible] = useState(false)
    const [transactionData, setTransactionData] = useState(transactionState.data)
    const [sortSelected, setSortSelected] = useState(0)
    const [searchText, setSearchText] = useState('')

    /* ------------- Get data when first time render ------------- */
    useEffect(() => {
        dispatch(TransactionActions.transactionListRequest())
    }, [])
    /* ------------- End ------------- */

    /* ------------- Triger When redux data change ------------- */
    useEffect(() => {
        setTransactionData(transactionState.data)
        setSortSelected(0)
        setSearchText('')
    }, [transactionState.data])
    /* ------------- End ------------- */

    const contextValues = () => {
        return {
            navigation,
            transactionState,
            transactionData,
            sortModalVisible,
            sortSelected,
            searchText,
            setTransactionData,
            setSortModalVisible,
            setSortSelected,
            setSearchText,
            refreshTransaction: () => dispatch(TransactionActions.transactionListRequest())
        }
    }

    return (
        <ContextProvider value={contextValues()}>
            <View style={styles.container}>
                <HeaderComponent title={WORDS.CATATAN_TRANSAKSI} />
                <SearchComponent />
                <SortListModalComponent />
                <ListTransactionComponent />
            </View>
        </ContextProvider>
    )
}
