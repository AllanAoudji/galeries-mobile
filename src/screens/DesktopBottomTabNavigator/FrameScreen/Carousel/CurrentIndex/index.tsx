import * as React from 'react';
import { StatusBar } from 'react-native';

import { Typography } from '#components';

import { Container, InnerContainer } from './styles';

type Props = {
    numOfImages: number;
    current: number;
};

const CurrentIndex = ({ current, numOfImages }: Props) => {
    if (numOfImages < 2) return null;
    return (
        <Container>
            <InnerContainer paddingTop={StatusBar.currentHeight}>
                <Typography color="white">
                    {current + 1}/{numOfImages}
                </Typography>
            </InnerContainer>
        </Container>
    );
};

export default CurrentIndex;
