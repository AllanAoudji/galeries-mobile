import styled from 'styled-components/native';

const BookMarkContainer = styled.View`
    bottom: ${({ theme }) => theme.spacings.smallest};
    position: absolute;
    right: ${({ theme }) => theme.spacings.smallest};
`;
const ImageStyled = styled.Image`
    height: 100%;
    width: 100%;
`;

export { BookMarkContainer, ImageStyled };
