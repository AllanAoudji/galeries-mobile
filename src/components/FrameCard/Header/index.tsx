import * as React from 'react';

import BottomSheetOptions from './BottomSheetOptions';
import WithGalerie from './WithGalerie';
import WithoutGalerie from './WithoutGalerie';

import { Container, InfoContainer } from './styles';

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
            <BottomSheetOptions frame={frame} />
        </Container>
    );
};

export default Header;
