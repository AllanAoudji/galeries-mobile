import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components/native';

import Typography from '#components/Typography';
import Pictogram from '#components/Pictogram';

import Slider from './Slider';

type Frame = Store.Models.Frame & {
    galerie?: Store.Models.Galerie;
    galeriePictures: Store.Models.GaleriePicture[];
    user?: Store.Models.User;
};

type FrameModalProps = {
    frame: Frame;
};

const PROFILE_PICTURE_SIZE = 34;

const Container = styled.View`
    width: 100%;
`;
const Header = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: ${({ theme }) => `10px ${theme.spacings.small} 12px`};
`;
const HeaderInfoContainer = styled.View`
    align-items: center;
    flex-direction: row;
`;
const ProfilePicturesContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.tertiary};
    border-radius: ${() => `${PROFILE_PICTURE_SIZE / 2}px`};
    height: ${() => `${PROFILE_PICTURE_SIZE}px`};
    margin-right: ${({ theme }) => theme.spacings.smallest};
    width: ${() => `${PROFILE_PICTURE_SIZE}px`};
`;
const Footer = styled.View`
    padding: ${({ theme }) =>
        `5px ${theme.spacings.small} ${theme.spacings.small}`};
`;

const CommentsContainer = styled.View`
    align-items: center;
    flex-direction: row;
`;
const CommentPictogramContainer = styled.View`
    padding-right: 12px;
`;
const ActionNavigationContainer = styled.View`
    padding-bottom: ${({ theme }) => theme.spacings.smallest};
    justify-content: space-between;
    flex-direction: row;
`;
const LikesContainer = styled.View`
    align-items: center;
    flex-direction: row;
`;
const LikePictogramContainer = styled.View`
    padding-left: 12px;
`;
const TimeContainer = styled.View`
    padding-top: 5px;
`;

const FrameModal = ({ frame }: FrameModalProps) => {
    return (
        <Container>
            <Header>
                <HeaderInfoContainer>
                    <ProfilePicturesContainer />
                    <Typography>posted by </Typography>
                    <Typography fontFamily="bold">
                        {frame.user ? frame.user.pseudonym : 'username'}
                    </Typography>
                </HeaderInfoContainer>
                <Pictogram size="small" variant="option-vertical" />
            </Header>
            <Slider galeriePictures={frame.galeriePictures} />
            <Footer>
                <ActionNavigationContainer>
                    <CommentsContainer>
                        <CommentPictogramContainer>
                            <Pictogram
                                color="primary"
                                variant="comments-stroke"
                            />
                        </CommentPictogramContainer>
                        <Typography>{frame.numOfComments} comments</Typography>
                    </CommentsContainer>
                    <LikesContainer>
                        <Typography>{frame.numOfLikes} likes</Typography>
                        <LikePictogramContainer>
                            <Pictogram
                                color="danger"
                                variant={
                                    frame.liked ? 'heart-fill' : 'heart-stroke'
                                }
                            />
                        </LikePictogramContainer>
                    </LikesContainer>
                </ActionNavigationContainer>
                {!!frame.description && (
                    <Typography>{frame.description}</Typography>
                )}
                <TimeContainer>
                    <Typography fontFamily="light" fontSize={12}>
                        {moment(frame.createdAt).fromNow()}
                    </Typography>
                </TimeContainer>
            </Footer>
        </Container>
    );
};

export default FrameModal;
