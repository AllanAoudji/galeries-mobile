import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectGalerieBlackList } from '#store/galerieBlackLists';
import { UserCard } from '#components';
import { selectUser } from '#store/users';

type Props = {
    index: number;
    item: string;
};

const RenderItem = ({ index, item }: Props) => {
    const galerieBlackListSelector = React.useMemo(
        () => selectGalerieBlackList(item),
        [item]
    );
    const galerieBlackList = useSelector(galerieBlackListSelector);

    const userSelector = React.useMemo(
        () =>
            selectUser(galerieBlackList ? galerieBlackList.userId : undefined),
        [galerieBlackList]
    );
    const user = useSelector(userSelector);

    if (!user) return null;

    return (
        <UserCard
            color={index % 2 ? 'secondary' : 'secondary-light'}
            galerieBlackList={galerieBlackList}
            user={user}
        />
    );
};

export default RenderItem;
