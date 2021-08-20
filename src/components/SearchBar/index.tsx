import * as React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    height: 38px;
    border-color: ${({ theme }) => theme.colors.black};
    border-width: 2px;
    border-radius: 5px;
`;
const TextInputStyled = styled.TextInput`
    height: 100%;
`;

type Props = {
    onChangeText: (text: string) => void;
    value: string;
};

const SearchBar = ({ value, onChangeText }: Props) => {
    return (
        <Container>
            <TextInputStyled onChangeText={onChangeText} value={value} />
        </Container>
    );
};

export default SearchBar;
