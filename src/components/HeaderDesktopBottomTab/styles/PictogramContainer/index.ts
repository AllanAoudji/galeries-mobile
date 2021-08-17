import styled from 'styled-components/native';

import convertPixelToNum from '#helpers/convertPixelToNum';

type Props = {
    currentHeight?: number;
};

const PictogramContainer = styled.Pressable<Props>`
    padding: ${({ currentHeight, theme }) =>
        `${
            convertPixelToNum(theme.spacings.smallest) + (currentHeight || 0)
        }px ${theme.spacings.small} 0 ${theme.spacings.small}`};
`;

export default PictogramContainer;
