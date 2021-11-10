import styled from 'styled-components/native';

const ButtonContainer = styled.View`
    padding: ${({ theme }) =>
        `0 ${theme.spacings.smallest} ${theme.spacings.normal}`};
`;
const CheckBoxContainer = styled.View`
    width: ${({ theme }) => theme.spacings.normal};
`;
const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const FieldsContainer = styled.View`
    margin-top: ${({ theme }) => theme.spacings.normal};
`;
const NumOfInvitsContainer = styled.View`
    margin-left: ${({ theme }) => theme.spacings.normal};
`;
const ScrollViewStyle = styled.ScrollView`
    padding: ${({ theme }) => `0 ${theme.spacings.normal}`};
    flex: 1;
`;
const TimeLabelContainer = styled.Pressable`
    align-items: center;
    flex-direction: row;
`;

export {
    ButtonContainer,
    CheckBoxContainer,
    Container,
    FieldsContainer,
    NumOfInvitsContainer,
    ScrollViewStyle,
    TimeLabelContainer,
};
