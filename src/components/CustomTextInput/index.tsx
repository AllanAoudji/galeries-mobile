import * as React from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';

import Typography from '../Typography';

type PropsComponent = {
    label?: string;
    error?: string;
};
type PropsTextInputStyled = {
    hasError: boolean;
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
    height: 20px;
    justify-content: center;
`;
const LabelContainer = styled.View`
    margin-left: 10px;
`;
const TextInputStyled = styled.TextInput<PropsTextInputStyled>`
    border-color: ${(props) => (props.hasError ? '#fb6d51' : '#414cb4')};
    border-radius: 5px;
    border-width: 2px;
    font-size: 18px;
    height: 38px;
    padding-left: 10px;
`;

const CustomTextInput = ({ label, error }: PropsComponent) => {
    const textInputRef = React.useRef<any>(null);
    const [, setHasFocus] = React.useState<boolean>(false);

    const handlePress = () => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };
    const handleOnFocus = () => setHasFocus(true);
    const handleOnBlur = () => setHasFocus(false);

    return (
        <Pressable onPress={handlePress}>
            {label && (
                <LabelContainer>
                    <Typography color={error ? 'danger' : 'primary-dark'}>
                        {label.toLowerCase()}
                    </Typography>
                </LabelContainer>
            )}
            <TextInputStyled
                hasError={!!error}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                ref={textInputRef}
                selectionColor={error ? '#fb6d51' : '#414cb4'}
            />
            <ErrorContainer>
                <Typography color="danger" fontFamily="bold">
                    {normalizeError(error)}
                </Typography>
            </ErrorContainer>
        </Pressable>
    );
};

export default CustomTextInput;
