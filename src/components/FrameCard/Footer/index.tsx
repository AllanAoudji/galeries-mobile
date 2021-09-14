import moment from 'moment';
import * as React from 'react';

import { Pressable } from 'react-native';
import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';

import {
    ActionNavigationContainer,
    ButtonContainer,
    Container,
    DescriptionContainer,
} from './styles';

type Props = {
    createdAt: string;
    description: string;
    handlePressLike: () => void;
    handlePressLikes: () => void;
    liked: boolean;
    numOfComments: string;
    numOfLikes: string;
};

const Footer = ({
    createdAt,
    description,
    handlePressLike,
    handlePressLikes,
    liked,
    numOfComments,
    numOfLikes,
}: Props) => {
    const [descriptionIsCroped, setDescriptionIsCroped] =
        React.useState<boolean>(false);
    const [cropedDescription, setCropedDescription] =
        React.useState<string>('');

    React.useEffect(() => {
        if (description && description.length > 40) {
            setDescriptionIsCroped(true);
            setCropedDescription(`${description.substring(0, 40)}... `);
        }
    }, []);

    const handlePressDescription = React.useCallback(() => {
        if (descriptionIsCroped) setDescriptionIsCroped(false);
    }, [descriptionIsCroped]);

    return (
        <Container>
            <ActionNavigationContainer>
                <ButtonContainer>
                    <Pictogram
                        color="primary"
                        mr="smallest"
                        variant="comments-stroke"
                    />
                    <Typography>{numOfComments} comments</Typography>
                </ButtonContainer>
                <ButtonContainer>
                    <Pressable onPress={handlePressLikes}>
                        <Typography>{numOfLikes} likes</Typography>
                    </Pressable>
                    <Pictogram
                        color="danger"
                        ml="smallest"
                        onPress={handlePressLike}
                        variant={liked ? 'heart-fill' : 'heart-stroke'}
                    />
                </ButtonContainer>
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
