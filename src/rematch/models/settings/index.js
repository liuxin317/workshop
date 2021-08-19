const settings = {
    state: 0,
    reducers: {
        increment1(state, payload) {
            return state + payload
        }
    },
    effects: {
        async incrementAsync1(payload, rootState) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            this.increment(payload)
        }
    }
};

export default settings;