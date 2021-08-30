import * as React from 'react';

import Pictogram from '#components/Pictogram';

import { Container } from './styles';

type Props = {
    backgroundColor?: keyof Style.Colors;
    bottom?: keyof Style.Spacings;
    color?: keyof Style.Colors;
    onPress?: () => void;
    right?: keyof Style.Spacings;
};

const AddButton = ({
    backgroundColor = 'primary',
    right,
    color = 'secondary-light',
    onPress,
    bottom,
}: Props) => {
    const handlePress = React.useCallback(() => {
        if (onPress) onPress();
    }, [onPress]);

    return (
        <Container
            bottom={bottom}
            color={backgroundColor}
            onPress={handlePress}
            right={right}
        >
            <Pictogram color={color} variant="plus" />
        </Container>
    );
};

export default AddButton;
