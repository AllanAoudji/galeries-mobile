import { DefaultTheme } from 'styled-components/native';

const DEFAULT_SPACING = 15;

const theme: DefaultTheme = {
    colors: {
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
    },
    font: {
        families: {
            bold: 'HelveticaLtStBold',
            light: 'HelveticaLtStLight',
            oblique: 'HelveticaLtStObl',
            roman: 'HelveticaLtStRoman',
        },
        sizes: {
            11: '11px',
            12: '12px',
            14: '14px',
            18: '18px',
            24: '24px',
            36: '36px',
            48: '48px',
            64: '64px',
        },
    },
    spacings: {
        huge: `${DEFAULT_SPACING * 6}px`,
        small: `${DEFAULT_SPACING * 2}px`,
        smallest: `${DEFAULT_SPACING}px`,
        normal: `${DEFAULT_SPACING * 3}px`,
        large: `${DEFAULT_SPACING * 4}px`,
        largest: `${DEFAULT_SPACING * 5}px`,
    },
};

export default theme;
