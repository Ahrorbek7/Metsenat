<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// Import icons
import showIconBlue from '../assets/icons/eyeblue.svg'

const filteredSponsors = ref([])
const activePage = ref(null)
const pageCount = ref(null)
const startNum = ref(null)
const endNum = ref(null)

const router = useRouter()
const store = useStore()

const goSingle = (id) => {
  router.push(`/admin/sponsors/single/${id}`)
}

const getSponsors = (item) => {
  store.dispatch('fetchSponsors', item)
}
const minusPagination = () => {
  store.dispatch('fetchSponsors', 'minus')
}

const plusPagination = () => {
  store.dispatch('fetchSponsors', 'plus')
}
const filterSponsors = () => {
  const selectedStatus = store.state.selectedStatus;
  const sumFilter = store.state.sponsorSumsFilter;
  const sponsors = computed(() => store.getters.getSponsorsList.value);

  let filteredSponsors = computed(() =>
    selectedStatus === 'all'
      ? sponsors.value
      : sponsors.value.filter(el => el.get_status_display === selectedStatus)
  );

  for (const key in sumFilter) {
    if (sumFilter[key].active) {
      const money = sumFilter[key].money;
      if (money !== 'Barchasi') {
        filteredSponsors.value = filteredSponsors.value.filter(el => el.sum <= money);
      }
    }
  }
};
const sponsorsCount = computed(() => store.getters.sponsorsCount)

watchEffect(() => {
  const data = sponsorsCount.value
  pageCount.value = Math.floor(data.count / 10)
  activePage.value = data.active
  startNum.value = 1

  if (data.active >= 2) {
    startNum.value = ((data.active - 1) * 10) + 1
  }

  endNum.value = data.active * 10

  if (data.active > Math.floor(data.count - 10) / 10) {
    endNum.value = data.count
  }
})

watchEffect(() => {
  filteredSponsors.value = store.getters.getSponsorsList
})

watchEffect(() => {
  filterSponsors()
})

getSponsors(1)

</script>


