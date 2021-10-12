import moment from 'moment';
import * as React from 'react';

import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ComentButton from '#components/CommentButton';
import LikeButton from '#components/LikeButton';
import Typography from '#components/Typography';

import {
    ActionNavigationContainer,
    Container,
    DescriptionContainer,
} from './styles';
import { updateFramesCurrent } from '#store/frames';

type Props = {
    frame: Store.Models.Frame;
};

const Footer = ({ frame }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.FrameProp
        | Screen.DesktopBottomTab.HomeNavigationProp
    >();

    const [cropedDescription, setCropedDescription] =
        React.useState<string>('');
    const [descriptionIsCroped, setDescriptionIsCroped] =
        React.useState<boolean>(false);

    const handlePressDescription = React.useCallback(() => {
        if (frame.description) {
            if (descriptionIsCroped) setDescriptionIsCroped(false);
            else {
                dispatch(updateFramesCurrent(frame ? frame.id : null));
                navigation.navigate('Comments');
            }
        }
    }, [frame, descriptionIsCroped]);

    React.useEffect(() => {
        if (frame.description && frame.description.length > 40) {
            setDescriptionIsCroped(true);
            setCropedDescription(`${frame.description.substring(0, 40)}... `);
        }
    }, [frame]);

    return (
        <Container>
            <ActionNavigationContainer>
                <ComentButton frame={frame} />
                <LikeButton frame={frame} />
            </ActionNavigationContainer>
            <DescriptionContainer onPress={handlePressDescription}>
                {!!frame.description &&
                    (descriptionIsCroped ? (
                        <>
                            <Typography>{cropedDescription}</Typography>
                            <Typography fontFamily="bold">read more</Typography>
                        </>
                    ) : (
                        <Typography>{frame.description}</Typography>
                    ))}
            </DescriptionContainer>
            <Typography fontFamily="light" fontSize={12}>
                {moment(frame.createdAt).fromNow()}
            </Typography>
        </Container>
    );
};

export default Footer;
