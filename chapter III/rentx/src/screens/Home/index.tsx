import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/assets/logo.svg'

import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CarList
} from './styles';

import { Car } from '../../components/Car';

export function Home(){
    const CarData = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'Ao dia',
            price: 120,
        },
        thumbnail: '',
    }
   
    return (
        <Container>
            <StatusBar
                barStyle='light-content'
                backgroundColor='transparent'
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo 
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>
            <CarList
                data={[1,2,3, 4, 5, 6, 7]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => <Car data={CarData} />}
            />
            <Car data={CarData}/>
        </Container>
    );
}