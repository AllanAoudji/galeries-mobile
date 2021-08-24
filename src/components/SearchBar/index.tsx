import * as React from 'react';
import styled from 'styled-components/native';

import Pictogram from '#components/Pictogram';

type Props = {
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    onChangeText: (text: string) => void;
    onFocus?: () => void;
    onStopTyping: () => void;
    value: string;
};

type PropsContainer = {
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
};

const Container = styled.Pressable<PropsContainer>`
    border-color: ${({ theme }) => theme.colors.black};
    border-radius: 4px;
    border-width: 2px;
    flex-direction: row;
    height: 34px;
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
    margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
`;
const PictogramContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    opacity: 0.3;
`;
const TextInputStyled = styled.TextInput`
    flex: 1;
`;

const DELAY = 1000;

const SearchBar = ({
    mb,
    ml,
    mr,
    mt,
    onChangeText,
    onFocus,
    onStopTyping,
    value,
}: Props) => {
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const handleChangeText = React.useCallback(
        (e) => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(onStopTyping, DELAY);
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
        <Container mb={mb} ml={ml} mr={mr} mt={mt}>
            <PictogramContainer>
                <Pictogram size="small" variant="search" />
            </PictogramContainer>
            <TextInputStyled
                maxLength={50}
                onFocus={onFocus}
                onChangeText={handleChangeText}
                value={value}
            />
        </Container>
    );
};

export default SearchBar;
