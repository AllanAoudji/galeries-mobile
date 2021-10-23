import * as React from 'react';

import Typography from '#components/Typography';

import { Container, TextInputStyled } from './styles';

type Props = {
    disable?: boolean;
    label: string;
    maxLength?: number;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    onChangeText: (e: string) => void;
    placeholder?: string;
    selectTextOnFocus?: boolean;
    value: string;
};

const NumberTextInput = ({
    disable,
    label,
    maxLength = 4,
    mb,
    ml,
    mr,
    mt,
    onChangeText,
    placeholder,
    selectTextOnFocus,
    value,
}: Props) => {
    return (
        <Container disable={disable} mb={mb} ml={ml} mr={mr} mt={mt}>
            <TextInputStyled
                editable={!disable}
                keyboardType="numeric"
                maxLength={maxLength}
                onChangeText={onChangeText}
                placeholder={placeholder}
                selectTextOnFocus={selectTextOnFocus}
                value={value}
            />
            <Typography fontFamily="light" fontSize={18}>
                {label}
            </Typography>
        </Container>
    );
};

export default React.memo(NumberTextInput);
