import * as React from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';

import Typography from '../Typography';

type PropsComponent = {
    label?: string;
    error?: string;
};
type PropsLavelAnimation = {
    hasFocus: boolean;
    hasValue: boolean;
};
type PropsTextInputStyled = {
    hasError: boolean;
    hasFocus: boolean;
};

const normalizeError = (error: string | undefined) => {
    if (!error) {
        return null;
    }
    const capitalizeError = error[0].toUpperCase() + error.slice(1);
    const capitalizeErrorWithDot = capitalizeError.endsWith('.')
        ? capitalizeError
        : `${capitalizeError}.`;
    return capitalizeErrorWithDot;
};

const ErrorContainer = styled.View`
    align-items: flex-end;
    height: 17px;
    justify-content: center;
`;
const LabelAnimation = styled.View<PropsLavelAnimation>`
    opacity: ${(props) => (props.hasFocus ? 1 : 0.5)};
    position: absolute;
    top: ${(props) => (props.hasFocus || props.hasValue ? 0 : '21px')};
`;
const LabelContainer = styled.View`
    height: 14px;
`;
const TextInputStyled = styled.TextInput<PropsTextInputStyled>`
    border-bottom-color: ${(props) => (props.hasError ? '#fb6d51' : '#414cb4')};
    border-bottom-width: 2px;
    color: #212226;
    font-family: 'HelveticaLtStRoman';
    font-size: 14px;
    height: 30px;
    opacity: ${(props) => (props.hasFocus ? 1 : 0.5)};
`;

const CustomTextInput = ({ label, error }: PropsComponent) => {
    const textInputRef = React.useRef<any>(null);

    const [hasFocus, setHasFocus] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string>('');

    const handleChangeText = (e: string) => setValue(e);
    const handleOnBlur = () => setHasFocus(false);
    const handleOnFocus = () => setHasFocus(true);
    const handlePress = () => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };

    return (
        <Pressable onPress={handlePress}>
            {label && (
                <LabelContainer>
                    <LabelAnimation hasFocus={hasFocus} hasValue={!!value}>
                        <Typography
                            color={error ? 'danger' : 'primary-dark'}
                            fontSize={hasFocus || value ? 12 : 14}
                        >
                            {label.toLowerCase()}
                        </Typography>
                    </LabelAnimation>
                </LabelContainer>
            )}
            <TextInputStyled
                hasError={!!error}
                hasFocus={hasFocus}
                onBlur={handleOnBlur}
                onChangeText={handleChangeText}
                onFocus={handleOnFocus}
                ref={textInputRef}
                selectionColor={error ? '#fb6d51' : '#414cb4'}
                value={value}
            />
            <ErrorContainer>
                <Typography color="danger" fontFamily="bold" fontSize={12}>
                    {normalizeError(error)}
                </Typography>
            </ErrorContainer>
        </Pressable>
    );
};

export default CustomTextInput;
