import styled from 'styled-components/native';

const BodyContainer = styled.View`
    flex: 1;
`;
const Container = styled.Pressable`
    flex-direction: row;
    margin: 5px 0 8px;
`;
const ContentContainer = styled.View`
    flex-direction: row;
    width: 100%;
`;
const TimeContainer = styled.View`
    opacity: 0.8;
    padding-top: 4px;
`;

export { BodyContainer, Container, ContentContainer, TimeContainer };
