import * as React from 'react';

import { useSelector } from 'react-redux';
import { selectGalerie } from '#store/galeries';

export const UserGalerieRoleContext = React.createContext<{
    getGalerie: (galerieId: string) => void;
    role: Store.Role | null;
}>({
    getGalerie: () => {},
    role: null,
});

export const UserGalerieRoleProvider: React.FC<{}> = ({ children }) => {
    const [galerieId, setGalerieId] = React.useState<string | null>(null);

    const galerieSelector = React.useMemo(
        () => selectGalerie(galerieId),
        [galerieId]
    );
    const galerie = useSelector(galerieSelector);

    const role = React.useMemo(
        () => (galerie ? galerie.role : null),
        [galerie]
    );

    const getGalerie = React.useCallback((id: string) => setGalerieId(id), []);

    return (
        <UserGalerieRoleContext.Provider value={{ getGalerie, role }}>
            {children}
        </UserGalerieRoleContext.Provider>
    );
};
