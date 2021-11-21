import * as React from 'react';

import BottomSheetOptions from './BottomSheetOptions';
import WithGalerie from './WithGalerie';
import WithoutGalerie from './WithoutGalerie';

import { Container, InfoContainer } from './styles';
import WithoutUser from './WithoutUser';

type Props = {
    frame: Store.Models.Frame;
    type?: 'galerie' | 'user';
};

const Header = ({ frame, type }: Props) => {
    const header = React.useMemo(() => {
        if (!type) return <WithGalerie frame={frame} />;
        switch (type) {
            case 'galerie':
                return <WithoutUser frame={frame} />;
            case 'user':
                return <WithoutGalerie frame={frame} />;
            default:
                return <WithGalerie frame={frame} />;
        }
    }, [frame, type]);

    return (
        <Container>
            <InfoContainer>{header}</InfoContainer>
            <BottomSheetOptions frame={frame} />
        </Container>
    );
};

export default Header;
