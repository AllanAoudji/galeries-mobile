import styled from 'styled-components/native';

type Props = {
    hasError: boolean;
    hasFocus: boolean;
};

const TextInputStyled = styled.TextInput<Props>`
    border-bottom-color: ${(props) => (props.hasError ? '#fb6d51' : '#414cb4')};
    border-bottom-width: 2px;
    color: #212226;
    font-family: 'HelveticaLtStRoman';
    font-size: 14px;
    height: 30px;
    opacity: ${(props) => (props.hasFocus ? 1 : 0.5)};
`;

export default TextInputStyled;
