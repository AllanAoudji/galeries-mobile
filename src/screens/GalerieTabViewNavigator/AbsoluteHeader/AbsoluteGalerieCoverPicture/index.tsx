import * as React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '#components';
import { selectCurrentGalerie } from '#store/galeries';

import { Container, TextContainer } from './styles';

type Props = {
    style: { opacity: number };
};

const AbsoluteGalerieCoverPicture = ({ style }: Props) => {
    const galerie = useSelector(selectCurrentGalerie);

    return (
        <Container style={style}>
            {galerie && (
                <TextContainer>
                    <Typography color="secondary-light" fontSize={24}>
                        {galerie.name}
                    </Typography>
                </TextContainer>
            )}
        </Container>
    );
};

export default AbsoluteGalerieCoverPicture;
