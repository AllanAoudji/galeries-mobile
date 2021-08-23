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
    maxLength?: number;
    multiline?: boolean;
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onChangeText: (text: string) => void;
    optional?: boolean;
    secureTextEntry?: boolean;
    touched: boolean;
    value: string;
};

// TODO:
// Add label animation (position && fontSize)
// Did I need a new component AnimatedTypography?
const CustomTextInput = ({
    editable = true,
    error,
    keyboardType = 'default',
    maxLength,
    multiline = false,
    label,
    loading = false,
    onBlur,
    onChangeText,
    optional = false,
    secureTextEntry,
    touched,
    value,
}: Props) => {
    const textInputRef = React.useRef<any>(null);

    const [hasFocus, setHasFocus] = React.useState<boolean>(false);

    const typographyColor: keyof Style.Colors = React.useMemo(() => {
        if (error && touched) return 'danger';
        if (loading) return 'black';
        return 'primary-dark';
    }, [error, touched, loading]);
    const typographyFontSize: keyof Style.FontSizes = React.useMemo(() => {
        return hasFocus || value ? 12 : 14;
    }, [hasFocus, value]);

    const handleOnBlur = React.useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            setHasFocus(false);
            onBlur(e);
        },
        []
    );
    const handleOnFocus = React.useCallback(() => setHasFocus(true), []);
    const handleOnPress = React.useCallback(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }, []);

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
                            color={typographyColor}
                            fontSize={typographyFontSize}
                        >
                            {`${label.toLowerCase()} ${
                                optional ? ' (optional)' : ''
                            }`}
                        </Typography>
                    </LabelAnimation>
                </LabelContainer>
            )}
            <TextInputStyled
                editable={editable && !loading}
                hasError={!!error && touched}
                keyboardType={keyboardType}
                loading={loading}
                maxLength={maxLength}
                multiline={multiline}
                numberOfLines={multiline ? 5 : 1}
                onBlur={handleOnBlur}
                onChangeText={onChangeText}
                onFocus={handleOnFocus}
                ref={textInputRef}
                secureTextEntry={secureTextEntry}
                selectionColor={!!error && touched ? '#fb6d51' : '#414cb4'}
                value={value}
                style={{ textAlignVertical: multiline ? 'top' : 'center' }}
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
