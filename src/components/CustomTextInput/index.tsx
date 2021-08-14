import * as React from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import Typography from '#components/Typography';

import {
    Container,
    ErrorContainer,
    LabelAnimation,
    LabelContainer,
    TextInputStyled,
} from './styles';

type Props = {
    editable?: boolean;
    error?: string;
    label?: string;
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    touched?: boolean;
    value: string;
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

const CustomTextInput = ({
    editable,
    error,
    label,
    onBlur,
    onChangeText,
    secureTextEntry,
    touched,
    value,
}: Props) => {
    const textInputRef = React.useRef<any>(null);

    const [hasFocus, setHasFocus] = React.useState<boolean>(false);

    const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setHasFocus(false);
        onBlur(e);
    };
    const handleOnFocus = () => setHasFocus(true);
    const handleOnPress = () => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };

    return (
        <Container
            editable={editable || true}
            hasFocus={hasFocus}
            onPress={handleOnPress}
        >
            {label && (
                <LabelContainer>
                    <LabelAnimation hasFocus={hasFocus} hasValue={!!value}>
                        <Typography
                            color={error && touched ? 'danger' : 'primary-dark'}
                            fontSize={hasFocus || value ? 12 : 14}
                        >
                            {label.toLowerCase()}
                        </Typography>
                    </LabelAnimation>
                </LabelContainer>
            )}
            <TextInputStyled
                editable={editable}
                hasError={!!error}
                onBlur={handleOnBlur}
                onChangeText={onChangeText}
                onFocus={handleOnFocus}
                ref={textInputRef}
                secureTextEntry={secureTextEntry}
                selectionColor={error ? '#fb6d51' : '#414cb4'}
                value={value}
            />
            <ErrorContainer>
                <Typography color="danger" fontFamily="bold" fontSize={12}>
                    {error && touched ? normalizeError(error) : null}
                </Typography>
            </ErrorContainer>
        </Container>
    );
};

export default CustomTextInput;
