import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import LogoSvg from '../../assets/logo.svg';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer
} from './styles';

export function SignIn() {
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
            <Footer></Footer>
        </Container>
    );
};