import styled from 'styled-components/native';

const PICTURE_SIZE = 100;

const AddPicture = styled.Pressable`
    align-items: center;
    border-color: ${({ theme }) => theme.colors.primary};
    border-radius: 15px;
    border-style: dashed;
    border-width: 2px;
    height: ${() => `${PICTURE_SIZE}px`};
    justify-content: center;
    margin-bottom: 10px;
    width: ${() => `${PICTURE_SIZE}px`};
`;
const BodyContainer = styled.View`
    padding-bottom: ${({ theme }) => theme.spacings.normal};
`;
const PictureContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    height: ${() => `${PICTURE_SIZE * 2 + 10}px`};
    justify-content: space-between;
`;
const TextContainer = styled.View`
    padding-bottom: ${({ theme }) => theme.spacings.normal};
`;

export { AddPicture, BodyContainer, PictureContainer, TextContainer };
