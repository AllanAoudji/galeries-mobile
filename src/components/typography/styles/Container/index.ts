import styled from 'styled-components/native';

type Props = {
    color?:
        | 'black'
        | 'danger'
        | 'primary'
        | 'primary-dark'
        | 'primary-light'
        | 'secondary'
        | 'secondary-dark'
        | 'secondary-light'
        | 'success'
        | 'tertiary'
        | 'tertiary-dark'
        | 'tertiary-light'
        | 'white';
    fontFamily?: 'bold' | 'light' | 'oblique' | 'roman';
    fontSize?: 12 | 14 | 18 | 24 | 36 | 48 | 64;
    textAlign?: 'center' | 'left' | 'right';
};

const colors = {
    black: '#212226',
    danger: '#fb6d51',
    primary: '#7483ff',
    'primary-dark': '#414cb4',
    'primary-light': '#d6dbff',
    secondary: '#f2f2e6',
    'secondary-dark': '#dcdcb7',
    'secondary-light': '#fffff4',
    success: '#71ef8e',
    tertiary: '#78fff7',
    'tertiary-dark': '#17cfc4',
    'tertiary-light': '#ccfffc',
    white: '#fafaff',
};

const fontFamilies = {
    bold: 'HelveticaLtStBold',
    light: 'HelveticaLtStLight',
    oblique: 'HelveticaLtStObl',
    roman: 'HelveticaLtStRoman',
};

const fontSizes = {
    12: '12px',
    14: '14px',
    18: '18px',
    24: '24px',
    36: '36px',
    48: '48px',
    64: '64px',
};

const Container = styled.Text<Props>`
    color: ${(props) => colors[props.color || 'black']};
    font-family: ${(props) => fontFamilies[props.fontFamily || 'roman']};
    font-size: ${(props) => fontSizes[props.fontSize || 14]};
    text-align: ${(props) => props.textAlign || 'left'};
`;

Container.defaultProps = {
    color: 'black',
    fontFamily: 'roman',
    fontSize: 14,
    textAlign: 'left',
};

export default Container;
