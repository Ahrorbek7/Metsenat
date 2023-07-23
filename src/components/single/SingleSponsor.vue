<script setup>
import userImg from '../../assets/images/user.jpg'
import editIcon from '../../assets/icons/edit.svg'
import leftarrowIcon from '../../assets/icons/leftarrow.svg'
import bottomImg from '../../assets/images/rocket.png'

import SponsorsEditModal from '../modals/SponsorsEditModal.vue'

import { mapGetters } from 'vuex'

</script>

<script>
export default {
    name: "Single",
    components: {
        SponsorsEditModal,
    },
    data() {
        return {
            edit: false,
            user: {}
        }
    },
    methods: {
        openModal() {
            this.edit = !this.edit;
            document.body.style.overflow = 'hidden';
        },
    },
    computed: {
        ...mapGetters(['singleSponsor']),
    },
    mounted() {
        this.$store.dispatch('detailSponsor', this.$route.params.id)
    },
    watch: {
        singleSponsor: function (data) {
            this.user = data
        }
    }
}
</script>

<template>
    <section class="single">
        <div class="single__header">
            <div class="container">
                <button @click="$router.push('/admin/sponsors')"
                    class="single__header-btn">
                    <img :src="leftarrowIcon"
                        alt="arrow">
                </button>
                <div class="single__header-box">
                    <h2 class="single__header-name">{{ singleSponsor.full_name }}</h2>
                    <div :class="singleSponsor.get_status_display"
                        class="single__header-status">{{ singleSponsor.get_status_display }}</div>
                </div>
            </div>
        </div>
        <div class="single__body">
            <div class="single__body-header">
                <h1 class="title">Homiy haqida</h1>
                <button @click="openModal"
                    class="edit">
                    <img :src="editIcon"
                        alt="edit">
                    <h3 class="edit__text">Tahrirlash</h3>
                </button>
            </div>
            <div class="user">
                <div class="user__img">
                    <img :src="userImg"
                        alt="">
                </div>
                <div class="user__name">
                    {{ singleSponsor.full_name }}
                </div>
            </div>
            <div class="single__body-box">
                <div class="item">
                    <h4 class="item__title">telefon raqam</h4>
                    <h3 class="item__text">{{ singleSponsor.phone }}</h3>
                </div>
                <div class="item">
                    <h4 class="item__title">Homiylik summasi</h4>
                    <h3 class="item__text">{{ singleSponsor.sum?.toLocaleString().replaceAll(',', ' ') }} UZS</h3>
                </div>
                <div v-if="singleSponsor.firm?.length"
                    class="item">
                    <h4 class="item__title">Tashkilot nomi</h4>
                    <h3 class="item__text">{{ singleSponsor.firm }}</h3>
                </div>
            </div>
        </div>
        <div class="single__bottom">
            <img draggable="false"
                :src="bottomImg"
                alt="rocket">
        </div>
    </section>

    <sponsors-edit-modal @closeEdit="openModal"
        :open="edit"
        :user="user" />
</template>

<style lang="scss" scoped>
.single {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__header {
        width: 100%;
        background: #ffffff;
        padding: 20px 0px;

        .container {
            display: flex;
            align-items: flex-start;
            gap: 20px;

            @media (max-width: 576px) {
                flex-direction: column;
                align-items: flex-start;
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

        &-status {
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            text-align: center;
            padding: 6px 11px 6px 12px;
            border-radius: 5px;

            &.actived {
                color: #00CF83;
                background: #DDFFF2;
            }

            &.Moderatsiyada {
                color: #FFA445;
                background: #ffe7cd;
            }

            &.Yangi {
                color: #5BABF2;
                background: #e0f1ff;
            }

            &.cancel {
                color: #979797;
                background: #ecebeb;
            }
        }

        &-box {
            display: flex;
            align-items: center;
            gap: 12px;
            width: calc(100% - 56px);

            @media (max-width: 768px) {
                flex-direction: column;
                align-items: flex-end;
            }

            @media (max-width: 576px) {
                width: 100%;
                align-items: flex-start;
            }
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
        margin-top: 40px;

        @media (max-width: 576px) {
            margin-top: 10px;
        }

        &-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;

            @media (max-width: 440px) {
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

                @media (max-width: 440px) {
                    width: 100%;
                }

                &__text {
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 17px;
                    color: #3365FC;
                }
            }
        }

        .user {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-top: 26px;

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
            margin-top: 24px;
            flex-wrap: wrap;
            row-gap: 24px;

            .item {
                width: 50%;
                display: flex;
                flex-direction: column;
                gap: 12px;

                @media (max-width: 480px) {
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

    &__bottom {
        position: absolute;
        bottom: 0;
        z-index: -1;

        @media (max-width: 480px) {
            display: none;
        }

        img {
            width: 100%;
        }
    }
}
</style>