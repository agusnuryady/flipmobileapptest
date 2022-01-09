import React, { memo, useCallback, useState } from 'react'
import { Image, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native'
import { colors, fonts } from '../configs'
import { WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'
import { DateFormatID, NumberToCurrency } from '../utils'

const InfoDetailComponent = ({item}) => {
    const [isExpand, setIsExpand] = useState(true)

    /* ------------- Create Expand Animation Effect ------------- */
    const toggleExpand = useCallback(
        () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            setIsExpand(!isExpand)
        },
        [setIsExpand, isExpand],
    )

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    /* ------------- End ------------- */

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.titleText}>{WORDS.DETAIL_TRANSAKSI}</Text>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.showwrap}
                    onPress={toggleExpand}
                >
                    <Text style={styles.showText}>{isExpand ? WORDS.TUTUP : WORDS.LIHAT}</Text>
                </TouchableOpacity>
            </View>
            {isExpand && (
                <View style={styles.detailContainer}>
                    <View style={[styles.bankWrap, styles.mrb16]}>
                        <Text style={styles.bankText}>{item.sender_bank}</Text>
                        <Image
                            source={require('../assets/icons/arroLeftIcon.webp')}
                            style={styles.arrowIcon}
                        />
                        <Text style={styles.bankText}>{item.beneficiary_bank}</Text>
                    </View>
                    <View style={[styles.profileWrap, styles.mrb16]}>
                        <View style={styles.leftProfileWrap}>
                            <Text style={[styles.subTitleText, {textTransform: 'uppercase'}]}>{item.beneficiary_name}</Text>
                            <Text style={styles.descText}>{item.account_number}</Text>
                        </View>
                        <View style={styles.rightProfileWrap}>
                            <Text style={styles.subTitleText}>{WORDS.NOMINAL}</Text>
                            <Text style={styles.descText}>{NumberToCurrency(item.amount)}</Text>
                        </View>
                    </View>
                    <View style={[styles.profileWrap, styles.mrb16]}>
                        <View style={styles.leftProfileWrap}>
                            <Text style={styles.subTitleText}>{WORDS.BERITA_TRANSFER}</Text>
                            <Text style={styles.descText}>{item.remark}</Text>
                        </View>
                        <View style={styles.rightProfileWrap}>
                            <Text style={styles.subTitleText}>{WORDS.KODE_UNIK}</Text>
                            <Text style={styles.descText}>{item.unique_code}</Text>
                        </View>
                    </View>
                    <View style={styles.profileWrap}>
                        <View style={styles.leftProfileWrap}>
                            <Text style={styles.subTitleText}>{WORDS.WAKTU_DIBUAT}</Text>
                            <Text style={styles.descText}>{DateFormatID(item.created_at)}</Text>
                        </View>
                    </View>
                </View>
            )}
        </>
    )
}

export default WithContext(memo(InfoDetailComponent))

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    titleText: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.text
    },
    showwrap: {
        padding: 4
    },
    showText: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.primary
    },
    detailContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: colors.white
    },
    bankWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    bankText: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.text,
        textTransform: 'uppercase'
    },
    arrowIcon: {
        width: 14,
        height: 14,
        marginHorizontal: 4
    },
    profileWrap: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    leftProfileWrap: {
        flex: 1
    },
    rightProfileWrap: {
        flex: 1,
        paddingLeft: 16
    },
    subTitleText: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.text,
        marginBottom: 4
    },
    descText: {
        fontFamily: fonts.regular,
        fontSize: 12,
        color: colors.text
    },
    mrb16: {
        marginBottom: 16
    }
})
