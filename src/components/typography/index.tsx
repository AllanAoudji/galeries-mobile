import * as React from 'react';

import { Container } from './styles';

type Props = {
    color?:
        | 'black'
        | 'danger'
        | 'primary'
        | 'primary-dark'
        | 'primary-light'
        | 'secondary'
        | 'secondary-dark'
        | 'secondary-light'
        | 'success'
        | 'tertiary'
        | 'tertiary-dark'
        | 'tertiary-light'
        | 'white';
    fontFamily?: 'bold' | 'light' | 'oblique' | 'roman';
    fontSize?: 12 | 14 | 18 | 24 | 36 | 48 | 64;
    textAlign?: 'center' | 'left' | 'right';
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
