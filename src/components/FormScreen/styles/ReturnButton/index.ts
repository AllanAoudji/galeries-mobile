import styled from 'styled-components/native';

type Props = {
    currentHeight?: number;
    hide: boolean;
};

const ReturnButton = styled.View<Props>`
    left: 0;
    opacity: ${(props) => (props.hide ? 0 : 1)};
    padding: 30px;
    padding-top: ${(props) => `${10 + (props.currentHeight || 0)}px`};
    position: absolute;
    top: 0;
`;

export default ReturnButton;
