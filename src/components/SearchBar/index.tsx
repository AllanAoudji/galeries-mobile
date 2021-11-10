import * as React from 'react';

import Pictogram from '#components/Pictogram';

import {
    Container,
    PictogramContainer,
    QuitContainer,
    TextInputStyled,
} from './styles';

type Props = {
    maxLength?: number;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    onChangeText: (text: string) => void;
    onFocus?: () => void;
    onStopTyping: () => void;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    value: string;
};

const DELAY = 1000;
const QUIT_CUSTOM_SIZE = { height: 11, width: 11 };

const SearchBar = ({
    maxLength = 50,
    mb,
    ml,
    mr,
    mt,
    onChangeText,
    onFocus,
    onStopTyping,
    setValue,
    value,
}: Props) => {
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChangeText = React.useCallback(
        (e) => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(onStopTyping, DELAY);
            setValue(e);
            onChangeText(e);
        },
        [onChangeText, onStopTyping]
    );

    const handleClear = React.useCallback(() => {
        setValue('');
        onChangeText('');
        onStopTyping();
        if (timer.current) clearTimeout(timer.current);
    }, []);

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
                maxLength={maxLength}
                onFocus={onFocus}
                onChangeText={handleChangeText}
                value={value}
            />
            {value !== '' && (
                <QuitContainer onPress={handleClear}>
                    <Pictogram customSize={QUIT_CUSTOM_SIZE} variant="quit" />
                </QuitContainer>
            )}
        </Container>
    );
};

export default SearchBar;
