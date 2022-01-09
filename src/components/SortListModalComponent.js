import React, { memo, useCallback, useEffect } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors, fonts } from '../configs'
import { SORT_LIST } from '../constants'
import { WithContext } from '../context/CustomContext'

const SortListModalComponent = ({
    sortModalVisible, 
    setSortModalVisible, 
    sortSelected,
    transactionState,
    setSortSelected, 
    transactionData,
    setSearchText,
    setTransactionData }) => {

    /* ------------- Sorting data function ------------- */
    const sortHandle = useCallback(
        (index) => {
            let sort = []
            switch (index) {
                case 0:
                    sort = transactionState.data
                    setSearchText('')
                    break;
                case 1:
                    sort = transactionData.sort((a, b) => a.beneficiary_name.toLowerCase().localeCompare(b.beneficiary_name.toLowerCase()))
                    break;
                case 2:
                    let nameSorted = sort = transactionData.sort((a, b) => a.beneficiary_name.toLowerCase().localeCompare(b.beneficiary_name.toLowerCase()))
                    sort = nameSorted.reverse()
                    break;
                case 3:
                    let dateSorted = transactionData.sort((a, b) => new Date(a.completed_at) - new Date(b.completed_at))
                    sort = dateSorted.reverse()
                    break;
                    case 4:
                    sort = transactionData.sort((a, b) => new Date(a.completed_at) - new Date(b.completed_at))
                    break;
                default:
                    sort = transactionState.data
                    break;
            }
            setTransactionData(sort)
            setSortSelected(index)
            setSortModalVisible(false)
        },
        [transactionData, setTransactionData, transactionState.data, setSortSelected, setSortModalVisible],
    )
    /* ------------- End ------------- */

    return (
        <Modal
            visible={sortModalVisible}
            transparent={true}
            animationType='fade'
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.modalWrap}
                onPress={() => setSortModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <FlatList
                        data={SORT_LIST}
                        keyExtractor={(item, index) => (`sort item ${index}`)}
                        renderItem={({item, index}) => (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.itemWrap}
                                onPress={() => sortHandle(index)}
                            >
                                <View style={styles.circleWrap}>
                                    {index === sortSelected && <View style={styles.circleIner}/>}
                                </View>
                                <Text style={styles.itemText}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default WithContext(memo(SortListModalComponent))

const styles = StyleSheet.create({
    modalWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalContainer: {
        width: '90%',
        padding: 16,
        borderRadius: 5,
        backgroundColor: colors.white,
    },
    itemWrap: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16
    },
    circleWrap: {
        marginHorizontal: 12,
        width: 16,
        height: 16,
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 16/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleIner: {
        width: 8,
        height: 8,
        backgroundColor: colors.primary,
        borderRadius: 8/2
    },
    itemText: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: colors.text
    }
})
