import * as React from 'react';

import Typography from '#components/Typography';

import RenderItem from './RenderItem';
import { Container, LoadMoreContainer, Separator } from './styles';

type Props = {
    allIds: string[];
    end: boolean;
    onPress: () => void;
};

const SubComments = ({ allIds, end, onPress }: Props) => {
    return (
        <Container>
            {allIds.map((id) => (
                <RenderItem key={id} item={id} />
            ))}
            {!end && allIds.length > 0 && (
                <LoadMoreContainer onPress={onPress}>
                    <Separator />
                    <Typography fontSize={12} color="primary">
                        load more
                    </Typography>
                </LoadMoreContainer>
            )}
        </Container>
    );
};

export default React.memo(SubComments);
