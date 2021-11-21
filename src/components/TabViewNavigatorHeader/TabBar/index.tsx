import * as React from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import {
    NavigationState,
    Route,
    SceneRendererProps,
} from 'react-native-tab-view';
import { DefaultTheme, useTheme } from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';
import convertPixelToNum from '#helpers/convertPixelToNum';

import { TabbarStyled } from './styles';

const TabBar = ({
    variant,
    ...props
}: SceneRendererProps & {
    navigationState: NavigationState<Route>;
    variant: 'center' | 'scroll';
}) => {
    const theme = useTheme();

    const styleProps = React.useMemo(
        () => ({ theme, variant }),
        [theme, variant]
    );

    return (
        <TabbarStyled
            indicatorStyle={style(styleProps).indicatorStyle}
            labelStyle={style(styleProps).labelStyle}
            pressColor="transparent"
            scrollEnabled={variant === 'scroll'}
            tabStyle={style(styleProps).tabStyle}
            variant={variant}
            {...props}
        />
    );
};

const style: ({
    theme,
    variant,
}: {
    theme: DefaultTheme;
    variant: 'center' | 'scroll';
}) => {
    indicatorStyle: StyleProp<ViewStyle>;
    labelStyle: StyleProp<TextStyle>;
    tabStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(({ theme, variant }) => ({
    indicatorStyle: {
        backgroundColor: theme.colors.black,
        height: 3,
    },
    labelStyle: {
        color: theme.colors.black,
        fontFamily: theme.font.families.roman,
        fontSize: convertPixelToNum(theme.font.sizes[18]),
        textTransform: 'capitalize',
    },
    tabStyle: {
        height: GLOBAL_STYLE.PROFILE_TAB_BAR_MENU,
        width: variant === 'scroll' ? 120 : undefined,
    },
}));

export default React.memo(TabBar);
