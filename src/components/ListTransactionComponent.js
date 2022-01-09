import React, { memo } from 'react'
import { Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors, fonts } from '../configs'
import { WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'
import { DateFormatID, NumberToCurrency } from '../utils'

const ListTransactionComponent = ({transactionData, transactionState, refreshTransaction, navigation}) => {

    const transactionItem = ({item, index}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.itemWrap, item.status === WORDS.SUCCESS && {borderLeftColor: colors.success}]}
                onPress={() => navigation.navigate('TransactionDetail', {item})}
            >
                <View style={styles.infoWrap}>
                    <View style={[styles.bankWrap, styles.mrb4]}>
                        <Text style={styles.bankText}>{item.sender_bank}</Text>
                        <Image
                            source={require('../assets/icons/arroLeftIcon.webp')}
                            style={styles.arrowIcon}
                        />
                        <Text style={styles.bankText}>{item.beneficiary_bank}</Text>
                    </View>
                    <Text style={[styles.nameText, styles.mrb4]}>{item.beneficiary_name}</Text>
                    <Text style={styles.bankWrap}>
                        <Text style={styles.descText}>{NumberToCurrency(item.amount)}</Text>
                        <Text style={[styles.descText, styles.mrH4]}>{' ● '}</Text>
                        <Text style={styles.descText}>{DateFormatID(item.completed_at)}</Text>
                    </Text>
                </View>
                <View style={item.status === WORDS.SUCCESS ? styles.labelSuccesWrap : styles.labelPendingWrap}>
                    <Text style={item.status === WORDS.SUCCESS ? styles.succesText : styles.pendingText}>{item.status === 'SUCCESS' ? WORDS.BERHASIL : WORDS.PENGECEKAN}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={transactionData}
            keyExtractor={(item, index) => `tr list ${index}`}
            renderItem={transactionItem}
            style={styles.listWrap}
            contentContainerStyle={styles.pdb8}
            ListEmptyComponent={
                <View style={styles.emptyWrap}>
                    {!transactionState.fetching &&  (
                        <>
                            <Image
                                source={require('../assets/icons/emptyIcon.webp')}
                                style={styles.emptyIcon}
                            />
                            <Text style={styles.emptyText}>{WORDS.TRANSAKSI_KOSONG}</Text>
                        </>
                    )}
                </View>
            }
            refreshControl={
                <RefreshControl 
                    refreshing={transactionState.fetching}
                    onRefresh={() => refreshTransaction()}
                />
            }
        />
    )
}

export default WithContext(memo(ListTransactionComponent))

const styles = StyleSheet.create({
    listWrap: {
        paddingHorizontal: 8,
    },
    pdb8: {
        paddingBottom: 8
    },
    itemWrap: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        marginVertical: 4,
        padding: 12,
        borderLeftWidth: 6,
        borderRadius: 4,
        borderLeftColor: colors.primary
    },
    infoWrap: {
        flex:1,
        paddingRight: 8
    },
    bankWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    bankText: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.text,
        textTransform: 'uppercase'
    },
    mrb4: {
        marginBottom: 4
    },
    mrH4: {
        marginHorizontal: 4
    },
    nameText: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.text,
        textTransform: 'uppercase'
    },
    descText: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.text,
    },
    arrowIcon: {
        width: 14,
        height: 14,
        marginHorizontal: 4
    },
    labelSuccesWrap: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: colors.success,
        borderRadius: 6
    },
    labelPendingWrap: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderColor: colors.primary,
        borderWidth: 2,
        borderRadius: 6
    },
    succesText: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.white,
    },
    pendingText: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.text,
    },
    emptyWrap: {
        width: '100%',
        height: Dimensions.get('window').height * 0.75,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.text,
        textAlign: 'center'
    },
    emptyIcon: {
        width: 60,
        height: 60,
        marginBottom: 12
    }
})
