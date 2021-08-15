import * as React from 'react';

import { Container } from './styles';

type Props = {
    color?: keyof Style.Colors;
    fontFamily?: keyof Style.FontFamilies;
    fontSize?: keyof Style.FontSizes;
    textAlign?: keyof Style.TextAlign;
};

const Typography: React.FC<Props> = ({
    children,
    color = 'black',
    fontFamily = 'roman',
    fontSize = 14,
    textAlign = 'left',
}): JSX.Element => {
    return (
        <Container
            color={color}
            fontFamily={fontFamily}
            fontSize={fontSize}
            textAlign={textAlign}
        >
            {children}
        </Container>
    );
};

export default Typography;
