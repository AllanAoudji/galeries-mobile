import * as React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

const Loader = () => {
    const dimension = useWindowDimensions();
    const theme = useTheme();

    return (
        <Container size={dimension.width}>
            <ActivityIndicator
                color={theme.colors.primary}
                style={style.activityIndicatorStyle}
            />
        </Container>
    );
};

const style = StyleSheet.create({
    activityIndicatorStyle: {
        transform: [{ scale: 2 }],
    },
});

export default React.memo(Loader);
