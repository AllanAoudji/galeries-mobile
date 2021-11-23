import styled from 'styled-components/native';

const Container = styled.View`
    align-items: center;
    border-bottom-color: ${({ theme }) => theme.colors['secondary-light']};
    border-bottom-width: 2px;
    justify-content: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
