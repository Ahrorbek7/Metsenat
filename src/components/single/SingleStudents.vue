<script setup>
import userImg from '../../assets/images/user.jpg'
import editIcon from '../../assets/icons/edit.svg'
import leftarrowIcon from '../../assets/icons/leftarrow.svg'
import bottomImg from '../../assets/images/rocket.png'
import plusIcon from '../../assets/icons/addblue.svg'


import StudentsEditModal from '../modals/StudentsEditModal.vue'
import SponsorsAddModal from '../modals/SponsorsAddModal.vue'
import SponsorEditModal from '../modals/SponsorEditModal.vue'


import { mapGetters } from 'vuex'
</script>

<script>
export default {
    name: "Single",
    components: {
        StudentsEditModal,
        SponsorsAddModal,
        SponsorEditModal
    },
    data() {
        return {
            user: {},
            edit: false,
            add: false,
            editSponsor: false,
            sponsors: [
                {
                    name: 'Saimov Rustam Saimjonovich',
                    sum: 1000000
                },
                {
                    name: 'Sanginov Otabek Muratovich',
                    sum: 7000000
                }
            ],
        }
    },
    methods: {
        openModal() {
            this.edit = !this.edit
            document.body.style.overflow = 'hidden';
        },
        openAdd() {
            this.add = !this.add;
            document.body.style.overflow = 'hidden';
        },
        goBack() {
            this.$router.push('/admin/students')
        },
        editSponsorOpen() {
            this.editSponsor = !this.editSponsor
            document.body.style.overflow = 'hidden';
        }
    },
    computed: {
        ...mapGetters(['singleStudent']),
        ...mapGetters(['getUniversityList']),
    },
    mounted() {
        this.$store.dispatch('detailStudent', this.$route.params.id)
        this.$store.dispatch('getUniversity')
    },
    watch: {
        singleStudent: function (data) {
            this.user = data
        }
    }
}
</script>

<template>
    <section class="single">
        <div class="single__header">
            <div class="container">
                <div class="single__header-left">
                    <button @click="goBack"
                        class="single__header-btn">
                        <img :src="leftarrowIcon"
                            alt="arrow">
                    </button>
                    <div class="single__header-box">
                        <h2 class="single__header-name">{{ singleStudent.full_name }}</h2>
                    </div>
                </div>
                <div class="single__header-right">
                    <button @click="openAdd">
                        <img :src="plusIcon"
                            alt="plus">
                        <h3>Homiy qo‘shish</h3>
                    </button>
                </div>
            </div>
        </div>
        <div class="single__body">
            <div class="single__body-header">
                <h1 class="title">Talaba haqida</h1>
                <button @click="openModal"
                    class="edit">
                    <img :src="editIcon"
                        alt="edit">
                    <h3 class="edit__text">Tahrirlash</h3>
                </button>
            </div>
            <div class="single__body-main">
                <div class="single__body-title">
                    <h3>Asosiy ma’lumotlar</h3>
                    <div class="line"></div>
                </div>
                <div class="user">
                    <div class="user__img">
                        <img :src="userImg"
                            alt="">
                    </div>
                    <div class="user__name">
                        {{ singleStudent.full_name }}
                    </div>
                </div>
                <div class="single__body-box">
                    <div class="item">
                        <h4 class="item__title">telefon raqam</h4>
                        <h3 class="item__text">{{ singleStudent.phone }}</h3>
                    </div>
                </div>
            </div>
            <div class="single__body-main">
                <div class="single__body-title">
                    <h3>O‘qish joyi haqida ma’lumot</h3>
                    <div class="line"></div>
                </div>
                <div class="single__body-box">
                    <div class="item">
                        <h4 class="item__title">OTM</h4>
                        <h3 class="item__text">{{ singleStudent.institute?.name }}</h3>
                    </div>
                    <div class="item">
                        <h4 class="item__title">Talabalik turi</h4>
                        <h3 class="item__text">{{ singleStudent.type == 1 ? "Bakalavr" : "Magistr" }}</h3>
                    </div>
                    <div class="item">
                        <h4 class="item__title">Ajratilingan summa</h4>
                        <h3 class="item__text">{{ singleStudent.given?.toLocaleString().replaceAll(',', ' ') }} UZS</h3>
                    </div>
                    <div class="item">
                        <h4 class="item__title">Kontrakt miqdori</h4>
                        <h3 class="item__text">{{ singleStudent.contract?.toLocaleString().replaceAll(',', ' ') }} UZS</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="single__under">
            <div class="single__under-header">
                <h3 class="single__under-title">
                    Talabaga homiylar
                </h3>
                <button @click="openAdd"
                    class="single__under-btn">
                    <img :src="plusIcon"
                        alt="plus">
                    <h3>Homiy qo‘shish</h3>
                </button>
            </div>
            <div class="single__under-content sponsors">
                <div class="sponsors__header">
                    <h3 class="number">#</h3>
                    <h3 class="name">f.i.sh</h3>
                    <h3 class="sum">Ajratilingan summa</h3>
                    <h3 class="edit">Amallar</h3>
                </div>
                <div class="sponsors__body">
                    <ul class="sponsors__body-list">
                        <li class="sponsors__body-item"
                            v-for="(item, index) in sponsors"
                            :key="index">
                            <h3 class="number">{{ ++index }}</h3>
                            <h3 class="name">{{ item.name }}</h3>
                            <h3 class="sum">{{ item.sum }} <span> UZS</span> </h3>
                            <h3 class="edit">
                                <button @click="editSponsorOpen">
                                    <img :src="editIcon"
                                        alt="">
                                </button>
                            </h3>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="single__bottom">
            <img draggable="false"
                :src="bottomImg"
                alt="rocket">
        </div>
    </section>

    <students-edit-modal @closeEdit="openModal"
        :user="user"
        :open="edit"
        :university="getUniversityList" />
    <sponsors-add-modal @closeAdd="openAdd"
        :open="add" />
    <sponsor-edit-modal @closeEditSponsor="editSponsorOpen"
        :open="editSponsor" />
