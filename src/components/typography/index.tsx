import * as React from 'react';

import { Container } from './styles';

type Props = {
    color?: keyof Colors;
    fontFamily?: keyof FontFamilies;
    fontSize?: keyof FontSizes;
    textAlign?: keyof TextAlign;
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
