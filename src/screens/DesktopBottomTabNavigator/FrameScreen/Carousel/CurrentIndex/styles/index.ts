import styled from 'styled-components/native';
import convertPixelToNum from '#helpers/convertPixelToNum';

type InnerContainerProps = {
    paddingTop?: number;
};

const Container = styled.View`
    position: absolute;
    right: 0;
    top: 0;
`;
const InnerContainer = styled.View<InnerContainerProps>`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 100px;
    margin-right: ${({ theme }) => theme.spacings.smallest};
    margin-top: ${({ paddingTop, theme }) =>
        `${
            paddingTop
                ? paddingTop + convertPixelToNum(theme.spacings.smallest)
                : 0
        }px`};
    padding: 4px 0;
    width: 37px;
`;

export { Container, InnerContainer };
