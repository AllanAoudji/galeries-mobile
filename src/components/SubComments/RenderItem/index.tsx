import * as React from 'react';
import { useSelector } from 'react-redux';

import CommentCard from '#components/CommentCard';
import { selectComment } from '#store/comments';

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