</template>

<style lang="scss" scoped>
.single {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    &__header {
        width: 100%;
        background: hsl(0, 0%, 100%);
        padding: 28px 0px;

        .container {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            row-gap: 24px;

            @media (max-width: 576px) {
                flex-direction: column;
                align-items: flex-start;
            }
        }

        &-left {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        &-right {
            max-width: 205px;
            width: 100%;

            @media (max-width: 480px) {
                max-width: 100%;
            }

            button {
                cursor: pointer;
                background: #EDF1FD;
                border-radius: 5px;
                padding: 0px 36px;
                height: 42px;
                display: flex;
                align-items: center;
                gap: 10px;
                width: 100%;

                @media (max-width: 480px) {
                    justify-content: center;
                }

                h3 {
                    font-weight: 500;
                    font-size: 14px;
                    letter-spacing: -0.35px;
                    color: #3365FC;
                }
            }
        }

        &-btn {
            background: none;
            cursor: pointer;
        }

        &-name {
            font-weight: 700;
            font-size: 24px;
            line-height: 28px;
            color: #28293D;
        }

        &-box {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }

    &__body {
        max-width: 800px;
        width: 95%;
        background: #FFFFFF;
        border: 1px solid #EBEEFC;
        box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.03);
        border-radius: 12px;
        padding: 24px 32px;

        @media (max-width: 576px) {
            padding: 24px 16px;
        }

        &-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;

            @media (max-width: 480px) {
                flex-direction: column;
                align-items: flex-start;
            }

            .title {
                font-weight: 700;
                font-size: 24px;
                line-height: 28px;
                color: #28293D;
            }

            .edit {
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 10px 30px;
                background: #EDF1FD;
                border-radius: 5px;

                @media (max-width: 480px) {
                    width: 100%;
                    justify-content: center;
                }

                &__text {
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 17px;
                    color: #3365FC;
                }
            }
        }


        &-main {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 24px;

            &:last-child {
                margin-top: 16px;
            }
        }

        &-title {
            display: flex;
            align-items: center;
            position: relative;
            margin-top: 26px;

            h3 {
                font-weight: 500;
                font-size: 12px;
                line-height: 14px;
                letter-spacing: 1.125px;
                text-transform: uppercase;
                color: #3366FF;
                padding: 2px 11px;
                background: #E5EBFF;
                position: relative;
                z-index: 2;
            }

            .line {
                z-index: 1;
                background: #E4E8F0;
                height: 1px;
                width: 100%;
                position: absolute;
            }
        }

        .user {
            display: flex;
            align-items: center;
            gap: 20px;

            &__img {
                border-radius: 6px;
                width: 64px;
                height: 64px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            &__name {
                font-weight: 500;
                font-size: 16px;
                line-height: 130%;
                letter-spacing: -0.01em;
                color: #212121;
                max-width: 170px;
            }
        }

        &-box {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            row-gap: 24px;
            column-gap: 16px;

            .item {
                width: calc(50% - 8px);
                display: flex;
                flex-direction: column;
                gap: 12px;

                @media (max-width: 576px) {
                    width: 100%;
                }

                &__title {
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 14px;
                    letter-spacing: 1.125px;
                    text-transform: uppercase;
                    color: #B5B5C3;
                }

                &__text {
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 130%;
                    letter-spacing: -0.01em;
                    color: #212121;
                }
            }
        }
    }

    &__under {
        background: #FFFFFF;
        border: 1px solid #EBEEFC;
        box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.03);
        border-radius: 12px;
        padding: 24px 32px;
        max-width: 800px;
        width: 95%;

        @media (max-width: 576px) {
            padding: 24px 16px;
        }

        &-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            row-gap: 16px;

            @media (max-width: 576px) {
                flex-direction: column;
                align-items: flex-start;
            }
        }


        &-title {
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 28px;
            color: #28293D;
        }

        &-btn {
            cursor: pointer;
            background: #EDF1FD;
            border-radius: 5px;
            padding: 0px 36px;
            height: 42px;
            display: flex;
            align-items: center;
            gap: 10px;

            @media (max-width: 480px) {
                width: 100%;
                justify-content: center;
            }

            h3 {
                font-weight: 500;
                font-size: 14px;
                letter-spacing: -0.35px;
                color: #3365FC;
            }
        }

        &-content {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
            margin-top: 36px;
        }

        .sponsors {

            @media (max-width: 576px) {
                overflow-x: auto;
                padding-bottom: 16px;

                &::-webkit-scrollbar {
                    height: 4px;
                }

                &::-webkit-scrollbar-track {
                    background: rgb(202, 202, 202);
                }

                &::-webkit-scrollbar-thumb {
                    background: gray;
                }

                &::-webkit-scrollbar-thumb:hover {
                    background: rgb(172, 172, 172);
                }
            }

            .number {
                width: 7%;
            }

            .name {
                text-align: left;
                width: 43%;
            }

            .sum {
                width: 35%;
            }

            .edit {
                width: 15%;
            }

            &__header {
                display: flex;
                align-items: center;

                @media (max-width: 576px) {
                    min-width: 576px;
                }

                h3 {
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 14px;
                    letter-spacing: 1.125px;
                    text-transform: uppercase;
                    color: #B1B1B8;
                    text-align: center;
                }
            }

            &__body {
                &-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    width: 100%;

                    @media (max-width: 576px) {
                        min-width: 576px;
                    }
                }

                &-item {
                    display: flex;
                    align-items: center;
                    height: 60px;
                    background: #FBFBFC;
                    border: 1px solid rgba(46, 91, 255, 0.08);
                    border-radius: 8px;

                    h3 {
                        text-align: center;
                    }

                    .number {
                        font-weight: 400;
                        font-size: 15px;
                        line-height: 22px;
                        color: #1D1D1F;
                    }

                    .name {
                        font-weight: 500;
                        font-size: 15px;
                        line-height: 18px;
                        color: #1D1D1F;
                    }

                    .sum {
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 22px;
                        color: #2E384D;

                        span {
                            color: #B2B7C1;
                        }
                    }

                    .edit {
                        display: flex;
                        justify-content: center;

                        button {
                            cursor: pointer;
                            width: 40px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: transparent;
                        }
                    }
                }
            }
        }
    }

    &__bottom {
        img {
            width: 100%;
        }

        @media (max-width: 576px) {
            display: none;
        }
    }
}
</style>