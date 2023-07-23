<script setup>
import exitBtn from '../../assets/icons/exit.svg'
import clearBtn from '../../assets/icons/clear.svg'
import showBtn from '../../assets/icons/eye.svg'


import { mapGetters } from 'vuex'

</script>

<script>
export default {
    name: 'SponsorModalFilter',
    methods: {
        closeStudentsFilter() {
            this.$store.commit('TOGGLE_FILTER_STUDENTS')
            document.body.style.overflow = '';
        },
        clearAll() {
            this.$store.commit('CLEAR_STUDENTS_FILTER')
            this.updateFilter()
        },
        updateFilter() {
            this.$store.commit('UPDATE_STUDENTS_FILTER')
        }
    },
    computed: {
        ...mapGetters(['getUniversityList']),
        studentsFilter() {
            return this.$store.state.isModalFilterStudents
        },
        sponsorSumFilter() {
            return this.$store.state.sponsorSumsFilter
        },
        selectedType: {
            get() {
                return this.$store.state.selectedType;
            },
            set(value) {
                this.$store.commit("UPDATE_SELECTED_TYPE", value);
            }
        },
        selectedUniversity: {
            get() {
                return this.$store.state.selectedUniversity;
            },
            set(value) {
                this.$store.commit("UPDATE_SELECTED_UNIVERSITY", value);
            }
        },
    },
    mounted() {
        this.$store.dispatch('getUniversity')
    }
}
</script>
<template>
    <div v-if="studentsFilter"
        class="filter fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <dialog :open="studentsFilter" class="bg-white flex flex-col m-auto">
            <div class="filter__header flex items-center justify-between">
                <h3 class="filter__title">Filter</h3>
                <div class="filter__exit cursor-pointer">
                    <img draggable="false"
                        @click="closeStudentsFilter"
                        :src="exitBtn"
                        alt="exit btn">
                </div>
            </div>
            <div class="filter__select">
                <h3 class="filter__select-title">Talabalik turi</h3>
                <select v-model="selectedType"
                    name="type"
                    id="type">
                    <option value="all">Barchasi</option>
                    <option value="1">Bakalavr</option>
                    <option value="2">Magistr</option>
                </select>
            </div>
            <div class="filter__select flex flex-col">
                <h3 class="filter__select-title">OTM</h3>
                <select v-model="selectedUniversity"
                    name="type"
                    class="cursor-pointer w-full"
                    id="type">
                    <option value="all">Barchasi</option>
                    <option v-for="(item, index) in getUniversityList"
                        :key="index"
                        :value="item.id">{{ item.name }}</option>
                </select>
            </div>
            <div class="filter__bottom flex">
                <button @click="clearAll"
                    class="filter__bottom-clear flex items-center text-center   ">
                    <img :src="clearBtn"
                        alt="clear">
                    <h3>Tozalash</h3>
                </button>
                <button @click="updateFilter"
                    class="filter__bottom-show flex items-center text-center    ">
                    <img :src="showBtn"
                        alt="clear">
                    <h3>Natijalarni ko‘rish</h3>
                </button>
            </div>
        </dialog>
    </div>
</template>

<style lang="scss" scoped>
.filter {
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);

    dialog {
        border-radius: 12px;
        padding: 28px;
        max-width: 600px;
        width: 95%;
        gap: 28px;

        @media (max-width: 576px) {
            padding: 16px;
        }
    }

    &__header {
        border-bottom: 2px solid #F5F5F7;
        padding-bottom: 28px;
    }

    &__title {
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #28293D;
    }

    &__select {
        gap: 8px;

        &-title {
            font-weight: 500;
            font-size: 12px;
            line-height: 14px;
            letter-spacing: 1.125px;
            text-transform: uppercase;
            color: #1D1D1F;
        }

        select {
            background: rgba(224, 231, 255, 0.2);
            border: 1px solid #E0E7FF;
            border-radius: 6px;
            padding: 12px 16px;
        }
    }

    &__bottom {
        border-top: 2px solid #F5F5F7;
        padding-top: 28px;
        justify-content: flex-end;
        gap: 16px;

        @media (max-width: 480px) {
            justify-content: center;
            flex-direction: column;
        }

        button {
            gap: 10px;
            letter-spacing: -0.35px;
            height: 42px;
            padding: 0px 32px;
            cursor: pointer;

            @media (max-width: 480px) {
                justify-content: center;
            }

            h3 {
                font-weight: 500;
                font-size: 14px;
                line-height: 24px;
            }
        }

        &-clear {
            border: 1px solid #3366FF;
            border-radius: 5px;
            background: #FFFFFF;
            color: #3366FF;
        }

        &-show {
            background: #3366FF;
            box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.04), 0px 2px 4px rgba(96, 97, 112, 0.16);
            border-radius: 5px;
            color: #FFFFFF;
        }
    }
}
</style>