const settings = {
    state: {
        spaceType: null,
        province: null,
        city: null,
        area: null,
        navActive: {
            home: true,
            miss: false
        },
        scrollTop: 0
    },
    mutations: {
        set_space_type: (state, data) => {
            state.spaceType = data
        },
        set_province: (state, data) => {
            state.province = data
        },
        set_city: (state, data) => {
            state.city = data
        },
        set_area: (state, data) => {
            state.area = data
        },
        set_navActive: (state, data) => {
            state.navActive = data
        },
        set_scroll_top: (state, data) => {
            state.scrollTop = data
        }
    }
}

export default settings