import moment from 'moment';
import * as React from 'react';
import { Pressable } from 'react-native';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';

import {
    ActionNavigationContainer,
    CommentsButtonContainer,
    Container,
    DescriptionContainer,
    LikesButtonContainer,
} from './styles';

type Props = {
    createdAt: string;
    description: string;
    handlePressComments: () => void;
    handlePressLike: () => void;
    handlePressLikes: () => void;
    liked: boolean;
    numOfComments: string;
    numOfLikes: string;
};

const Footer = ({
    createdAt,
    description,
    handlePressComments,
    handlePressLike,
    handlePressLikes,
    liked,
    numOfComments,
    numOfLikes,
}: Props) => {
    const [cropedDescription, setCropedDescription] =
        React.useState<string>('');
    const [descriptionIsCroped, setDescriptionIsCroped] =
        React.useState<boolean>(false);

    const handlePressDescription = React.useCallback(() => {
        if (description) {
            if (descriptionIsCroped) setDescriptionIsCroped(false);
            else handlePressComments();
        }
    }, [description, descriptionIsCroped]);

    React.useEffect(() => {
        if (description && description.length > 40) {
            setDescriptionIsCroped(true);
            setCropedDescription(`${description.substring(0, 40)}... `);
        }
    }, [description]);

    return (
        <Container>
            <ActionNavigationContainer>
                <CommentsButtonContainer onPress={handlePressComments}>
                    <Pictogram
                        color="primary"
                        mb="smallest"
                        ml="smallest"
                        mr="smallest"
                        variant="comments-stroke"
                    />
                    <Typography>{numOfComments} comments</Typography>
                </CommentsButtonContainer>
                <LikesButtonContainer>
                    <Pressable onPress={handlePressLikes}>
                        <Typography>{numOfLikes} likes</Typography>
                    </Pressable>
                    <Pictogram
                        color="danger"
                        ml="smallest"
                        pr="smallest"
                        onPress={handlePressLike}
                        pb="smallest"
                        variant={liked ? 'heart-fill' : 'heart-stroke'}
                    />
                </LikesButtonContainer>
            </ActionNavigationContainer>
            <DescriptionContainer onPress={handlePressDescription}>
                {!!description &&
                    (descriptionIsCroped ? (
                        <>
                            <Typography>{cropedDescription}</Typography>
                            <Typography fontFamily="bold">read more</Typography>
                        </>
                    ) : (
                        <Typography>{description}</Typography>
                    ))}
            </DescriptionContainer>
            <Typography fontFamily="light" fontSize={12}>
                {moment(createdAt).fromNow()}
            </Typography>
        </Container>
    );
};

export default Footer;
