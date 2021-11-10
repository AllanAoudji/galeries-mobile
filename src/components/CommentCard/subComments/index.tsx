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
                <RenderItem item={id} key={id} />
            ))}
            {allIds.length > 0 && !end && (
                <LoadMoreContainer onPress={onPress}>
                    <Separator />
                    <Typography color="primary" fontSize={12}>
                        load more
                    </Typography>
                </LoadMoreContainer>
            )}
        </Container>
    );
};

export default React.memo(SubComments);
