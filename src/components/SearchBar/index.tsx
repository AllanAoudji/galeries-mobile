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
    onStopTyping: () => void;
    value: string;
};

// TODO:
// Need a real searchBar...
const SearchBar = ({ value, onChangeText, onStopTyping }: Props) => {
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const handleChangeText = React.useCallback(
        (e) => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(onStopTyping, 1000);
            onChangeText(e);
        },
        [onChangeText]
    );

    React.useEffect(
        () => () => {
            if (timer.current) clearTimeout(timer.current);
        },
        []
    );

    return (
        <Container>
            <TextInputStyled onChangeText={handleChangeText} value={value} />
        </Container>
    );
};

export default SearchBar;
