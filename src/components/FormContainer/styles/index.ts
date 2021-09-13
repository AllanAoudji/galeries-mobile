import styled from 'styled-components/native';

type ContainerProps = {
    justifyContent: Style.JustifyContent;
};

const Container = styled.Pressable`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const InnerContainer = styled.KeyboardAvoidingView<ContainerProps>`
    flex: 1;
    justify-content: ${({ justifyContent }) => justifyContent};
    margin: ${({ theme }) => `0 ${theme.spacings.normal}`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container, InnerContainer };
