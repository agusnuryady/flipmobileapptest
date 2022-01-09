import React, { memo, useCallback } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { colors, fonts } from '../configs'
import { SORT_LIST, WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'

const SearchComponent = ({
    sortModalVisible,
    setSortModalVisible,
    transactionState,
    setTransactionData,
    sortSelected,
    searchText,
    setSearchText }) => {

    const searchHandle = useCallback(
        (value) => {
            /* ------------- remove special character ------------- */
            var desired = value.replace(/[^\w\s]/gi, '')
            /* ------------- End ------------- */

            /* ------------- Filter multiple variable ------------- */
            let filtered = transactionState.data?.filter((item) => 
                item.beneficiary_name.toLowerCase().match(desired.toLowerCase()) ||
                item.sender_bank.toLowerCase().match(desired.toLowerCase()) ||
                item.beneficiary_bank.toLowerCase().match(desired.toLowerCase()) ||
                item.amount.toString().toLowerCase().match(desired.toLowerCase())
            )
            setSearchText(desired)
            setTransactionData(filtered)
            /* ------------- End ------------- */
        },
        [transactionState.data, setTransactionData],
    )

    return (
        <View style={styles.searchWrap}>
            <View style={styles.leftWrap}>
                <Image 
                    source={require('../assets/icons/searchIcon.webp')} style={styles.searchIcon}
                />
                <TextInput
                    value={searchText}
                    placeholder={WORDS.SEARCH_PLACEHOLDER}
                    style={styles.searchInput}
                    onChangeText={searchHandle}
                />
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.rightWrap} onPress={() => setSortModalVisible(!sortModalVisible)}>
                <Text style={styles.sorterText}>{SORT_LIST[sortSelected].title}</Text>
                <Image 
                    source={require('../assets/icons/chevronDownIcon.webp')}
                    style={styles.chevronDownIcon} 
                />
            </TouchableOpacity>
        </View>
    )
}

export default WithContext(memo(SearchComponent))

const styles = StyleSheet.create({
    searchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginTop: 8,
        marginBottom: 4,
        paddingHorizontal: 8,
        paddingVertical: 16,
        backgroundColor: colors.white,
        borderRadius: 4
    },
    leftWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchIcon: {
        width: 20,
        height: 20,
    },
    searchInput: {
        flexShrink: 1,
        width: '100%',
        paddingVertical: 0,
        paddingHorizontal: 8
    },
    rightWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 8
    },
    sorterText: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.primary
    },
    chevronDownIcon: {
        width: 20,
        height: 20,
    }
})
