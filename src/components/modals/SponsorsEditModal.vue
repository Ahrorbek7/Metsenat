<script setup>
import exitBtn from '../../assets/icons/exit.svg'
import saveIcon from '../../assets/icons/save.svg'
import { useToast } from "vue-toastification"
import {ref} from 'vue'
const data = ref({})
</script>

<script>
export default {
    name: 'SponsorsEditModal',
    props: ['open', 'user'],
    methods: {
        closeEdit() {
            this.$emit('closeEdit');
            document.body.style.overflow = '';
        },
        updateSponsor() {
            const toast = useToast();

            toast("Ma'lumotlar yangilandi", {
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

            this.$emit('closeEdit');
            document.body.style.overflow = '';

            let updateItem = {
                id: this.data.id,
                data: this.data
            };

            this.$store.dispatch('updateSponsor', updateItem);
            updateItem = {};
        }
    },
    watch: {
        user: function (data) {
            Object.assign(this.data, data)
        }
    },
}
</script>

<template>
    <div v-if="open"
        class="filter w-full h-full fixed top-0 left-0 bottom-0">
        <dialog :open="open" class="w-full bg-transparent">
            <form @submit.prevent="updateSponsor"
                class="filter__wrapper bg-white m-auto flex flex-col">

                <div class="filter__header flex items-center justify-between">
                    <h3 class="filter__title">Tahrirlash</h3>
                    <div class="filter__exit cursor-pointer">
                        <img draggable="false"
                            @click="closeEdit"
                            :src="exitBtn"
                            alt="exit btn">
                    </div>
                </div>
                <div class="filter__body w-full flex flex-col">
                    <div class="filter__type flex items-center">
                        <div :class="data.firm == '' ? 'active' : ''"
                            class="filter__type-item left text-center w-1/2">Jismoniy shaxs</div>
                        <div :class="data.firm != '' ? 'active' : ''"
                            class="filter__type-item right text-center w-1/2">Yuridik shaxs</div>
                    </div>
                    <div class="filter__list">
                        <ul class="flex flex-col">
                            <li>
                                <label for="name">
                                    <h3>F.I.Sh. (Familiya Ism Sharifingiz)</h3>
                                    <input class="filter__list-item"
                                        id="name"
                                        name="name"
                                        v-model="data.full_name"
                                        type="text">
                                </label>
                            </li>
                            <li>
                                <label for="tel">
                                    <h3>Telefon raqam</h3>
                                    <input class="filter__list-item"
                                        id="tel"
                                        name="tel"
                                        placeholder="+998 (00) 000-00-00"
                                        v-model="data.phone"
                                        type="tel">
                                </label>
                            </li>
                            <li>
                                <label for="status">
                                    <h3>Holati</h3>
                                    <input class="filter__list-item"
                                        readonly
                                        :value="data.get_status_display"
                                        type="text">
                                </label>
                            </li>
                            <li>
                                <label for="sum">
                                    <h3>Homiylik summasi</h3>
                                    <input class="filter__list-item"
                                        name="sum"
                                        placeholder="0 UZS"
                                        v-model="data.sum"
                                        id="sum">
                                </label>
                            </li>
                            <li>
                                <label for="type">
                                    <h3>To‘lov turi</h3>
                                    <select class="filter__list-item"
                                        name="type"
                                        id="type">
                                        <option value="actived">Pul o‘tkazmalari</option>
                                        <option value="new">30 000 000 UZS</option>
                                        <option value="cancel">30 000 000 UZS</option>
                                        <option value="moderation">30 000 000 UZS</option>
                                    </select>
                                </label>
                            </li>
                            <li v-if="data.firm != ''">
                                <label for="company">
                                    <h3>Tashkilot nomi</h3>
                                    <input class="filter__list-item"
                                        id="company"
                                        name="company"
                                        v-model="data.firm"
                                        type="text">
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="filter__bottom flex w-full">
                    <button type="submit"
                        class="filter__btn flex items-center cursor-pointer">
                        <img :src="saveIcon"
                            alt="save">
                        <h3>Saqlash</h3>
                    </button>
                </div>
            </form>

        </dialog>
    </div>
</template>

<style lang="scss" scoped>
.filter {
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0px;
    }

    dialog {
        padding: 100px 0px;
    }

    &__wrapper {
        border-radius: 12px;
        padding: 28px;
        max-width: 600px;
        width: 95%;
        gap: 28px;

        @media (max-width: 480px) {
            padding: 20px  16px;
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


    &__body {
        gap: 32px;
    }

    &__type {

        &-item {
            padding: 14px 0px;
            background: #FFFFFF;
            border: 2px solid #E0E7FF;
            color: rgba(51, 102, 255, 0.6);
            font-weight: 500;
            font-size: 12px;
            line-height: 12px;
            letter-spacing: 1.125px;
            text-transform: uppercase;
            border: 2px solid #E0E7FF;

            &.active {
                border: 2px solid #3366FF;
                background: #3366FF;
                color: #fff;
            }

            &.left {
                border-radius: 6px 0px 0px 6px;
            }

            &.right {
                border-radius: 0px 6px 6px 0px;
            }
        }
    }

    &__list {
        ul {
            gap: 28px;

            li {
                label {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;

                    h3 {
                        font-weight: 500;
                        font-size: 12px;
                        line-height: 14px;
                        letter-spacing: 1.125px;
                        text-transform: uppercase;
                        color: #1D1D1F;
                    }

                    .filter__list-item {
                        background: rgba(224, 231, 255, 0.2);
                        border: 1px solid #E0E7FF;
                        border-radius: 6px;
                        padding: 12px 16px;
                        font-weight: 400;
                        font-size: 15px;
                        line-height: 18px;
                        color: #2E384D;
                    }

                    select {
                        cursor: pointer;
                    }
                }
            }
        }
    }

    &__bottom {
        padding-top: 28px;
        border-top: 2px solid #F5F5F7;
        justify-content: flex-end;
    }

    &__btn {
        background: #3366FF;
        gap: 14px;
        height: 42px;
        padding: 0px 32px;
        box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.04), 0px 2px 4px rgba(96, 97, 112, 0.16);
        border-radius: 5px;

        h3 {
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
            letter-spacing: -0.35px;
            color: #FFFFFF;

        }
    }
}
</style>