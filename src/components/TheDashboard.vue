<script lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import redTicket from '../assets/icons/red.svg';
import blueTicket from '../assets/icons/blue.svg';
import yellowTicket from '../assets/icons/yellow.svg';
import { useStore } from 'vuex';
import { Component, Ref, ComputedRef } from 'vue';
import Chart from './Chart.vue'

interface DashboardItem {
  id: number;
  class: string;
  price: number;
  title: string;
  img: string;
}

export default {
  name: "TheDashboard",
  setup(): {
  } {
    const store = useStore();
    const options = {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      }
    };

    const series = [
      {
        name: 'Homiylar',
        data: [10, 40, 30, 50, 30, 60, 70]
      },
      {
        name: 'Talabalar',
        data: [10, 20, 50, 40, 20, 50, 40]
      }
    ];

    const dashboardList: Ref<DashboardItem[]> = ref([
      {
        id: 1,
        class: 'blue',
        price: 0,
        title: 'Jami to‘langan summa',
        img: blueTicket
      },
      {
        id: 2,
        class: 'yellow',
        price: 0,
        title: 'Jami so‘ralgan summa',
        img: yellowTicket
      },
      {
        id: 3,
        class: 'red',
        price: 0,
        title: 'To‘lanishi kerak summa',
        img: redTicket
      }
    ]);

    const fetchingToDashboard = (): void => {
      store.dispatch('fetchingToDashboard');
    };

    const gettingDashboardList: ComputedRef<any> = computed(() => {
      return store.getters.gettingDashboardList;
    });

    watch(gettingDashboardList, (data) => {
      dashboardList.value[0].price = data.total_paid;
      dashboardList.value[1].price = data.total_need;
      dashboardList.value[2].price = data.total_must_pay;
    });

    onMounted(() => {
      fetchingToDashboard();
    });

    return {
      options,
      series,
      dashboardList
    };
  }
} as Component;
</script>

<template>
  <section class="dashboard">
    <div class="container">
      <ul class="dashboard__features flex items-center">
        <li v-for="(item, index) in dashboardList" :key="index" class="dashboard__features-item item flex items-center rounded-md">
          <div :class="item.class" class="item__img flex items-center justify-center">
            <img :src="item.img" :alt="`ticket ${item.class}`">
          </div>
          <div class="item__box">
            <h4 class="item__title">{{ item.title }}</h4>
            <h3 class="item__price">{{ item.price.toLocaleString().replaceAll(',', ' ') }} <span>UZS</span></h3>
          </div>
        </li>
      </ul>
    </div>
    <apexchart class="dash-chart" height="400px" type="area" :options="options" :series="series"></apexchart>
  </section>
</template>


<style lang="scss" scoped>
.dashboard {
    background-color: #F5F5F7;
    padding: 48px 0px;
    .dash-chart {
        width: 95%;
        background-color: white;
        height: 300px !important;
        margin: 2rem auto;
    }
    @media (max-width: 576px) {
        padding: 12px 0px;
    }

    &__features {
        row-gap: 30px;
        column-gap: 30px;
        flex-wrap: wrap;

        @media (max-width: 992px) {
            column-gap: 10px;
            row-gap: 10px;
        }

        &-item {
            width: calc(100% / 3 - 20px);
            background: #FFFFFF;
            border: 1px solid rgba(46, 91, 255, 0.08);
            padding: 24px;
            
            @media (max-width: 992px) {
                width: calc(100% / 2 - 5px);
                padding: 16px;
            }
            
            @media (max-width: 576px) {
                width: 100%;
                padding: 24px 40px;
            }
        }
        
        .item {
            width: 425px;
            gap: 16px;
            height: 130px;
            margin: 0 1.5rem;

            @media (max-width: 576px) {
                gap: 40px;
            }

            &__img {
                width: 48px;
                height: 48px;
                border-radius: 12px;

                &.blue {
                    background: rgba(76, 111, 255, 0.1);
                }

                &.yellow {
                    background: rgba(237, 199, 0, 0.1);
                }

                &.red {
                    background: rgba(237, 114, 0, 0.1);
                }
            }

            &__box {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            &__title {
                font-weight: 400;
                font-size: 12px;
                line-height: 12px;
                color: #7A7A9D;
            }

            &__price {
                font-weight: 700;
                font-size: 18px;
                line-height: 20px;
                color: #2E384D;

                span {
                    color: #B2B7C1;
                }
            }
        }
    }
}
</style>