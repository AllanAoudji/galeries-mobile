import * as React from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import {
    NavigationState,
    Route,
    SceneRendererProps,
} from 'react-native-tab-view';
import { DefaultTheme, useTheme } from 'styled-components/native';

import convertPixelToNum from '#helpers/convertPixelToNum';

import { TabbarStyled } from './styles';
import { GLOBAL_STYLE } from '#helpers/constants';

const TabBar = (
    props: SceneRendererProps & {
        navigationState: NavigationState<Route>;
    }
) => {
    const theme = useTheme();

    const styleProps = React.useMemo(() => ({ theme }), [theme]);

    return (
        <TabbarStyled
            indicatorStyle={style(styleProps).indicatorStyle}
            labelStyle={style(styleProps).labelStyle}
            pressColor="transparent"
            tabStyle={style(styleProps).tabStyle}
            scrollEnabled
            {...props}
        />
    );
};

const style: ({ theme }: { theme: DefaultTheme }) => {
    indicatorStyle: StyleProp<ViewStyle>;
    labelStyle: StyleProp<TextStyle>;
    tabStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(({ theme }) => ({
    indicatorStyle: {
        backgroundColor: theme.colors.black,
        height: 3,
    },
    labelStyle: {
        color: theme.colors.black,
        fontSize: convertPixelToNum(theme.font.sizes[18]),
        fontFamily: theme.font.families.roman,
        textTransform: 'capitalize',
        marginVertical: 15,
    },
    tabStyle: {
        padding: 0,
        width: 120,
        alignItems: 'center',
        height: GLOBAL_STYLE.GALERIE_TAB_BAR_MENU,
        justifyContent: 'center',
    },
}));

export default React.memo(TabBar);
