import * as React from 'react';
import {
    StyleProp,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import {
    NavigationState,
    Route,
    SceneRendererProps,
} from 'react-native-tab-view';
import { DefaultTheme, useTheme } from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';
import convertPixelToNum from '#helpers/convertPixelToNum';

import { TabbarStyled } from './styles';

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
        fontFamily: theme.font.families.roman,
        fontSize: convertPixelToNum(theme.font.sizes[18]),
        textTransform: 'capitalize',
    },
    tabStyle: {
        height: GLOBAL_STYLE.PROFILE_TAB_BAR_MENU,
    },
}));

export default React.memo(TabBar);
