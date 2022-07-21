import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard } from '../../components/TransactionCard';

import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighLightCards,
    Transactions,
    Title,
    TransactionList
} from './styles';

export function Dashboard() {
    const data = [{
        title: 'Desenvolvimento de site',
        amount: 'R$ 12.400,00',
        category: {
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date: '13/04/2020'
    },
    {
        title: 'Desenvolvimento de site',
        amount: 'R$ 12.400,00',
        category: {
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date: '13/04/2020'
    },
    {
        title: 'Desenvolvimento de site',
        amount: 'R$ 12.400,00',
        category: {
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date: '13/04/2020'
    },
    {
        title: 'Desenvolvimento de site',
        amount: 'R$ 12.400,00',
        category: {
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date: '13/04/2020'
    },
    {
        title: 'Desenvolvimento de site',
        amount: 'R$ 12.400,00',
        category: {
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date: '13/04/2020'
    }]
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: 'https://avatars.githubusercontent.com/u/60995617?v=4'}}
                        />
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Caio</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>
            <HighLightCards >
                <HighLightCard
                    type='up'
                    title='Entradas'
                    amount='R$ 17.400,00'
                    lastTransaction='Última entrada dia 13 de abril'
                />
                <HighLightCard
                    type='down'
                    title='Saídas'
                    amount='R$ 1.259,00'
                    lastTransaction='Última saída dia 03 de abril'
                />
                <HighLightCard
                    type='total'
                    title='Total'
                    amount='R$ 16.141,00'
                    lastTransaction='01 a 16 de abril'
                />
            </HighLightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList 
                    data={data}
                    renderItem={({ item }) => <TransactionCard data={ item } />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: RFPercentage(10),
                    }}
                />
                
            </Transactions>
        </Container>
    )
};