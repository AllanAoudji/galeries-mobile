import styled from 'styled-components/native';

type TextContainerProps = {
    paddingTop: number;
};

const TextContainer = styled.View<TextContainerProps>`
    flex: 1;
    justify-content: center;
    padding: ${({ paddingTop, theme }) =>
        `${paddingTop}px ${theme.spacings.normal} 0`};
`;

// eslint-disable-next-line import/prefer-default-export
export { TextContainer };
