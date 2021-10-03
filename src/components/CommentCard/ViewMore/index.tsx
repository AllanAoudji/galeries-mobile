import * as React from 'react';

import Typography from '#components/Typography';

import { Container, Separator } from './styles';

type Props = {
    commentFetcherText: string;
    onPress: () => void;
};

const ViewMore = ({ commentFetcherText, onPress }: Props) => {
    return (
        <Container onPress={onPress}>
            <Separator />
            <Typography fontSize={12} color="primary">
                {commentFetcherText}
            </Typography>
        </Container>
    );
};

export default React.memo(ViewMore);
