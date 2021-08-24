import styled from 'styled-components/native';

type Props = {
    currentHeight: number | undefined;
};

const SearchBarContainer = styled.View<Props>`
    padding: ${({ currentHeight, theme }) =>
        `${currentHeight || 0}px ${theme.spacings.small} 0`};
`;

export default SearchBarContainer;
