import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserCard } from '#components';
import { getUserId, selectUser } from '#store/users';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const dispatch = useDispatch();

    const userSelector = React.useMemo(() => selectUser(item), [item]);
    const user = useSelector(userSelector);

    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!user && !loading) {
            setLoading(true);
            dispatch(getUserId(item));
        }
    }, [loading, user]);

    if (!user) return null;

    return <UserCard user={user} />;
};

export default React.memo(RenderItem);
