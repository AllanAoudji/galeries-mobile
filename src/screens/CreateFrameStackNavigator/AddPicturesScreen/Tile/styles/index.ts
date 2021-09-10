import styled from 'styled-components/native';

const Container = styled.Pressable`
    padding: 2px;
`;
const ImageStyled = styled.Image`
    width: 100%;
    height: 100%;
`;
const InnerContainer = styled.View`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export { Container, InnerContainer, ImageStyled };
