import styled from 'styled-components/native';

import convertPixelToNum from '#helpers/convertPixelToNum';

type Props = {
    currentHeight?: number;
};

const ReturnButton = styled.Pressable<Props>`
    left: 0;
    padding: ${({ theme }) => theme.spacings.small};
    padding-top: ${({ currentHeight, theme }) =>
        `${convertPixelToNum(theme.spacings.small) + (currentHeight || 0)}px`};
    position: absolute;
    top: 0;
`;

export default ReturnButton;
