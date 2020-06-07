// @flow
export type Next = Action => any;

export type Action = {
    type: string,
    [k: string]: any
};

export type RouterAction = {
    type: string,
    path: string,
    method: ?string,
    shouldDispatch: ?bool
};

export type Routes = {
    [k: string]: Function | string
};

export type Store = {
    dispatch: Action => any,
    getState: () => any
};

export type Mapper = (Object, Object, string) => Action;
