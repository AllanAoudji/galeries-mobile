import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type ContainerProps = {
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
};
type TextInputProps = {
    editable?: boolean;
    hasError: boolean;
    loading?: boolean;
    multiline?: boolean;
};

const Container = styled.Pressable<ContainerProps>`
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
    margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
`;
const ErrorContainer = styled.View`
    align-items: flex-end;
    margin-top: 5px;
    height: 27px;
`;
const LabelAnimation = styled(Animated.View)`
    padding-left: 10px;
    position: absolute;
`;
const LabelContainer = styled.View`
    height: 16px;
`;
const TextInputStyled = styled.TextInput<TextInputProps>`
    background-color: ${({ theme }) => theme.colors.secondary};
    border-bottom-color: ${({ editable, hasError, loading, theme }) => {
        if (hasError) return theme.colors.danger;
        if (!editable || loading) return theme.colors.black;
        return theme.colors['primary-dark'];
    }};
    border-bottom-width: 2px;
    color: ${({ theme }) => theme.colors.black};
    font-family: 'HelveticaLtStRoman';
    font-size: ${({ theme }) => theme.font.sizes[14]};
    height: ${({ multiline }) => (multiline ? '100px' : '34px')};
    padding: ${({ multiline }) => `${multiline ? '10px' : 0} 10px`};
`;
TextInputStyled.defaultProps = {
    editable: true,
    hasError: false,
    loading: false,
    multiline: false,
};

export {
    Container,
    ErrorContainer,
    LabelAnimation,
    LabelContainer,
    TextInputStyled,
};
