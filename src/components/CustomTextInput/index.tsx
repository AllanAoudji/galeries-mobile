import * as React from 'react';
import { Pressable } from 'react-native';

import Typography from '#components/Typography';

import {
    ErrorContainer,
    LabelAnimation,
    LabelContainer,
    TextInputStyled,
} from './styles';

type Props = {
    label?: string;
    error?: string;
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

const CustomTextInput = ({ label, error }: Props) => {
    const textInputRef = React.useRef<any>(null);

    const [hasFocus, setHasFocus] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string>('');

    const handleOnChangeText = (e: string) => setValue(e);
    const handleOnBlur = () => setHasFocus(false);
    const handleOnFocus = () => setHasFocus(true);
    const handleOnPress = () => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };

    return (
        <Pressable onPress={handleOnPress}>
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
                onChangeText={handleOnChangeText}
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
