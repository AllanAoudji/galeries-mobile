import moment from 'moment';
import * as React from 'react';

import ComentButton from '#components/CommentButton';
import LikeButton from '#components/LikeButton';
import Typography from '#components/Typography';

import {
    ActionNavigationContainer,
    Container,
    DescriptionContainer,
} from './styles';

type Props = {
    createdAt: string;
    description: string;
    frameId: string;
    handlePressComments: () => void;
    handlePressLikes: () => void;
};

const Footer = ({
    createdAt,
    description,
    frameId,
    handlePressComments,
    handlePressLikes,
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
                <ComentButton frameId={frameId} onPress={handlePressComments} />
                <LikeButton frameId={frameId} onPress={handlePressLikes} />
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
