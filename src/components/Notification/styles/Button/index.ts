import styled from 'styled-components/native';

const Button = styled.View`
    align-items: center;
    align-self: stretch;
    border-color: ${({ theme }) => theme.colors['secondary-light']};
    border-radius: 10px;
    border-width: 2px;
    display: flex;
    justify-content: center;
    padding: 0 15px;
`;

export default Button;
