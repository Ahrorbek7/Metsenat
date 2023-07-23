<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// Import icons
import showIconBlue from '../assets/icons/eyeblue.svg'

const filteredStudents = ref([])
const activePage = ref(null)
const pageCount = ref(null)
const startNum = ref(null)
const endNum = ref(null)

const router = useRouter()
const store = useStore()

const goSingle = (id) => {
  router.push(`/admin/students/single/${id}`)
}

const getStudents = (item) => {
  store.dispatch('fetchStudents', item)
}

const minusPagination = () => {
  store.dispatch('fetchStudents', 'minus')
}

const plusPagination = () => {
  store.dispatch('fetchStudents', 'plus')
}

const filterStudents = () => {
  const selectedType = store.state.selectedType
  const selectedUniversity = store.state.selectedUniversity

  filteredStudents.value = store.getters.getStudentsList.filter(el =>
    (selectedType === 'all' || el.type === selectedType) &&
    (selectedUniversity === 'all' || el.institute.id === selectedUniversity)
  )
}

const studentsCount = computed(() => store.getters.studentsCount)

watchEffect(() => {
  const data = studentsCount.value
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
  filteredStudents.value = store.getters.getStudentsList
})

watchEffect(() => {
  filterStudents()
})

getStudents(1)
</script>


<template>
    <section class="students w-full py-19 px-0">
        <div class="container w-full flex flex-col">
            <div class="students__add flex justify-end">
                <div @click="$router.push('/admin/students/add')"
                    class="students__add-box flex cursor-pointer items-center py-2.5 px-5 rounded-md text-white mx-14">
                    <img src="../assets/icons/add.svg" alt="add">
                    <h3>Talaba qo‘shish</h3>
                </div>
            </div>
            <div class="students__box w-full flex flex-col pb-4">
                <div class="students__header w-full">
                    <ul class="students__header-list w-full flex items-center px-6">
                        <li class="number">#</li>
                        <li class="name">f.i.sh.</li>
                        <li class="type">Talabalik turi</li>
                        <li class="university">OTM</li>
                        <li class="summ-spent">Ajratilingan summa</li>
                        <li class="summ-contract">Kontrakt miqdori</li>
                        <li class="show">Amallar</li>
                    </ul>
                </div>
                <div class="students__body w-full px-10">
                    <ul v-if="filteredStudents.length > 0" class="students__body-list w-full flex flex-col">
                        <li v-for="(item, index) in filteredStudents" :key="index" class="item">
                            <ul class="item__box flex items-center text ">
                                <li class="number">{{ ++index }}</li>
                                <li class="name">{{ item.full_name }}</li>
                                <li class="type">{{ item.type == 1 ? 'Bakalavr' : 'Magistr' }}</li>
                                <li class="unversity">{{ item.institute.name }}</li>
                                <li v-if="!item.given" class="summ-spent"><span>Ajratilmagan</span></li>
                                <li v-else class="summ-spent">{{ item.given.toLocaleString().replaceAll(',', ' ') }}
                                    <span>UZS</span>
                                </li>
                                <li class="summ-contract">{{ item.contract.toLocaleString().replaceAll(',', ' ') }}
                                    <span>UZS</span>
                                </li>
                                <li @click="goSingle(item.id)" class="show">
                                    <img class="mx-14" :src="showIconBlue" draggable="false" alt="showIcon">
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div v-else class="empty">
                        Talabalar topilmadi
                    </div>
                </div>
            </div>
            <div class="pagination mb-8">
                <div class="pagination__count">
                    {{ studentsCount.count ? studentsCount.count : 10 }} tadan {{ startNum ? startNum : 1 }}-{{ endNum
                        ?
                        endNum : 10 }} ko‘rsatilmoqda
                </div>
                <div class="pagination__block">
                    <div class="pagination__show">
                        <p>Ko‘rsatish</p>
                        <select name="count" id="count">
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div class="pagination__box">
                        <button :disabled="studentsCount.active <= 1" :class="studentsCount.active <= 1 ? 'disabled' : ''"
                            @click="minusPagination" class="pagination__btn left">
                            <img src="../assets/icons/pagination.svg" alt="button">
                        </button>
                        <div class="pagination__wrapper">
                            <div v-if="studentsCount.active > 1" @click="getStudents(studentsCount.active - 1)"
                                class="pagination__item">{{ studentsCount.active - 1 }}</div>
                            <div class="pagination__item active">{{ studentsCount.active }}</div>
                            <div @click="getStudents(studentsCount.active + 1)" class="pagination__item">{{
                                studentsCount.active + 1 }}</div>
                            <div @click="getStudents(studentsCount.active + 2)" class="pagination__item">{{
                                studentsCount.active + 2 }}</div>
                        </div>
                        <button :disabled="studentsCount.active >= pageCount" @click="plusPagination"
                            :class="studentsCount.active >= pageCount ? 'disabled' : ''" class="pagination__btn">
                            <img src="../assets/icons/pagination.svg" alt="button" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.students {
    .container {
        gap: 20px;
    }

    &__add {
        &-box {
            gap: 14px;
            background: #3366FF;

            h3 {
                font-weight: 500;
                font-size: 14px;
                line-height: 24px;
                letter-spacing: -0.35px;
            }
        }
    }

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
                    width: 22%;
                    text-align: left;
                }

                &.type {
                    width: 13%;
                }

                &.university {
                    width: 22%;
                }

                &.summ-spent {
                    width: 15%;
                }

                &.summ-contract {
                    width: 15%;
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
                background: #FFFFFF;
                border: 1px solid rgba(46, 91, 255, 0.08);
                border-radius: 8px;
                padding: 25px 0px;
                width: 100%;

                &__box {
                    text-align: center;

                    li {
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 22px;
                        color: #1D1D1F;
                    }

                    .number {
                        width: 5%;
                    }

                    .name {
                        font-weight: 500;
                        font-size: 15px;
                        line-height: 18px;
                        color: #1D1D1F;

                        width: 22%;
                        text-align: left;
                    }

                    .type {
                        width: 13%;
                    }

                    .unversity {
                        width: 22%;
                    }

                    .summ-spent,
                    .summ-contract {
                        width: 15%;

                        font-weight: 500;
                        font-size: 14px;
                        line-height: 22px;
                        color: #2E384D;

                        span {
                            color: #B2B7C1;
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