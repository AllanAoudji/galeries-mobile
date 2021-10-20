import * as React from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import {
    NavigationState,
    Route,
    SceneRendererProps,
} from 'react-native-tab-view';
import { DefaultTheme, useTheme } from 'styled-components/native';

import convertPixelToNum from '#helpers/convertPixelToNum';

import { Container, TabbarStyled } from './styles';

const TabBar = (
    props: SceneRendererProps & {
        navigationState: NavigationState<Route>;
    }
) => {
    const theme = useTheme();

    const styleProps = React.useMemo(() => ({ theme }), [theme]);

    return (
        <Container>
            <TabbarStyled
                indicatorStyle={style(styleProps).indicatorStyle}
                labelStyle={style(styleProps).labelStyle}
                pressColor="transparent"
                tabStyle={style(styleProps).tabStyle}
                {...props}
            />
        </Container>
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
    },
    tabStyle: {
        justifyContent: 'flex-start',
        padding: 0,
    },
}));

export default React.memo(TabBar);
