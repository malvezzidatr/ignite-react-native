import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';
import { HistoryCard } from '../../components/HistoryCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month
} from './styles';
import { VictoryPie } from 'victory-native';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';

interface TransactionData {
    id: string;
    name: string;
    amount: string;
    category: string;
    date: string;
    type: 'positive' | 'negative';
}

interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function Resume() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [categoriesTotal, setCategoriesTotal] = useState<CategoryData[]>([]);
    const theme = useTheme();

    function handleDateChange(action: 'next' | 'previous') {
        if (action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function loadData() {
        const dataKey = '@gofinance:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
            .filter((item: TransactionData) => 
            item.type === 'negative' &&
            new Date(item.date).getMonth() === selectedDate.getMonth() &&
            new Date(item.date).getFullYear() === selectedDate.getFullYear());
        const expensiveTotal = expensives.reduce((acumullator: number, item: TransactionData) => {
            return acumullator + Number(item.amount);
        }, 0);
        const totalByCategory: CategoryData[] = [];
        
        categories.forEach(category => {
            let categorySum = 0;
            
            expensives.forEach((item: TransactionData) => {
                if (item.category === category.key) {
                    categorySum += Number(item.amount);
                }
            });

            if (categorySum) {
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`;
                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    totalFormatted: totalFormatted,
                    color: category.color,
                    percent
                });
            }
        });

        setCategoriesTotal(totalByCategory);
    }

    useEffect(() => {
        loadData();
    }, [selectedDate]);

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            <Content
                showVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight(),
                }}
            >
                <MonthSelect>
                    <MonthSelectButton onPress={() => handleDateChange('previous')}>
                        <MonthSelectIcon name="chevron-left" />
                    </MonthSelectButton>

                    <Month>
                        { format(selectedDate, 'MMMM, yyyy', { locale: ptBR }) }
                    </Month>

                    <MonthSelectButton onPress={() => handleDateChange('next')}>
                        <MonthSelectIcon name="chevron-right" />
                    </MonthSelectButton>
                </MonthSelect>
                
                <ChartContainer>
                    <VictoryPie
                        data={categoriesTotal}
                        colorScale={categoriesTotal.map(item => item.color)}
                        style={{
                            labels: {
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: theme.colors.shape
                            },
                        }}
                        labelRadius={70}
                        x='percent'
                        y='total'
                    />
                </ChartContainer>
                {
                    categoriesTotal.map(({ key, name, totalFormatted, color }) => {
                        return (
                            <HistoryCard
                                key={ key }
                                title={ name }
                                amount={ totalFormatted }
                                color={ color }
                            />
                        )
                    })
                }
            </Content>
        </Container>
    )
}