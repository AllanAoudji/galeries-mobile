import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectComment } from '#store/comments';

import { CommentCard } from '#components';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const commentSelector = React.useMemo(() => selectComment(item), [item]);
    const comment = useSelector(commentSelector);

    if (!comment) return null;

    return <CommentCard comment={comment} />;
};

export default React.memo(RenderItem);
