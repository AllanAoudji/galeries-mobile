import * as React from 'react';

import Pictogram from '#components/Pictogram';

import {
    ActionsContainer,
    Container,
    InnerTakePictureButton,
    SavePicturesButton,
    SwitchTypeButtonContainer,
    TakePictureButton,
} from './styles';

type Props = {
    onPressSavePicture: () => void;
    onPressTakePicture: () => void;
    onPressSwitchType: () => void;
    snapShot: string | null;
};

const Footer = ({
    onPressSavePicture,
    onPressSwitchType,
    onPressTakePicture,
    snapShot,
}: Props) => {
    return (
        <Container>
            <ActionsContainer>
                {snapShot ? (
                    <SavePicturesButton onPress={onPressSavePicture}>
                        <Pictogram color="primary" variant="valid" />
                    </SavePicturesButton>
                ) : (
                    <TakePictureButton onPress={onPressTakePicture}>
                        <InnerTakePictureButton />
                    </TakePictureButton>
                )}
            </ActionsContainer>
            {!snapShot && (
                <SwitchTypeButtonContainer onPress={onPressSwitchType}>
                    <Pictogram
                        color="secondary-light"
                        size="large"
                        variant="switch"
                    />
                </SwitchTypeButtonContainer>
            )}
        </Container>
    );
};

export default React.memo(Footer);
