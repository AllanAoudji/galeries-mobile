import styled from 'styled-components/native';

type Props = {
    editable: boolean;
    hasFocus: boolean;
    loading: boolean;
};

const Container = styled.Pressable<Props>`
    opacity: ${({ editable, hasFocus, loading }) =>
        hasFocus && editable && !loading ? 1 : 0.5};
`;

export default Container;
