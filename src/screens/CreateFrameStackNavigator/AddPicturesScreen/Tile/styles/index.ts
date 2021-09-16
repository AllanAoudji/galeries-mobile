import styled from 'styled-components/native';

const Container = styled.Pressable`
    padding: 2px;
`;
const ImageStyled = styled.Image`
    height: 100%;
    width: 100%;
`;
const InnerContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;
    height: 100%;
    overflow: hidden;
    width: 100%;
`;

export { Container, InnerContainer, ImageStyled };
