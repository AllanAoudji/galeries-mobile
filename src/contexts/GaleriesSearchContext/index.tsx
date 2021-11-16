import * as React from 'react';
import { InteractionManager } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    getGaleries,
    selectGaleriesFilterName,
    selectGaleriesNameStatus,
} from '#store/galeries';

export const GaleriesSearchContext = React.createContext<{
    searchFinished: boolean;
    setSearchFinished: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    searchFinished: true,
    setSearchFinished: () => {},
});

export const GaleriesSearchProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const filterGaleriesName = useSelector(selectGaleriesFilterName);
    const galeriesNameStatus = useSelector(selectGaleriesNameStatus);

    const [searchFinished, setSearchFinished] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (galeriesNameStatus === 'PENDING') {
            InteractionManager.runAfterInteractions(() => {
                dispatch(getGaleries(filterGaleriesName));
            });
            if (filterGaleriesName !== '') setSearchFinished(false);
        }
    }, [filterGaleriesName, galeriesNameStatus]);

    return (
        <GaleriesSearchContext.Provider
            value={{ searchFinished, setSearchFinished }}
        >
            {children}
        </GaleriesSearchContext.Provider>
    );
};
