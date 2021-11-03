import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { selectGalerieBlackList } from '#store/galerieBlackLists';

type Props = {
    item: string;
};

const GalerieBlackListsCard = styled.View`
    background-color: ${({ theme }) => theme.colors.secondary};
    height: 300px;
    margin-bottom: 30px;
`;

const RenderItem = ({ item }: Props) => {
    const galerieBlackListSelector = React.useMemo(
        () => selectGalerieBlackList(item),
        [item]
    );
    const galerieBlackList = useSelector(galerieBlackListSelector);

    React.useEffect(() => {
        console.log(galerieBlackList);
    }, [galerieBlackList]);

    return <GalerieBlackListsCard />;
};

export default RenderItem;
