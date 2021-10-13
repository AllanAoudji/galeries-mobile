import * as React from 'react';

import { CurrentGaleriePictureContext } from '#contexts/CurrentGaleriePictureContext';

import { Container } from './styles';

type Props = {
    index: number;
};

const Dot = ({ index }: Props) => {
    const { currentIndex } = React.useContext(CurrentGaleriePictureContext);

    return <Container current={index === currentIndex} />;
};

export default Dot;
