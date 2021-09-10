import styled from 'styled-components/native';

const BodyContainer = styled.View`
    padding-bottom: ${({ theme }) => theme.spacings.normal};
`;
const TextContainer = styled.View`
    padding-bottom: ${({ theme }) => theme.spacings.normal};
`;

export { BodyContainer, TextContainer };
