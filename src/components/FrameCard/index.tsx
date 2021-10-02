import * as React from 'react';

import { View } from 'react-native';

import Footer from './Footer';
import Header from './Header';
import Slider from './Slider';

// import { Container } from './styles';

type Props = {
    frame: Store.Models.Frame;
    onPressComments: () => void;
    onPressLikes: () => void;
    onPressLike: () => void;
};

const FrameCard = ({
    frame,
    onPressComments,
    onPressLikes,
    onPressLike,
}: Props) => {
    return (
        <View>
            <Header userId={frame.userId} />
            <Slider galeriePictures={frame.galeriePictures} />
            <Footer
                createdAt={frame.createdAt}
                description={frame.description}
                handlePressComments={onPressComments}
                handlePressLike={onPressLike}
                handlePressLikes={onPressLikes}
                liked={frame.liked}
                numOfComments={frame.numOfComments}
                numOfLikes={frame.numOfLikes}
            />
        </View>
    );
};

export default React.memo(FrameCard);
