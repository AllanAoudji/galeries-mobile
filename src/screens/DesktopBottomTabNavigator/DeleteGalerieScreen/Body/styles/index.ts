import styled from 'styled-components/native';

const ButtonContainer = styled.View`
    padding: ${({ theme }) =>
        `0 ${theme.spacings.smallest} ${theme.spacings.normal}`};
`;
const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const FieldsContainer = styled.View`
    padding-bottom: ${({ theme }) => theme.spacings.small};
`;
const ScrollViewStyle = styled.ScrollView`
    padding: ${({ theme }) => `0 ${theme.spacings.normal}`};
`;
const TypographyContainer = styled.View`
    margin-bottom: ${({ theme }) => theme.spacings.normal};
    margin-right: ${({ theme }) => theme.spacings.normal};
`;

export {
    ButtonContainer,
    Container,
    FieldsContainer,
    ScrollViewStyle,
    TypographyContainer,
};
