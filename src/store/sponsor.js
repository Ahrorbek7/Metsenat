import axios from 'axios'

export default {
    actions: {
        fetchSponsors({ commit, state }, page) {
            if (typeof page == 'number') {
                state.pageNumber = page
            } else if (page == 'minus') {
                state.pageNumber--
            } else if (page == 'plus') {
                state.pageNumber++
            }
            axios.get(`https://metsenatclub.xn--h28h.uz/api/v1/sponsor-list/?page=${state.pageNumber}`)
                .then((res) => {
                    commit("SPONSORS_LIST", res.data)
                })
        },
        detailSponsor(context, payload) {
            axios.get(`https://metsenatclub.xn--h28h.uz/api/v1/sponsor-detail/${payload}/`)
                .then((res) => {
                    context.commit('SINGLE_SPONSOR', res.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        updateSponsor(context, payload) {
            axios.put(`https://metsenatclub.xn--h28h.uz/api/v1/sponsor-update/${payload.id}/`, payload.data)
                .then((res) => {
                    console.log('Homiy yangilandi!: ', res);
                    context.dispatch('detailSponsor', payload.id)
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        createSponsor(context, payload) {
            axios.post('https://metsenatclub.xn--h28h.uz/api/v1/sponsor-create/', payload)
                .then((res) => {
                    console.log('Homiy qo`shildi!: ', res);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },
    mutations: {
        SPONSORS_LIST(state, payload) {
            state.sponsors = payload
            state.pagesCount = payload.count
        },
        SINGLE_SPONSOR(state, payload) {
            state.detailSponsorItem = payload
        }
    },
    state: {
        sponsors: [],
        pageNumber: 1,
        pagesCount: null,
        detailSponsorItem: {}
    },
    getters: {
        getSponsorsList(state) {
            return state.sponsors.results
        },
        sponsorsCount(state) {
            return {
                count: state.pagesCount,
                active: state.pageNumber
            }
        },
        singleSponsor(state) {
            return state.detailSponsorItem
        }
    }
}