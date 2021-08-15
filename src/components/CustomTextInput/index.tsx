import * as React from 'react';
import {
    KeyboardType,
    NativeSyntheticEvent,
    TextInputFocusEventData,
} from 'react-native';

import Typography from '#components/Typography';
import normalizeError from '#helpers/normalizeError';

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
    keyboardType?: KeyboardType;
    label?: string;
    loading?: boolean;
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    touched: boolean;
    value: string;
};

const CustomTextInput = ({
    editable = true,
    error,
    keyboardType = 'default',
    label,
    loading = false,
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
            loading={loading}
            onPress={handleOnPress}
        >
            {label && (
                <LabelContainer>
                    <LabelAnimation hasFocus={hasFocus} hasValue={!!value}>
                        <Typography
                            color={(() => {
                                if (error && touched) {
                                    return 'danger';
                                }
                                if (loading) {
                                    return 'black';
                                }
                                return 'primary-dark';
                            })()}
                            fontSize={hasFocus || value ? 12 : 14}
                        >
                            {label.toLowerCase()}
                        </Typography>
                    </LabelAnimation>
                </LabelContainer>
            )}
            <TextInputStyled
                editable={editable && !loading}
                hasError={!!error && touched}
                keyboardType={keyboardType}
                loading={loading}
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
