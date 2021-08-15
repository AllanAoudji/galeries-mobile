import styled from 'styled-components/native';

type Props = {
    status: 'error' | 'success';
};

const Container = styled.Pressable<Props>`
    align-items: center;
    background-color: ${({ status, theme }) =>
        status === 'error' ? theme.colors.danger : theme.colors.success};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    /* bottom: 0; */
    display: flex;
    flex-direction: row;
    height: 100px;
    justify-content: space-between;
    padding: 20px 25px 30px;
    /* position: absolute; */
    width: 100%;
    /* z-index: 10; */
`;

export default Container;
