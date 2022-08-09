import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

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
    TransactionList,
    LogoutButton,
    LoadContainer
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string
}
interface HighlightData {
    entries: HighlightProps,
    expensive: HighlightProps,
    total: HighlightProps
}

export function Dashboard() {
    const [isLoading, setIsloading] = useState<boolean>(true);
    const [data, setData] = useState<DataListProps[]>();
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();

    async function loadTransactions() {
        const dataKey = '@gofinance:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];
        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
            if (item.type === 'positive') {
                entriesTotal += Number(item.amount);
            } else {
                expensiveTotal += Number(item.amount);
            }

            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
        });

        const total = entriesTotal - expensiveTotal;

        setData(transactionsFormatted);
        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensive: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            }
        });
        setIsloading(false);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>
            
            {
                isLoading ?
                    <LoadContainer >
                        <ActivityIndicator size='large' color={theme.colors.primary} /> 
                    </LoadContainer>
                :
                <>
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
                            <LogoutButton onPress={() => {}}>
                                <Icon name="power" />
                            </LogoutButton>
                        </UserWrapper>
                    </Header>
                    <HighLightCards >
                        <HighLightCard
                            type='up'
                            title='Entradas'
                            amount={highlightData.entries.amount}
                            lastTransaction='Última entrada dia 13 de abril'
                        />
                        <HighLightCard
                            type='down'
                            title='Saídas'
                            amount={highlightData.expensive.amount}
                            lastTransaction='Última saída dia 03 de abril'
                        />
                        <HighLightCard
                            type='total'
                            title='Total'
                            amount={highlightData.total.amount}
                            lastTransaction='01 a 16 de abril'
                        />
                    </HighLightCards>

                    <Transactions>
                        <Title>Listagem</Title>

                        <TransactionList 
                            data={data}
                            keyExtractor={ item => item.id }
                            renderItem={({ item }) => <TransactionCard data={ item } />}
                            
                        />
                        
                    </Transactions>
                </>
            } 
        </Container>
    )
};