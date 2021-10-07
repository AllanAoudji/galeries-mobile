import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserCard } from '#components';
import { getUserId, selectUser } from '#store/users';
import { selectLike } from '#store/likes';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const dispatch = useDispatch();

    const likeSelector = React.useMemo(() => selectLike(item), [item]);
    const like = useSelector(likeSelector);

    const user = useSelector(selectUser(like ? like.userId : undefined));

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
