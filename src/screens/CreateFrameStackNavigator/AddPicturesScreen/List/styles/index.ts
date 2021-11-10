import styled from 'styled-components/native';

import { DRAG_AND_DROP_UTILS } from '#helpers/constants';

const BORDER_WIDTH = 2;

type AddPictureProps = {
    left: number;
    top: number;
};

const AddPicture = styled.Pressable<AddPictureProps>`
    align-items: center;
    border-color: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    border-style: dashed;
    border-width: ${() => `${BORDER_WIDTH}px`};
    height: ${() => `${DRAG_AND_DROP_UTILS.SIZE - BORDER_WIDTH * 2}px`};
    justify-content: center;
    left: ${({ left }) => `${left}px`};
    margin: ${() => `${BORDER_WIDTH}px`};
    position: absolute;
    top: ${({ top }) => `${top}px`};
    width: ${() => `${DRAG_AND_DROP_UTILS.SIZE - BORDER_WIDTH * 2}px`};
`;
const Container = styled.View`
    height: ${() => `${DRAG_AND_DROP_UTILS.SIZE * 2}px`};
    margin: ${({ theme }) => `0 ${theme.spacings.smallest}`};
`;

export { AddPicture, Container };
