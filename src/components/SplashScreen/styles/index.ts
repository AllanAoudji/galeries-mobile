import styled from 'styled-components/native';

const Container = styled.View`
    align-items: center;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
    justify-content: center;
`;
const ImageBackgroundStyle = styled.ImageBackground`
    flex: 1;
    width: 100%;
`;

export { Container, ImageBackgroundStyle };
