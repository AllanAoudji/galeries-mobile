import styled from 'styled-components/native';

const Container = styled.Pressable`
    background-color: ${({ theme }) => theme.colors.secondary};
    bottom: 0;
    flex-direction: row;
    justify-content: center;
    left: 0;
    padding: 20px 0;
    position: absolute;
    right: 0;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
