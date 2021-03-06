import styled from 'styled-components/native';

const Container = styled.Pressable`
    flex-direction: row;
    padding: 10px 0;
`;
const PictogramContainer = styled.View`
    margin-right: ${({ theme }) => theme.spacings.small};
`;

export { Container, PictogramContainer };
