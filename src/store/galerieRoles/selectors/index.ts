import { createSelector } from 'reselect';

const galerieRolesByIdSelector = (state: Store.Reducer) =>
    state.galerieRoles.byId;

// eslint-disable-next-line import/prefer-default-export
export const selectGalerieUserRole = (
    galerieId?: string | null,
    userId?: string | null
) =>
    createSelector([galerieRolesByIdSelector], (galerieRolesAllIds) => {
        if (!galerieId || !userId) return undefined;
        const galerie = galerieRolesAllIds[galerieId];
        if (!galerie) return undefined;
        return galerie[userId];
    });

export const selectGalerieUserRolesLoadingPut = (state: Store.Reducer) =>
    state.galerieRoles.loading.put;
