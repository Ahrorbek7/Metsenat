<script>
import { ref, computed, watch, onMounted, getCurrentInstance  } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'NavigationPanel',
  setup() {
    const { emit } = getCurrentInstance();
    const store = useStore();
    const selectComponent = ref('dashboard');

    const tabItem = (item) => {
      store.commit('CHANGE_TAB_ACTIVE', item);
      updateTabView();
    };

    const updateTabView = () => {
      let data = JSON.stringify(store.state.tabView);
      localStorage.setItem('tabView', data);
    };

    const showTab = () => {
      store.commit('NEW_TAB_VIEW', JSON.parse(localStorage.getItem('tabView')));
    };

    const activeFilter = () => {
      document.body.style.overflow = 'hidden';
      if (tabActived.value === 2) {
        store.commit('TOGGLE_FILTER_SPONSOR');
      } else if (tabActived.value === 3) {
        store.commit('TOGGLE_FILTER_STUDENTS');
      }
    };

    const tabActived = computed(() => {
      const activeTabItem = store.state.tabView.find(tab => tab.active);
      return activeTabItem ? activeTabItem.id : null;
    });

    watch(selectComponent, (newVal) => {
    emit('updateSelectedComponent', newVal);
    });

    onMounted(() => {
      showTab();
    });

    return {
      selectComponent,
      tabItem,
      updateTabView,
      showTab,
      activeFilter,
      tabActived
    };
  } 
};
</script>


<template>
    <div class="navbar bg-white py-7 px-0">
        <div class="container flex items-center justify-between">
            <nav class="nav">
                <ul class="nav__list w-full flex items-center px-8">
                    <li v-for="(item, index) in $store.state.tabView"
                        :key="index"
                        @click="tabItem(item)"
                        :class="item.active ? 'active' : ''"
                        class="nav__list-item cursor-pointer bg-white py-4 text-center">
                        <input type="radio"
                            name="admin-page"
                            :id="item.id"
                            :value="item.value"
                            class="w-full left-0 top-0 absolute h-full cursor-pointer"
                            v-model="selectComponent">
                        <label :for="item.value">{{ item.title }}</label>
                    </li>
                </ul>
            </nav>
            <div class="navbar__menu flex items-center px-16">
                <div class="search rounded-md w-full">
                    <input type="search"
                        name="search"
                        id="search"
                        class="bg-transparent"
                        placeholder="Izlash">
                    <button class="search__btn flex items-center justify-center cursor-pointer bg-transparent absolute">
                        <img src="../assets/icons/search.svg"
                            alt="search">
                    </button>
                </div>
                <button v-if="tabActived == 2"
                    @click="activeFilter"
                    class="filter filter cursor-pointer flex items-center px-12 py-0 rounded-md">
                    <img src="../assets/icons/filter.svg"
                        alt="filter">
                    <h3>Filter</h3>
                </button>
                <button v-else-if="tabActived == 3"
                    @click="activeFilter"
                    class="filter cursor-pointer flex items-center px-12 py-0 rounded-md">
                    <img src="../assets/icons/filter.svg"
                        alt="filter">
                    <h3>Filter</h3>
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navbar {
    position: relative;
    z-index: 1;

    .container {
        flex-wrap: wrap;
        row-gap: 25px;
    }

    .nav {
        width: 100%;
        max-width: 580px;

        @media (max-width: 992px) {
            max-width: 100%;
        }

        &__list {
            &-item {
                width: calc(100% / 3);
                border: 2px solid #E0E7FF;
                font-weight: 500;
                font-size: 12px;
                line-height: 12px;
                letter-spacing: 1.125px;
                text-transform: uppercase;
                position: relative;
                color: rgba(51, 102, 255, 0.6);
                &.active {
                    border: 2px solid #3366FF;
                    background: #3366FF;
                    color: #fff;
                }

                &:first-child {
                    border-radius: 6px 0px 0px 6px;
                }

                &:last-child {
                    border-radius: 0px 6px 6px 0px;
                }

                input[type="radio"] {
                    z-index: 2;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                }
            }
        }

    }

    &__menu {
        gap: 20px;
        @media (max-width: 992px) {
            width: 100%;
        }

        .search {
            max-width: 284px;
            position: relative;
            background: #E8E8E8;
            @media (max-width: 992px) {
                max-width: 100%;
            }

            &__btn {
                left: 0;
                top: 0;
                width: 38px;
                height: 40px;
            }

            input {
                border: none;
                outline: none;
                padding: 12px 8px 10px 42px;
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;

                &::placeholder {
                    color: #B1B1B8;
                }
            }
        }

        .filter {
            gap: 10px;
            background: #EDF1FD;
            height: 40px;
            h3 {
                font-weight: 500;
                font-size: 14px;
                line-height: 24px;
                letter-spacing: -0.35px;
                color: #3365FC;
            }
        }
    }
}
</style>