import 'styled-components';

type Colors = {
    black: string;
    danger: string;
    primary: string;
    'primary-dark': string;
    'primary-light': string;
    secondary: string;
    'secondary-dark': string;
    'secondary-light': string;
    success: string;
    tertiary: string;
    'tertiary-dark': string;
    'tertiary-light': string;
    white: string;
};
type FontFamilies = {
    bold: string;
    light: string;
    oblique: string;
    roman: string;
};
type FontSizes = {
    12: string;
    14: string;
    18: string;
    24: string;
    36: string;
    48: string;
    64: string;
};
type Spacings = {
    small: string;
    smallest: string;
    normal: string;
    large: string;
    largest: string;
};

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: Colors;
        font: {
            families: FontFamilies;
            sizes: FontSizes;
        };
        spacings: Spacings;
    }
}
