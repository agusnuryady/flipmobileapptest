import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TransactionDetailPage from '../containers/TransactionDetailPage'
import TransactionListPage from '../containers/TransactionListPage'

const { Navigator, Screen } = createNativeStackNavigator();

const StackNavigator = () => (
    <Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
        <Screen name="TransactionList" component={TransactionListPage} />
        <Screen name="TransactionDetail" component={TransactionDetailPage} />
    </Navigator>
)

const App = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}

export default App;