<template>
    <section class="sponsors py-12 px-0 w-full">
        <div class="container">
            <div class="sponsors__box w-full flex flex-col">
                <div class="sponsors__header w-full">
                    <ul class="sponsors__header-list w-full flex items-center px-6">
                        <li class="number">#</li>
                        <li class="name">f.i.sh.</li>
                        <li class="telefon">Tel.Raqami</li>
                        <li class="summ-sponsor">Homiylik summasi</li>
                        <li class="summ-spent">Sarflangan summa</li>
                        <li class="date">Sana</li>
                        <li class="status">Holati</li>
                        <li class="show">Amallar</li>
                    </ul>
                </div>
                <div class="sponsors__body w-full px-10">
                    <ul v-if="filteredSponsors"
                        class="sponsors__body-list flex flex-col">
                        <li v-for="(item, index) in filteredSponsors"
                            :key="index"
                            class="item bg-white">
                            <ul class="item__box w-full flex items-center text-center">
                                <li class="number">{{ index + 1 }}</li>
                                <li class="name">{{ item.full_name }}</li>
                                <li class="telefon">{{ item.phone }}</li>
                                <li class="summ-sponsor">{{ item.sum.toLocaleString().replaceAll(',', ' ') }}
                                    <span>UZS</span>
                                </li>
                                <li v-if="!item.spent"
                                    class="summ-spent"><span>Sarflanmagan</span></li>
                                <li v-else
                                    class="summ-spent">{{ item.spent.toLocaleString().replaceAll(',', ' ') }}
                                    <span>UZS</span>
                                </li>
                                <li class="date">{{ item.created_at.slice(0, 10) }}</li>
                                <li class="status"
                                    :class="item.get_status_display">{{ item.get_status_display }}</li>
                                <li @click="goSingle(item.id)"
                                    class="show">
                                    <img class="mx-14" :src="showIconBlue"
                                        alt="showIcon">
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div class="empty"
                        v-else>
                        Homiylar topilmadi
                    </div>
                </div>
            </div>
            <div class="pagination">
                <div class="pagination__count">
                    {{ sponsorsCount.count ? sponsorsCount.count : 10 }} tadan {{ startNum ? startNum : 1 }}-{{ endNum
                        ?
                        endNum : 10 }} ko‘rsatilmoqda
                </div>
                <div class="pagination__block">
                    <div class="pagination__show">
                        <p>Ko‘rsatish</p>
                        <select name="count"
                            id="count">
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div class="pagination__box">
                        <button :disabled="sponsorsCount.active <= 1"
                            :class="sponsorsCount.active <= 1 ? 'disabled' : ''"
                            @click="minusPagination"
                            class="pagination__btn left">
                            <img src="../assets/icons/pagination.svg"
                                alt="button">
                        </button>
                        <div class="pagination__wrapper">
                            <div v-if="sponsorsCount.active > 1"
                                @click="getSponsors(sponsorsCount.active - 1)"
                                class="pagination__item">{{ sponsorsCount.active - 1 }}</div>
                            <div class="pagination__item active">{{ sponsorsCount.active }}</div>
                            <div @click="getSponsors(sponsorsCount.active + 1)"
                                class="pagination__item">{{ sponsorsCount.active + 1 }}</div>
                            <div @click="getSponsors(sponsorsCount.active + 2)"
                                class="pagination__item">{{ sponsorsCount.active + 2 }}</div>
                        </div>
                        <button :disabled="sponsorsCount.active >= pageCount"
                            @click="plusPagination"
                            :class="sponsorsCount.active >= pageCount ? 'disabled' : ''"
                            class="pagination__btn">
                            <img src="../assets/icons/pagination.svg"
                                alt="button">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.sponsors {
    &__box {
        gap: 12px;
        overflow-x: auto;
        &::-webkit-scrollbar {
            height: 8px;

            @media (max-width: 992px) {
                height: 3px;
            }
        }

        &::-webkit-scrollbar-track {
            background: rgb(202, 202, 202);
        }

        &::-webkit-scrollbar-thumb {
            background: gray;
            border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: rgb(172, 172, 172);
        }
    }

    &__header {
        @media (max-width: 1100px) {
            width: 1100px;
        }

        &-list {
            li {
                font-weight: 500;
                font-size: 12px;
                line-height: 14px;
                letter-spacing: 1.125px;
                text-transform: uppercase;
                color: #B1B1B8;
                text-align: center;

                &.number {
                    width: 5%;
                }

                &.name {
                    width: 20%;
                    text-align: left;
                }

                &.telefon {
                    width: 15%;
                }

                &.summ-sponsor {
                    width: 15%;
                }

                &.summ-spent {
                    width: 15%;
                }

                &.date {
                    width: 10%;
                }

                &.status {
                    width: 12%;
                }

                &.show {
                    width: 8%;
                }
            }
        }
    }

    &__body {
        @media (max-width: 1100px) {
            width: 1100px;
        }

        &-list {
            gap: 12px;

            .item {
                border: 1px solid rgba(46, 91, 255, 0.08);
                padding: 25px 0px;
                &__box {
                    .number {
                        width: 5%;
                        font-weight: 400;
                        font-size: 15px;
                        line-height: 22px;
                        text-align: center;
                        color: #1D1D1F;
                    }

                    .name {
                        font-weight: 500;
                        font-size: 15px;
                        line-height: 18px;
                        color: #1D1D1F;
                        width: 20%;
                        text-align: left;
                    }

                    .telefon {
                        width: 15%;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 22px;
                        color: #1D1D1F;
                    }

                    .summ-sponsor {
                        width: 15%;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 22px;
                        color: #2E384D;

                        span {
                            color: #B2B7C1;
                        }
                    }

                    .summ-spent {
                        width: 15%;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 22px;
                        text-align: center;
                        color: #2E384D;

                        span {
                            color: #B2B7C1;
                        }
                    }

                    .date {
                        width: 10%;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 22px;
                        color: #1D1D1F;
                    }

                    .status {
                        width: 12%;
                        font-weight: 400;
                        font-size: 15px;
                        line-height: 22px;

                        &.Yangi {
                            color: #5BABF2;
                        }

                        &.Moderatsiyada {
                            color: #FFA445;
                        }

                        &.actived {
                            color: #00CF83;
                        }

                        &.cancel {
                            color: #979797;
                        }
                    }

                    .show {
                        width: 8%;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>

<style lang="scss">
.pagination {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;

    @media (max-width: 630px) {
        flex-direction: column-reverse;
        align-items: flex-start;
    }

    &__count {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #1D1D1F;
    }

    &__show {
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: 400;
        font-size: 15px;
        line-height: 22px;
        color: #1D1D1F;

        p {
            @media (max-width: 410px) {
                display: none;
            }
        }

        select {
            cursor: pointer;
            font-weight: 400;
            font-size: 15px;
            line-height: 22px;
            color: #1D1D1F;
            padding: 5px 7px;
            border-radius: 4px;
            background: #FFFFFF;
            border: 1px solid #DFE3E8;
        }
    }


    &__block {
        display: flex;
        align-items: center;
        gap: 10px;

        @media (max-width: 630px) {
            width: 100%;
            justify-content: space-between;
        }
    }

    &__box {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    &__btn {
        background: #FFFFFF;
        border: 1px solid #DFE3E8;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 9px 11px;
        cursor: pointer;

        &.left {
            transform: rotate(180deg);
        }

        &.disabled {
            opacity: .35;
            cursor: auto;
        }
    }

    &__wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    &__item {
        cursor: pointer;
        width: 32px;
        height: 32px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #1D1D1F;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        border: 1px solid #DFE3E8;
        border-radius: 4px;

        &.active {
            color: #3366FF;
            border: 1px solid #3366FF;
        }
    }
}

.empty {
    background: #FFFFFF;
    // border: 1px solid rgba(46, 91, 255, 0.08);
    // border-radius: 8px;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>