import * as React from 'react';

import Pictogram from '#components/Pictogram';

import { Container } from './styles';

type Props = {
    backgroundColor?: keyof Style.Colors;
    bottom?: keyof Style.Spacings;
    color?: keyof Style.Colors;
    onPress: () => void;
    right?: keyof Style.Spacings;
};

const AddButton = ({
    backgroundColor = 'primary',
    bottom,
    color = 'secondary-light',
    onPress,
    right,
}: Props) => {
    return (
        <Container
            bottom={bottom}
            color={backgroundColor}
            onPress={onPress}
            right={right}
        >
            <Pictogram color={color} variant="plus" />
        </Container>
    );
};

export default React.memo(AddButton);
