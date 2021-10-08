import styled from 'styled-components/native';

const Container = styled.View`
    padding-top: 5px;
`;
const LoadMoreContainer = styled.Pressable`
    align-items: center;
    flex-direction: row;
    margin-left: 124px;
    opacity: 0.7;
`;
const Separator = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    height: 1px;
    margin-right: 8px;
    width: 22px;
`;

export { Container, LoadMoreContainer, Separator };
