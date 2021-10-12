import * as React from 'react';

import BottomSheetOptions from './BottomSheetOptions';
import WithGalerie from './WithGalerie';
import WithoutGalerie from './WithoutGalerie';

import { Container, InfoContainer } from './styles';
// import { DeleteFrameModalContext } from '#contexts/DeleteFrameModalContext';

type Props = {
    frame: Store.Models.Frame;
    showGalerie: boolean;
};

const Header = ({ frame, showGalerie }: Props) => {
    return (
        <Container>
            <InfoContainer>
                {showGalerie ? (
                    <WithGalerie frame={frame} />
                ) : (
                    <WithoutGalerie frame={frame} />
                )}
            </InfoContainer>
            <BottomSheetOptions
                frame={frame}
                // onPressDelete={handlePressDelete}
            />
        </Container>
    );
};

export default Header;
