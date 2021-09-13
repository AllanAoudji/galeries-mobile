import * as React from 'react';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';

import { Container, PictogramContainer } from './styles';

type Props = {
    onPress?: () => void;
    pictogram?: Style.Pictograms;
    title: string;
};

const BottomSheetButton = ({ onPress, pictogram, title }: Props) => {
    const handlePress = React.useCallback(() => {
        if (onPress) onPress();
    }, [onPress]);

    return (
        <Container onPress={handlePress}>
            {!!pictogram && (
                <PictogramContainer>
                    <Pictogram variant={pictogram} />
                </PictogramContainer>
            )}
            <Typography fontSize={18}>{title}</Typography>
        </Container>
    );
};

export default BottomSheetButton;
