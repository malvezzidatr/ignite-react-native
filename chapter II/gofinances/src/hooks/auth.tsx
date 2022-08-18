import React, { createContext, ReactNode, useContext } from 'react';
import * as AuthSession from 'expo-auth-session';

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
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const user = {
        id: '12',
        name: 'Caio',
        email: 'caiomalvezzi@gmail.com'
    }

    async function signInWithGoogle() {

        try {
            const CLIENT_ID = '535761734739-avfcark1oatrhphbjqia7tnoi5sovqah.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@malvezzidatr/gofinances';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            const response = await AuthSession.startAsync({ authUrl });
            console.log(response);

        } catch (error:any) {
            throw new Error(error);
        }
    };

    return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
        { children }
    </AuthContext.Provider>
    );
};

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }