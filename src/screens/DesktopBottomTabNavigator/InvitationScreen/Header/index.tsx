import * as React from 'react';
import { useSelector } from 'react-redux';

import { SubGalerieScreenHeader } from '#components';
import { selectGalerie } from '#store/galeries';
import { selectUser } from '#store/users';

type Props = {
    invitation: Store.Models.Invitation;
};

const Header = ({ invitation }: Props) => {
    const galerieSelector = React.useMemo(
        () => selectGalerie(invitation.galerieId),
        [invitation]
    );
    const galerie = useSelector(galerieSelector);
    const userSelector = React.useMemo(
        () => selectUser(invitation.userId),
        [invitation]
    );
    const user = useSelector(userSelector);

    const title = React.useMemo(
        () => (user ? user.pseudonym : 'username'),
        [user]
    );

    return (
        <SubGalerieScreenHeader
            galerie={galerie}
            subTitle="Invitation posted by"
            title={title}
        />
    );
};

export default Header;
