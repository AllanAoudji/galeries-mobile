import styled from 'styled-components/native';
import { GLOBAL_STYLE } from '#helpers/constants';
import convertPixelToNum from '#helpers/convertPixelToNum';

type TextContainerProps = {
    pb?: boolean;
};

const Container = styled.View`
    flex-direction: row;
    height: ${() => `${GLOBAL_STYLE.FRAME_COVER_PICTURE_SIZE + 10}px`};
    margin-right: 10px;
    width: ${({ theme }) =>
        `${
            GLOBAL_STYLE.FRAME_COVER_PICTURE_SIZE +
            convertPixelToNum(theme.spacings.smallest)
        }px`};
`;
const ProfilePictureContainer = styled.View`
    bottom: 0;
    position: absolute;
    right: 0;
`;
const TextContainer = styled.Pressable<TextContainerProps>`
    flex-direction: row;
    padding-bottom: ${({ pb }) => (pb ? '2px' : 0)};
`;
const TextsContainer = styled.View`
    padding-bottom: ${({ theme }) => theme.spacings.smallest};
`;

export { Container, ProfilePictureContainer, TextContainer, TextsContainer };
