<script setup>

import leftarrowIcon from '../assets/icons/leftarrow.svg'
import plusBtn from "../assets/icons/add.svg"
import {ref} from 'vue'
import { useToast } from "vue-toastification"

import { mapGetters } from 'vuex'
const data = ref([])
    const newStudent = ref({
      full_name: "",
      type: '',
      phone: "",
      institute: '',
      contract: null,
    })


</script>

<script>
export default {
    name: "AddStudent",

    methods: {
        addStudent() {
            const toast = useToast()

            this.$store.dispatch('postStudent', this.newStudent)

            this.newStudent = {
                full_name: "",
                type: '',
                phone: "",
                institute: '',
                contract: null,
            }

            toast("Talaba qo'shildi !", {
                position: "top-right",
                timeout: 2000,
                hideProgressBar: false,
                closeButton: true,
                closeOnClick: true,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                draggable: true,
                draggablePercent: 0.6,
                closeButton: "button",
                icon: true,
                rtl: false
            });
            this.$router.push('/admin/students')
        }
    },
    computed: {
        ...mapGetters(['getUniversityList'])
    },
    mounted() {
        this.$store.dispatch('getUniversity')
    }
}
</script>

<template>
    <section class="add w-full flex flex-col items-center">
        <div class="add__header w-full py-8 px-0">
            <div class="container flex items-center">
                <button @click="$router.push('/admin/students')"
                    class="add__header-btn ">
                    <img :src="leftarrowIcon"
                        alt="arrow">
                </button>
                <div class="add__header-box">
                    <h2 class="add__header-name">Talaba qo‘shish</h2>
                </div>
            </div>
        </div>
        <form @submit.prevent="addStudent()"
            class="add__body flex flex-col w-full bg-white max-w-[900px] my-16">
            <div class="add__body-box flex items-center flex-wrap">
                <label class="add__el"
                    for="name">
                    <h3 class="add__subtitle">F.I.Sh. (Familiya Ism Sharif)</h3>
                    <input v-model="newStudent.full_name"
                        id="name"
                        required
                        name="name"
                        placeholder="F.I.Sh."
                        type="text">
                </label>
                <label class="add__el flex flex-col"
                    for="tel">
                    <h3 class="add__subtitle">Telefon raqam</h3>
                    <input v-model="newStudent.phone"
                        id="tel"
                        name="tel"
                        required
                        placeholder="+998(00)000-00-00"
                        type="text">
                </label>
            </div>
            <label for="university"
                class="add__university add__el w-full">
                <h3 class="add__subtitle">OTM</h3>
                <select v-model="newStudent.institute"
                    name="university"
                    id="university"
                    class="w-full"
                    required>
                    <option value=""
                        disabled
                        selected>--Oliygohni tanlang</option>
                    <option v-for="(item, index) in getUniversityList"
                        :key="index"
                        :value="item.id">{{ item.name }}</option>
                </select>
            </label>
            <div class="add__body-box flex items-center flex-wrap">
                <label class="add__el"
                    for="name">
                    <h3 class="add__subtitle">Talabalik turi</h3>
                    <select v-model="newStudent.type"
                        required
                        name="university"
                        id="university"
                        class="rounded-md items-center flex"
                        >
                        <option value=""
                            disabled
                            selected>-- Talabalik turini tanlang</option>
                        <option value="1">Bakalavr</option>
                        <option value="2">Magistr</option>
                    </select>
                </label>
                <label class="add__el"
                    for="sum">
                    <h3 class="add__subtitle">Kontrakt summa</h3>
                    <input v-model="newStudent.contract"
                        required
                        id="sum"
                        name="sum"
                        placeholder="Summani kiriting"
                        type="number">
                </label>
            </div>
            <div class="add__bottom justify-end flex w-full">
                <button type="submit"
                    class="add__bottom-btn flex items-center cursor-pointer rounded-md h-[42px]">
                    <img :src="plusBtn"
                        alt="plus">
                    <h3>Qo‘shish</h3>
                </button>
            </div>
        </form>
    </section>
</template>

<style lang="scss" scoped>
.add {
    &__subtitle {
        font-size: 12px;
        line-height: 14px;
        letter-spacing: 1.125px;
        text-transform: uppercase;
        color: #1D1D1F;
    }

    &__header {
        background: hsl(0, 0%, 100%);

        .container {
            gap: 20px;
        }

        &-btn {
            background: none;
        }

        &-name {
            font-weight: 700;
            font-size: 24px;
            line-height: 28px;
            color: #28293D;
        }
    }

    &__el {
        gap: 8px;

        input,
        select {
            background: rgba(224, 231, 255, 0.2);
            border: 1px solid #E0E7FF;
            font-weight: 400;
            font-size: 15px;
            padding: 0px 16px;
            height: 42px;
            color: #2E384D;
        }
    }

    &__body {
        gap: 28px;
        width: 95%;
        border: 1px solid #EBEEFC;
        box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.03);
        border-radius: 12px;
        padding: 24px 32px;

        @media (max-width: 576px) {
            margin-top: 10px;
        }

        &-box {
            gap: 28px;

            label {
                width: calc(50% - 14px);

                @media (max-width: 576px) {
                    width: 100%;
                }

                input[type=number]::-webkit-inner-spin-button,
                input[type=number]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                input {
                    &::placeholder {
                        color: rgba(46, 56, 77, 0.35);
                    }
                }
            }
        }
    }

    &__bottom {
        border-top: 2px solid #F5F5F7;
        padding-top: 28px;

        &-btn {
            background: #3366FF;
            box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.04), 0px 2px 4px rgba(96, 97, 112, 0.16);
            gap: 10px;
            padding: 0px 32px;



            h3 {
                font-weight: 500;
                font-size: 14px;
                line-height: 24px;
                letter-spacing: -0.35px;
                color: #FFFFFF;
            }
        }
    }
}
</style>