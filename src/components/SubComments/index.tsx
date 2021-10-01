import * as React from 'react';
import { Typography } from '#components';

import RenderItem from './RenderItem';
import { Container, LoadMoreContainer, Separator } from './styles';

type Props = {
    allIds: string[];
    end: boolean;
};

const SubComments = ({ allIds, end }: Props) => {
    return (
        <Container>
            {allIds.map((id) => (
                <RenderItem key={id} item={id} />
            ))}
            {!end && allIds.length > 0 && (
                <LoadMoreContainer>
                    <Separator />
                    <Typography color="primary">load more replies</Typography>
                </LoadMoreContainer>
            )}
        </Container>
    );
};

export default SubComments;
