import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserCard } from '#components';
import { getUserId, selectUser } from '#store/users';
import { selectLike } from '#store/likes';

type Props = {
    index: number;
    item: string;
};

const RenderItem = ({ index, item }: Props) => {
    const dispatch = useDispatch();

    const likeSelector = React.useMemo(() => selectLike(item), [item]);
    const like = useSelector(likeSelector);

    const user = useSelector(selectUser(like ? like.userId : undefined));

    const [loading, setLoading] = React.useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            if (!user && !loading) {
                setLoading(true);
                dispatch(getUserId(like ? like.userId : undefined));
            }
        }, [like, loading, user])
    );

    if (!user) return null;

    return (
        <UserCard
            color={index % 2 ? 'secondary' : 'secondary-light'}
            user={user}
        />
    );
};

export default React.memo(RenderItem);
