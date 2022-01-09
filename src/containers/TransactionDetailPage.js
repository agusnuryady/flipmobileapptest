import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { HeaderComponent, InfoDetailComponent, InfoIdComponent } from '../components'
import { colors } from '../configs'
import { WORDS } from '../constants'
import ContextProvider from '../context/CustomContext'
import styles from '../styles'

export default function TransactionDetailPage({route, navigation}) {
    const item =  route?.params.item
    const contextValues = () => {
        return {
            navigation,
            item
        }
    }

    return (
        <ContextProvider value={contextValues()}>
            <View style={styles.container}>
                <StatusBar backgroundColor={item.status === WORDS.SUCCESS ? colors.darkSuccess : colors.darkPrimary} />
                <HeaderComponent
                    title={item.status === WORDS.SUCCESS ? WORDS.TRANSAKSI_BERHASIL : WORDS.SEDANG_DIPROSES} back={true} color={colors.primary} 
                    color={item.status === WORDS.SUCCESS ? colors.success : colors.primary}
                />
                <InfoIdComponent />
                <InfoDetailComponent />
            </View>
        </ContextProvider>
    )
}
