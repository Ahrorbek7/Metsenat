import axios from "axios";

export default {
    actions: {
        fetchingToDashboard(context){
            axios.get('https://metsenatclub.xn--h28h.uz/api/v1/dashboard/')
            .then((res) => {
                context.commit("UPDATING_DASHBOARD", res.data)
            })
        }
    },
    mutations: {
        UPDATING_DASHBOARD(state, payload){
            state.dashboardData = payload
        }
    },
    state: {
        dashboardData: []
    },
    getters: {
        gettingDashboardList(state){
            return state.dashboardData
        }
    }
}


