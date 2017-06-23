const initState = {
    route: null
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'NOT_FOUND':
            return {
                ...state,
                route: {
                    name: 'not found'
                }
            };
        case 'CHANGE_TODO':
            return {
                ...state,
                route: {
                    name: 'todos',
                    id: action.payload.id,
                    status: action.payload.status
                }
            };
        case 'HOME':
            return {
                ...state,
                route: {
                    name: 'home'
                }
            };
        default:
            return state;
    }
};

export default reducer;