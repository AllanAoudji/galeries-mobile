import * as React from 'react';
import { LayoutChangeEvent, StatusBar, View } from 'react-native';
import {
    NavigationState,
    Route,
    SceneRendererProps,
} from 'react-native-tab-view';
import { useTheme } from 'styled-components/native';

import Animated from 'react-native-reanimated';
import { Typography, Pictogram } from '#components';
import convertPixelToNum from '#helpers/convertPixelToNum';

import {
    Container,
    CoverPictureContainer,
    DarkBackground,
    DescriptionContainer,
    EditPictogramContainer,
    TabbarContainer,
    TabbarStyled,
} from './styles';

type Props = SceneRendererProps & {
    containerStyle: { [key: string]: any };
    description?: string;
    informationStyle: { [key: string]: any };
    name?: string;
    navigationState: NavigationState<Route>;
    onLayoutContainer: (event: LayoutChangeEvent) => void;
    onLayoutInfo: (event: LayoutChangeEvent) => void;
};

const GalerieTabbarNavigator = ({
    description,
    informationStyle,
    name,
    onLayoutContainer,
    onLayoutInfo,
    containerStyle,
    ...props
}: Props) => {
    const theme = useTheme();

    return (
        <Container onLayout={onLayoutContainer} style={containerStyle}>
            <Animated.View onLayout={onLayoutInfo} style={informationStyle}>
                <CoverPictureContainer>
                    <DarkBackground currentHeight={StatusBar.currentHeight}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingRight: 30,
                                alignItems: 'center',
                            }}
                        >
                            <View style={{ maxWidth: '80%' }}>
                                <Typography
                                    color="secondary-light"
                                    fontFamily="bold"
                                    fontSize={36}
                                >
                                    {name}
                                </Typography>
                            </View>
                            <EditPictogramContainer>
                                <Pictogram
                                    color="secondary-light"
                                    variant="edit-fill"
                                />
                            </EditPictogramContainer>
                        </View>
                    </DarkBackground>
                </CoverPictureContainer>
                {!!description && (
                    <DescriptionContainer>
                        <Typography fontSize={14}>{description}</Typography>
                    </DescriptionContainer>
                )}
            </Animated.View>
            <TabbarContainer>
                <TabbarStyled
                    indicatorStyle={{
                        backgroundColor: theme.colors.black,
                        height: 3,
                    }}
                    labelStyle={{
                        color: theme.colors.black,
                        fontSize: convertPixelToNum(theme.font.sizes[18]),
                        fontFamily: theme.font.families.roman,
                        textTransform: 'capitalize',
                    }}
                    pressColor="transparent"
                    tabStyle={{
                        justifyContent: 'flex-start',
                        padding: 0,
                    }}
                    {...props}
                />
            </TabbarContainer>
        </Container>
    );
};

export default React.memo(GalerieTabbarNavigator);
