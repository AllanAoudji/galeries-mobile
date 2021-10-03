import * as React from 'react';
import {
    KeyboardType,
    NativeSyntheticEvent,
    Pressable,
    StyleProp,
    StyleSheet,
    TextInputFocusEventData,
    TextStyle,
} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import AnimatedTypography from '#components/AnimatedTypography';
import Typography from '#components/Typography';
import { ANIMATIONS } from '#helpers/constants';
import normalizeError from '#helpers/normalizeError';

import {
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
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    optional?: boolean;
    secureTextEntry?: boolean;
    touched: boolean;
    value: string;
};

const AFTER_ANIMATION_LABEL_FONT_SIZE = 10;
const ANIMATION_TIMING = 100;
const INITIAL_CONTAINER_OPACITY = 0.5;
const INITIAL_LABEL_CONTAINER_OPACITY = 0.5;
const INITIAL_LABEL_CONTAINER_TOP = 21;
const INITIAL_LABEL_FONT_SIZE = 12;

const CustomTextInput = ({
    editable = true,
    error,
    keyboardType = 'default',
    maxLength,
    multiline = false,
    label,
    loading = false,
    onFocus,
    onBlur,
    onChangeText,
    optional = false,
    secureTextEntry,
    touched,
    value,
}: Props) => {
    const textInputRef = React.useRef<any>(null);

    const [hasFocus, setHasFocus] = React.useState<boolean>(false);

    const animatedFocus = useSharedValue(0);
    const containerOpacity = useSharedValue(INITIAL_CONTAINER_OPACITY);
    const containerStyle = useAnimatedStyle(
        () => ({
            opacity: containerOpacity.value,
        }),
        []
    );
    const labelContainerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            animatedFocus.value,
            [0, 1],
            [INITIAL_LABEL_CONTAINER_OPACITY, 1]
        );
        const top = interpolate(
            animatedFocus.value,
            [0, 1],
            [INITIAL_LABEL_CONTAINER_TOP, 0]
        );
        return { opacity, top };
    }, []);
    const labelStyle = useAnimatedStyle(() => {
        const fontSize = interpolate(
            animatedFocus.value,
            [0, 1],
            [INITIAL_LABEL_FONT_SIZE, AFTER_ANIMATION_LABEL_FONT_SIZE]
        );
        return { fontSize };
    }, []);

    const typographyColor: keyof Style.Colors = React.useMemo(() => {
        if (error && touched) return 'danger';
        if (loading) return 'black';
        return 'primary-dark';
    }, [error, touched, loading]);

    const handleOnBlur = React.useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            setHasFocus(false);
            onBlur(e);
        },
        []
    );
    const handleOnFocus = React.useCallback((e) => {
        setHasFocus(true);
        if (onFocus) onFocus(e);
    }, []);
    const handleOnPress = React.useCallback(() => {
        if (textInputRef.current) textInputRef.current.focus();
    }, []);

    // Container animation.
    React.useLayoutEffect(() => {
        if (hasFocus && editable && !loading)
            containerOpacity.value = withTiming(
                1,
                ANIMATIONS.TIMING_CONFIG(ANIMATION_TIMING)
            );
        else
            containerOpacity.value = withTiming(
                INITIAL_CONTAINER_OPACITY,
                ANIMATIONS.TIMING_CONFIG(ANIMATION_TIMING)
            );
    }, [editable, hasFocus, loading]);
    // Label/LabelContainer animation
    React.useLayoutEffect(() => {
        if (hasFocus || value)
            animatedFocus.value = withTiming(
                1,
                ANIMATIONS.TIMING_CONFIG(ANIMATION_TIMING)
            );
        else
            animatedFocus.value = withTiming(
                0,
                ANIMATIONS.TIMING_CONFIG(ANIMATION_TIMING)
            );
    }, [hasFocus, value]);

    return (
        <Pressable onPress={handleOnPress}>
            <Animated.View style={containerStyle}>
                {label && (
                    <LabelContainer>
                        <LabelAnimation style={labelContainerStyle}>
                            <AnimatedTypography
                                color={typographyColor}
                                style={labelStyle}
                            >
                                {`${label.toLowerCase()} ${
                                    optional ? ' (optional)' : ''
                                }`}
                            </AnimatedTypography>
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
                    style={style({ multiline }).textInput}
                />
                <ErrorContainer>
                    <Typography color="danger" fontFamily="bold" fontSize={11}>
                        {error && touched ? normalizeError(error) : null}
                    </Typography>
                </ErrorContainer>
            </Animated.View>
        </Pressable>
    );
};

const style: ({ multiline }: { multiline: boolean }) => {
    textInput: StyleProp<TextStyle>;
} = StyleSheet.create(({ multiline }) => ({
    textInput: {
        textAlignVertical: multiline ? 'top' : 'center',
    },
}));

export default React.memo(CustomTextInput);
