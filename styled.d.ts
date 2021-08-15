import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: Style.Colors;
        font: {
            families: Style.FontFamilies;
            sizes: Style.FontSizes;
        };
        spacings: Style.Spacings;
    }
}
