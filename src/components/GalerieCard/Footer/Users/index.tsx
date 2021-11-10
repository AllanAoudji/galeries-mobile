import * as React from 'react';
import { useSelector } from 'react-redux';

import {
    selectGalerieUsersAllIds,
    selectGalerieUsersStatus,
} from '#store/users';

import List from './List';

type Props = {
    galerie: Store.Models.Galerie;
};

const Users = ({ galerie }: Props) => {
    const galerieUsersAllIdsSelector = React.useMemo(
        () => selectGalerieUsersAllIds(galerie.id),
        [galerie]
    );
    const galerieUsersAllIds = useSelector(galerieUsersAllIdsSelector);
    const galerieUsersStatusSelector = React.useMemo(
        () => selectGalerieUsersStatus(galerie.id),
        [galerie]
    );
    const galerieUsersStatus = useSelector(galerieUsersStatusSelector);

    if (
        !galerieUsersStatus ||
        galerieUsersStatus === 'PENDING' ||
        galerieUsersStatus.includes('LOADING') ||
        !galerieUsersAllIds
    )
        return null;

    return <List allIds={galerieUsersAllIds} />;
};

export default React.memo(Users);
