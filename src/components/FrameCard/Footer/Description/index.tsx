import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import Typography from '#components/Typography';
import { updateFramesCurrent } from '#store/frames';

import { Container } from './styles';

type Props = {
    frame: Store.Models.Frame;
};

const Description = ({ frame }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.FrameProp
        | Screen.DesktopBottomTab.GalerieNavigationProp
        | Screen.DesktopBottomTab.HomeNavigationProp
    >();

    const [cropedDescription, setCropedDescription] =
        React.useState<string>('');
    const [descriptionIsCroped, setDescriptionIsCroped] =
        React.useState<boolean>(false);

    const handlePress = React.useCallback(() => {
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
        <Container onPress={handlePress}>
            {!!frame.description && descriptionIsCroped ? (
                <>
                    <Typography>{cropedDescription}</Typography>
                    <Typography fontFamily="bold">read more</Typography>
                </>
            ) : (
                <Typography>{frame.description}</Typography>
            )}
        </Container>
    );
};

export default Description;
