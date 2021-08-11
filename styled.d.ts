import 'styled-components';

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
