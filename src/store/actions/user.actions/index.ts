export const USER: Store.Entity = '[USER]';

export const USER_SET = `${USER} Set`;

export const setUser: (data: Store.Models.User) => Store.Action = (data) => ({
    payload: { data },
    type: 'e',
});
