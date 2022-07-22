import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles';

import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Forms/InputForm';

interface Category {
    key: string;
    name: string;
}

interface FormData {
    name: string;
    amount: string;
}

export function Register() {
    const [transactionType, setTransactionType] = useState<string>();
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
    const [category, setCategory] = useState<Category>({
        key: 'category',
        name: 'Categoria',
    });

    const {
        control,
        handleSubmit
    } = useForm();

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }
    
    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    function handleRegister(form: FormData) {
        const data = {
            name: form.name,
            amount: form.amount
        }
        console.log(data)
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <InputForm 
                        name='name'
                        control={control}
                        placeholder="Nome"
                    />
                    <InputForm 
                        name='amount'
                        control={control}
                        placeholder="Preço"
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
                    <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
                </Fields>
                <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
            </Form>
            <Modal visible={categoryModalOpen} statusBarTranslucent={true} >
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    );
};