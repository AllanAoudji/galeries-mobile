import styled from 'styled-components/native';

import { DRAG_AND_DROP_UTILS } from '#helpers/constants';

type AddPictureProps = {
    left: number;
    top: number;
};

const AddPicture = styled.Pressable<AddPictureProps>`
    align-items: center;
    border-color: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    border-style: dashed;
    border-width: 2px;
    height: ${() => `${DRAG_AND_DROP_UTILS.SIZE}px`};
    justify-content: center;
    left: ${({ left }) => `${left}px`};
    margin-bottom: 10px;
    position: absolute;
    top: ${({ top }) => `${top}px`};
    width: ${() => `${DRAG_AND_DROP_UTILS.SIZE}px`};
`;
const Container = styled.View`
    height: ${() => `${DRAG_AND_DROP_UTILS.SIZE * 2}px`};
    width: 100%;
`;

export { AddPicture, Container };
