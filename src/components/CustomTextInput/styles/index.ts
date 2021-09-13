import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

type TextInputProps = {
    editable?: boolean;
    hasError: boolean;
    loading?: boolean;
    multiline?: boolean;
};

const ErrorContainer = styled.View`
    align-items: flex-end;
    height: 16px;
    justify-content: center;
`;
const LabelAnimation = styled(Animated.View)`
    position: absolute;
`;
const LabelContainer = styled.View`
    height: 13px;
`;
const TextInputStyled = styled.TextInput<TextInputProps>`
    border-bottom-color: ${({ editable, hasError, loading, theme }) => {
        if (hasError) return theme.colors.danger;
        if (!editable || loading) return theme.colors.black;
        return theme.colors['primary-dark'];
    }};
    border-bottom-width: 2px;
    color: ${({ theme }) => theme.colors.black};
    font-family: 'HelveticaLtStRoman';
    font-size: 12px;
    height: ${({ multiline }) => (multiline ? '75px' : '28px')};
    padding-top: ${({ multiline }) => (multiline ? '7px' : 0)};
`;
TextInputStyled.defaultProps = {
    editable: true,
    hasError: false,
    loading: false,
    multiline: false,
};

export { ErrorContainer, LabelAnimation, LabelContainer, TextInputStyled };
