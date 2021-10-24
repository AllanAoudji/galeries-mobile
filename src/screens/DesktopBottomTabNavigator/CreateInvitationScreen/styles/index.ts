import styled from 'styled-components/native';

const CheckBoxContainer = styled.View`
    width: ${({ theme }) => theme.spacings.normal};
`;
const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    margin: ${({ theme }) => `${theme.spacings.normal} 0`};
`;
const NumOfInvitsContainer = styled.View`
    margin-left: ${({ theme }) => theme.spacings.normal};
`;
const TimeLabelContainer = styled.Pressable`
    align-items: center;
    flex-direction: row;
`;

export {
    CheckBoxContainer,
    Container,
    NumOfInvitsContainer,
    TimeLabelContainer,
};
