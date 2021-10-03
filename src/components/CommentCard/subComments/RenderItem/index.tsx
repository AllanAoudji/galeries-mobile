import * as React from 'react';
import { useSelector } from 'react-redux';

import SubCommentCard from '#components/SubCommentCard';
import { selectComment } from '#store/comments';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const commentSelector = React.useMemo(() => selectComment(item), [item]);
    const comment = useSelector(commentSelector);

    if (!comment) return null;

    return <SubCommentCard comment={comment} />;
};

export default React.memo(RenderItem);
