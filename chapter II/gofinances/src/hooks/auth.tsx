import React, { createContext, ReactNode, useContext, useState } from 'react';
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

interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User); 

    async function signInWithGoogle() {

        try {
            const CLIENT_ID = '535761734739-avfcark1oatrhphbjqia7tnoi5sovqah.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@malvezzidatr/gofinances';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

            if (type === 'success') {
                const userInfoURI = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
                const response = await fetch(userInfoURI);
                const userInfo = await response.json();

                setUser({
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                });
            }
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