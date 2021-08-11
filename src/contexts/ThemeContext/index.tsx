import * as React from 'react';
import { ThemeProvider as Theme } from 'styled-components/native';

import theme from '#helpers/theme';

const ThemeProvider: React.FC<{}> = ({ children }) => (
    <Theme theme={theme}>{children}</Theme>
);

export default ThemeProvider;
