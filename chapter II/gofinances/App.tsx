import React from 'react';
import { StatusBar, ActivityIndicator } from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { ThemeProvider } from 'styled-components';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import { Routes } from './src/routes';
import { AuthProvider, useAuth } from './src/hooks/auth';


export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    const { userStorageLoading } = useAuth();


    if (!fontsLoaded || userStorageLoading) {
        return <ActivityIndicator size='large' style={{
            marginTop: 400
        }} />;
    }

    return (
        <ThemeProvider theme={ theme }>
            <StatusBar barStyle="light-content"/>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </ThemeProvider>
    )
}