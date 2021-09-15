import * as React from 'react';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';
import { DefaultHeader } from '#components';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const Header = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    position: absolute;
    width: 100%;
    z-index: 10;
`;

const CommentScreen = () => {
    const { onLayout } = useComponentSize();
    const { containerStyle, headerStyle } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    return (
        <Container>
            <Header onLayout={onLayout} style={containerStyle}>
                <DefaultHeader
                    style={headerStyle}
                    title="comments"
                    variant="secondary"
                />
            </Header>
        </Container>
    );
};

export default CommentScreen;
