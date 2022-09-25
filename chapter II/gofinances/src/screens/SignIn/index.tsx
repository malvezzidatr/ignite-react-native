import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import LogoSvg from '../../assets/logo.svg';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles';
import { useTheme } from 'styled-components';

export function SignIn() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { signInWithGoogle, signInWithApple } = useAuth();
    const theme = useTheme();

    async function handleSignInWithGoogle() {
        try {
            setIsLoading(true);
            return await signInWithGoogle();
        } catch(error:any) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Google');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSignInWithApple() {
        try {
            setIsLoading(true);
            return await signInWithApple();
        } catch(error:any) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Apple');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg width={RFValue(120)} height={RFValue(68)}/>
                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça seu login com {'\n'}
                    umas das contas abaixo
                </SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    <SignInSocialButton
                        title="Entrar com Apple"
                        svg={AppleSvg}
                        onPress={handleSignInWithApple}
                    />
                </FooterWrapper>
                {isLoading && 
                    <ActivityIndicator 
                        size='large'
                        style={{marginTop: 40 }}
                        color={theme.colors.primary}
                    />
                }
            </Footer>
        </Container>
    );
};