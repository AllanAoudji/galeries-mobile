import styled from 'styled-components/native';

type Props = {
    editable?: boolean;
    hasError: boolean;
    loading?: boolean;
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
`;

TextInputStyled.defaultProps = {
    editable: true,
    hasError: false,
    loading: false,
};

export default TextInputStyled;
