import * as React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

import CommentCard from '#components/CommentCard';
import { selectComment } from '#store/comments';

type Props = {
    allIds: string[];
    end: boolean;
};
type RenderItemProps = {
    item: string;
};

const RenderItem = ({ item }: RenderItemProps) => {
    const commentSelector = React.useMemo(() => selectComment(item), [item]);
    const comment = useSelector(commentSelector);

    if (!comment) return null;

    return <CommentCard comment={comment} />;
};

const SubComments = ({ allIds }: Props) => {
    return (
        <View style={{ paddingTop: 5 }}>
            {allIds.map((id) => (
                <RenderItem key={id} item={id} />
            ))}
        </View>
    );
};

export default SubComments;
