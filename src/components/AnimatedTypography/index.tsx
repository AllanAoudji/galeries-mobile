import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { Container } from './styles';

type Props = {
    color?: keyof Style.Colors;
    fontFamily?: keyof Style.FontFamilies;
    fontSize?: keyof Style.FontSizes;
    style: StyleProp<Animated.AnimateStyle<StyleProp<TextStyle>>>;
    textAlign?: keyof Style.TextAlign;
};

const Typography: React.FC<Props> = ({
    children,
    color = 'black',
    fontFamily = 'roman',
    fontSize = 14,
    style,
    textAlign = 'left',
}): JSX.Element => {
    return (
        <Container
            color={color}
            fontFamily={fontFamily}
            fontSize={fontSize}
            style={style}
            textAlign={textAlign}
        >
            {children}
        </Container>
    );
};

export default React.memo(Typography);
