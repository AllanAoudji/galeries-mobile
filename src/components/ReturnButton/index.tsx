import * as React from 'react';
import { StatusBar } from 'react-native';

import Pictogram from '#components/Pictogram';
import { GLOBAL_STYLE } from '#helpers/constants';

import { Container } from './styles';

type Props = {
    onPress: () => void;
};

const ReturnButton = ({ onPress }: Props) => {
    return (
        <Container paddingTop={StatusBar.currentHeight}>
            <Pictogram
                color="white"
                height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                onPress={onPress}
                pl="small"
                pr="small"
                variant="arrow-left"
            />
        </Container>
    );
};

export default ReturnButton;
