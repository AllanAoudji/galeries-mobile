import * as React from 'react';
import styled from 'styled-components/native';

import Typography from '#components/Typography';
import Pictogram from '#components/Pictogram';

type Props = {
    onPress?: () => void;
    pictogram?: Style.Pictograms;
    title: string;
};

const Container = styled.Pressable`
    align-items: center;
    flex-direction: row;
    padding: 10px 0;
`;
const PictogramContainer = styled.View`
    margin-right: ${({ theme }) => theme.spacings.small};
`;

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
