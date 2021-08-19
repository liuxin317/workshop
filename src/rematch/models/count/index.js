const count = {
    state: 0,
    reducers: {
        increment(state, payload) {
            return state + payload
        }
    },
    effects: {
        async incrementAsync(payload, rootState) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.increment(payload)
        }
    }
};

export default count;