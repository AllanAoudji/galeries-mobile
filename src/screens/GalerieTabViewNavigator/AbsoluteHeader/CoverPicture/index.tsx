import * as React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Typography } from '#components';
import { selectCurrentGalerie } from '#store/galeries';

import Image from './Image';

type Props = {
    style: {
        opacity: number;
    };
};

const CoverPicture = ({ style }: Props) => {
    const galerie = useSelector(selectCurrentGalerie);

    return (
        <Animated.View
            style={[
                style,
                {
                    bottom: 0,
                    left: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                },
            ]}
        >
            <Image galerie={galerie} />
            {/* {!!coverPicture && (
                <Image
                    style={{ width: dimension.width, height: dimension.width }}
                    source={{ uri: coverPicture.cropedImage.cachedSignedUrl }}
                />
            )} */}
            <View style={{ position: 'absolute', bottom: 15, right: 45 }}>
                {galerie && (
                    <Typography color="secondary-light" fontSize={24}>
                        {galerie.name}
                    </Typography>
                )}
            </View>
        </Animated.View>
    );
};

export default CoverPicture;
