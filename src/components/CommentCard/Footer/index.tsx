import moment from 'moment';
import * as React from 'react';

import Typography from '#components/Typography';

import { Container, TimeContainer } from './styles';

type Props = {
    createdAt: string;
    onPress: () => void;
};

const Footer = ({ createdAt, onPress }: Props) => {
    return (
        <Container onPress={onPress}>
            <TimeContainer>
                <TimeContainer>
                    <Typography fontFamily="light" fontSize={12}>
                        {moment(createdAt).fromNow()}
                    </Typography>
                </TimeContainer>
                <Typography color="primary" fontFamily="bold" fontSize={12}>
                    Reply
                </Typography>
            </TimeContainer>
        </Container>
    );
};

export default React.memo(Footer);
