import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string; 
}

interface IAuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState<boolean>(true);
    const userStorageKey = '@gofinances:user';

    useEffect(() => {
        async function loadUserStorageData(): Promise<void> {
            const userStoraged = await AsyncStorage.getItem(userStorageKey);
            
            if(userStoraged) {
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged);
            }
            setUserStorageLoading(false);
        }
        loadUserStorageData();
    }, [])

    async function signInWithGoogle() {

        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
            if (type === 'success') {
                const userInfoURI = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
                const response = await fetch(userInfoURI);
                const userInfo = await response.json();
                const userData = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                }
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userData))
            }
        } catch (error:any) {
            throw new Error(error);
        }
    };

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });

            if (credential) {
                const userData = {
                    id: String(credential.user),
                    email: credential.email ?? '',
                    name: credential.fullName?.givenName ?? '',
                    photo: undefined
                }
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userData))
            }

        } catch(error: any) {
            throw new Error(error);
        }
    };

    return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
        { children }
    </AuthContext.Provider>
    );
};

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }