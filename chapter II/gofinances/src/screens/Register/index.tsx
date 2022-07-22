import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor númerico').positive('O valor não pode ser negativo').required('O valor é obrigatório')
})

export function Register() {
    const [transactionType, setTransactionType] = useState<string>();
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
    const [category, setCategory] = useState<Category>({
        key: 'category',
        name: 'Categoria',
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

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
        if(!transactionType) return Alert.alert('Selecione o tipo da transação');
        
        if(category.key === 'category') return Alert.alert('Selecione a categoria');
        const data = {
            amount: form.amount,
            name: form.name,
            transactionType,
            category: category.key
        }

        console.log(data)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm 
                            name='amount'
                            control={control}
                            placeholder="Preço"
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
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
        </TouchableWithoutFeedback>
    );
};