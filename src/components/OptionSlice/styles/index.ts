import styled from 'styled-components/native';

const SEPARATOR_HEIGHT = 2;

type ContainerProps = {
    mt?: keyof Style.Spacings;
    separator: boolean;
};

const Container = styled.View<ContainerProps>`
    margin: ${({ mt, theme }) =>
        `${mt ? theme.spacings[mt] : 0} ${theme.spacings.normal} 0`};
    padding: ${({ separator, theme }) =>
        `0 0 ${separator ? 0 : theme.spacings.huge}`};
`;
const TitleContainer = styled.View`
    padding-bottom: ${({ theme }) => theme.spacings.smallest};
`;
const Separator = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${() => `${SEPARATOR_HEIGHT / 2}px`};
    height: ${() => `${SEPARATOR_HEIGHT}px`};
    width: 100px;
`;
const SubTitleContainer = styled.View`
    padding-right: ${({ theme }) => theme.spacings.small};
`;
const SeparatorContainer = styled.View`
    align-items: center;
    padding: ${({ theme }) => theme.spacings.normal};
`;

export {
    Container,
    Separator,
    SeparatorContainer,
    SubTitleContainer,
    TitleContainer,
};
