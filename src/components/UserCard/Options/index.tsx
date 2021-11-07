import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectMe } from '#store/me';

import GalerieUserOptions from './GalerieUserOptions';
import GalerieBlackListOptions from './GalerieBlackListOptions';

type Props = {
    galerie?: Store.Models.Galerie;
    galerieBlackList?: Store.Models.GalerieBlackList;
    role?: Store.Role;
    user: Store.Models.User;
};

const Options = ({ galerie, galerieBlackList, role, user }: Props) => {
    const me = useSelector(selectMe);

    if (!me) return null;
    if (me.id === user.id) return null;
    if (!galerie && !galerieBlackList) return null;
    if (galerie && galerieBlackList) return null;

    if (galerie && role)
        return <GalerieUserOptions galerie={galerie} role={role} user={user} />;
    if (galerieBlackList)
        return (
            <GalerieBlackListOptions
                galerieBlackList={galerieBlackList}
                user={user}
            />
        );
    return null;
};

export default Options;
