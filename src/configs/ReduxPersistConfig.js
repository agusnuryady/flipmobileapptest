import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [], // select reducer to persist or permanent
    blacklist: [], // something temporary
};

export default persistConfig;
