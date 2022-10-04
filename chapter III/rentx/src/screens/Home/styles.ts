import styled from 'styled-components/native'

export const Container = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
`;