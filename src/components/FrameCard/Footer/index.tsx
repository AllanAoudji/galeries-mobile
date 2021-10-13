import moment from 'moment';
import * as React from 'react';

import ComentButton from '#components/CommentButton';
import LikeButton from '#components/LikeButton';
import Typography from '#components/Typography';

import Description from './Description';

import { ActionNavigationContainer, Container } from './styles';

type Props = {
    frame: Store.Models.Frame;
};

const Footer = ({ frame }: Props) => {
    return (
        <Container>
            <ActionNavigationContainer>
                <ComentButton frame={frame} />
                <LikeButton frame={frame} />
            </ActionNavigationContainer>
            <Description frame={frame} />
            <Typography fontFamily="light" fontSize={12}>
                {moment(frame.createdAt).fromNow()}
            </Typography>
        </Container>
    );
};

export default Footer;
