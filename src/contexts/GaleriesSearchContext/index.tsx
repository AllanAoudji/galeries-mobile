import * as React from 'react';

export const GaleriesSearchContext = React.createContext<{
    searchFinished: boolean;
    setSearchFinished: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    searchFinished: true,
    setSearchFinished: () => {},
});

export const GaleriesSearchProvider: React.FC<{}> = ({ children }) => {
    const [searchFinished, setSearchFinished] = React.useState<boolean>(true);

    return (
        <GaleriesSearchContext.Provider
            value={{ searchFinished, setSearchFinished }}
        >
            {children}
        </GaleriesSearchContext.Provider>
    );
};
