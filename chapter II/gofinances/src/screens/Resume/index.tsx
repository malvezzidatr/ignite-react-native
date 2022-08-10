import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '../../components/HistoryCard';
import {
    Container,
    Header,
    Title,
    Content
} from './styles';
import { categories } from '../../utils/categories';

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
    total: string;
    color: string;
}

export function Resume() {
    const [categoriesTotal, setCategoriesTotal] = useState<CategoryData[]>([]);

    async function loadData() {
        const dataKey = '@gofinance:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted.filter((item: TransactionData) => item.type === 'negative');
        
        const totalByCategory: CategoryData[] = [];
        
        categories.forEach(category => {
            let categorySum = 0;
            
            expensives.forEach((item: TransactionData) => {
                if (item.category === category.key) {
                    categorySum += Number(item.amount);
                }
            });

            if (categorySum) {
                const total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });
                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total,
                    color: category.color
                });
            }
        });

        setCategoriesTotal(totalByCategory);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            <Content>
                {
                    categoriesTotal.map(({ key, name, total, color }) => {
                        return (
                            <HistoryCard
                                key={ key }
                                title={ name }
                                amount={ total }
                                color={ color }
                            />
                        )
                    })
                }
            </Content>
        </Container>
    )
}