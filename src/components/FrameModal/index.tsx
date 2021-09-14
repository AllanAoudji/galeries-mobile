import * as React from 'react';

import Footer from './Footer';
import Header from './Header';
import Slider from './Slider';

import { Container } from './styles';

type Frame = Store.Models.Frame & {
    galerie?: Store.Models.Galerie;
    galeriePictures: Store.Models.GaleriePicture[];
    user?: Store.Models.User;
};
type Props = {
    frame: Frame;
};

const FrameModal = ({ frame }: Props) => {
    return (
        <Container>
            <Header user={frame.user} />
            <Slider galeriePictures={frame.galeriePictures} />
            <Footer
                createdAt={frame.createdAt}
                description={frame.description}
                liked={frame.liked}
                numOfComments={frame.numOfComments}
                numOfLikes={frame.numOfLikes}
            />
        </Container>
    );
};

export default FrameModal;
