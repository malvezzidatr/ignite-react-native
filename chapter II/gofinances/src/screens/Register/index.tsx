import React, { useState } from 'react';
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles';

import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

export function Register() {
    const [transactionType, setTransactionType] = useState();

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input
                        placeholder='Nome'
                    />
                    <Input
                        placeholder='Preço'
                    />
                    <TransactionsTypes>
                        <TransactionTypeButton
                            type='up'
                            title='Income'
                            isActive={transactionType === 'up'}
                            onPress={() => handleTransactionsTypeSelect('up')}
                        />
                        <TransactionTypeButton
                            type='down'
                            title='Outcome'
                            isActive={transactionType === 'down'}
                            onPress={() => handleTransactionsTypeSelect('down')}
                        />
                    </TransactionsTypes>
                </Fields>
                <Button title='Enviar' />
            </Form>
        </Container>
    );
};