import styled from 'styled-components/native';

const PictogramContainer = styled.Pressable`
    justify-content: center;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small}`};
`;

export default PictogramContainer;
