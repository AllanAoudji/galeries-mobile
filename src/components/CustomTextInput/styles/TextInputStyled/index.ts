import styled from 'styled-components/native';

type Props = {
    editable?: boolean;
    hasError: boolean;
    loading?: boolean;
    multiline?: boolean;
};

const TextInputStyled = styled.TextInput<Props>`
    border-bottom-color: ${({ editable, hasError, loading, theme }) => {
        if (hasError) {
            return theme.colors.danger;
        }
        if (!editable || loading) {
            return theme.colors.black;
        }
        return theme.colors['primary-dark'];
    }};
    border-bottom-width: 2px;
    color: ${({ theme }) => theme.colors.black};
    font-family: 'HelveticaLtStRoman';
    font-size: 14px;
    padding-top: ${({ multiline }) => (multiline ? '7px' : 0)};
`;

TextInputStyled.defaultProps = {
    editable: true,
    hasError: false,
    loading: false,
    multiline: false,
};

export default TextInputStyled;
