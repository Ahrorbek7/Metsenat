<script setup>
import exitBtn from '../../assets/icons/exit.svg'
import checked from '../../assets/icons/checked.svg'
import clearBtn from '../../assets/icons/clear.svg'
import showBtn from '../../assets/icons/eye.svg'

</script>

<script>
export default {
    name: 'SponsorModalFilter',
    methods: {
        closeSponsorFilter() {
            this.$store.commit('TOGGLE_FILTER_SPONSOR')
            document.body.style.overflow = '';
        },
        sponsorSumToggle(item) {
            for (const key in this.sponsorSumFilter) {
                this.sponsorSumFilter[key].active = false
            }
            item.active = true
        },
        clearAll() {
            this.$store.commit('CLEAR_SPONSOR_FILTER')
            this.updateFilter()
        },
        updateFilter() {
            this.$store.commit('UPDATE_SPONSORS_FILTER')
        }
    },
    computed: {
        sponsorFilter() {
            return this.$store.state.isModalFilterSponsor
        },
        sponsorSumFilter() {
            return this.$store.state.sponsorSumsFilter
        },
        sponsorSumFilter() {
            if (this.$store.state.sponsorSumsFilter) {
                return this.$store.state.sponsorSumsFilter
            } else {
                console.log('error');
            }
        },
        selectedStatus: {
            get() {
                return this.$store.state.selectedStatus;
            },
            set(value) {
                this.$store.commit("UPDATE_SELECTED_STATUS", value);
            }
        },
    },
}
</script>

<template>
    <div v-if="sponsorFilter"
        class="filter top-0 left-0 fixed w-full h-full flex items-center justify-center">
        <dialog :open="sponsorFilter" class="bg-white m-auto flex flex-col">
            <div class="filter__header flex items-center justify-between">
                <h3 class="filter__title">Filter</h3>
                <div class="filter__exit cursor-pointer">
                    <img draggable="false"
                        @click="closeSponsorFilter"
                        :src="exitBtn"
                        alt="exit btn">
                </div>
            </div>
            <div class="filter__status flex flex-col">
                <h3 class="filter__status-title">Ariza holati</h3>
                <select v-model="selectedStatus"
                    name="type"
                    id="type">
                    <option value="all">Barchasi</option>
                    <option value="Yangi">Yangi</option>
                    <option value="Moderatsiyada">Moderatsiya</option>
                    <option value="actived">Tasdiqlangan</option>
                    <option value="cancel">Bekor qilingan</option>
                </select>
            </div>
            <div class="filter__summ flex flex-col">
                <h3 class="filter__summ-title">
                    Homiylik summasi
                </h3>
                <div class="filter__summ-box">
                    <div v-for="(item, index) in sponsorSumFilter"
                        :key="index"
                        @click="sponsorSumToggle(item)"
                        :class="item.active == true && item.type == 'all' ? 'all active' : item.active ? 'active' : item.type == 'all' ? 'all' : ''"
                        class="item">{{ item.money }} <span v-if="item.type !== 'all'"> UZS</span>
                        <img :src="checked"
                            alt="check">
                    </div>
                </div>
            </div>
            <label for="date"
                class="filter__date">
                <h3 class="filter__date-title">
                    Sana
                </h3>
                <input type="date"
                    name="date"
                    id="date">
            </label>
            <div class="filter__bottom">
                <button @click="clearAll"
                    class="filter__bottom-clear">
                    <img :src="clearBtn"
                        alt="clear">
                    <h3>Tozalash</h3>
                </button>
                <button @click="updateFilter"
                    class="filter__bottom-show">
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
    overflow: hidden;
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

    &__status {
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
            cursor: pointer;
            background: rgba(224, 231, 255, 0.2);
            border: 1px solid #E0E7FF;
            border-radius: 6px;
            width: 100%;
            padding: 12px 16px;
        }
    }

    &__summ {
        gap: 8px;

        &-title {
            font-weight: 500;
            font-size: 12px;
            line-height: 14px;
            letter-spacing: 1.125px;
            text-transform: uppercase;
            color: #1D1D1F;
        }

        &-box {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;

            .item {
                cursor: pointer;
                width: calc(100% / 4 - 12px);
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #E0E7FF;
                border-radius: 5px;
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                display: flex;
                gap: 3px;
                align-items: center;
                position: relative;

                @media (max-width: 600px) {
                    width: calc(100% / 3 - 8px);
                }

                @media (max-width: 480px) {
                    width: calc(100% / 2 - 6px);
                }

                span {
                    font-weight: 400;
                    color: #2E5BFF;
                }

                img {
                    display: none;
                }

                &.active {
                    border: 2px solid #2E5BFF;

                    img {
                        display: inline-block;
                        position: absolute;
                        right: 0px;
                        top: 0px;
                        transform: translate(50%, -50%);
                    }
                }

                &.all {
                    background: #E0E7FF;
                }
            }
        }
    }

    &__date {
        display: flex;
        flex-direction: column;
        gap: 8px;

        @media (max-width: 576px) {
            width: 100%;
        }

        &-title {
            font-weight: 500;
            font-size: 12px;
            line-height: 14px;
            letter-spacing: 1.125px;
            text-transform: uppercase;
            color: #1D1D1F;
        }

        input {
            max-width: 250px;
            width: 100%;
            background: rgba(224, 231, 255, 0.2);
            border: 1px solid #E0E7FF;
            border-radius: 6px;
            padding: 11px 16px;

            @media (max-width: 576px) {
                max-width: 100%;
            }

        }
    }

    &__bottom {
        border-top: 2px solid #F5F5F7;
        padding-top: 28px;
        display: flex;
        justify-content: flex-end;
        gap: 16px;

        @media (max-width: 480px) {
            justify-content: center;
            flex-direction: column;
        }

        button {
            display: flex;
            gap: 10px;
            align-items: center;
            text-align: center;
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