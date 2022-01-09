import React, { memo } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors, fonts } from '../configs'
import { WithContext } from '../context/CustomContext'

const HeaderComponent = ({navigation, title='', back=false, color=colors.primary}) => {
    return (
        <View style={[styles.container, colors && {backgroundColor: color}]}>
            {back && (
                <TouchableOpacity 
                    activeOpacity={0.5}
                    style={styles.backWrap}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={require('../assets/icons/backIcon.webp')} style={styles.backIcon} />
                </TouchableOpacity>
            )}
            {title && <Text style={styles.headerText}>{title}</Text>}
        </View>
    )
}

export default WithContext(memo(HeaderComponent)) 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: colors.primary
    },
    headerText: {
        fontFamily: fonts.bold,
        fontSize: 18,
        color: colors.white
    },
    backWrap: {
        padding: 4,
        alignSelf: 'center'
    },
    backIcon: {
        width: 20,
        height: 20,
        marginRight: 16
    }
})
