import { createSelector } from 'reselect';

const galerieRolesAllIdsSelector = (state: Store.Reducer) =>
    state.galerieRoles.allIds;

// eslint-disable-next-line import/prefer-default-export
export const selectGalerieUserRole = (
    galerieId?: string | null,
    userId?: string | null
) =>
    createSelector([galerieRolesAllIdsSelector], (galerieRolesAllIds) => {
        if (!galerieId || !userId) return undefined;
        const galerie = galerieRolesAllIds[galerieId];
        if (!galerie) return undefined;
        return galerie[userId];
    });
