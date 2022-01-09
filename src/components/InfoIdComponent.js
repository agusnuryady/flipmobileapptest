import React, { memo, useCallback } from 'react'
import { Clipboard, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '../configs'
import { WORDS } from '../constants'
import { WithContext } from '../context/CustomContext'

const InfoIdComponent = ({item}) => {

    const copyHandle = useCallback(
        () => {
            Clipboard.setString(item.id)
            ToastAndroid.show(WORDS.COPY_ID_BERHASIL, ToastAndroid.SHORT)
        },
        [item],
    )

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{WORDS.ID_TRANSAKSI}{item.id}</Text>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.copyWrap}
                onPress={copyHandle}
            >
                <Image source={require('../assets/icons/copyIcon.webp')} style={styles.copyIcon} />
            </TouchableOpacity>
        </View>
    )
}

export default WithContext(memo(InfoIdComponent))

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.white,
        marginBottom: 2
    },
    titleText: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.text
    },
    copyWrap: {
        paddingHorizontal: 8
    },
    copyIcon: {
        width: 21,
        height: 21,
    },
})
