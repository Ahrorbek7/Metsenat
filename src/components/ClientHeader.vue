    <script>
    import logoImg from '../assets/images/client-logo.svg'
    import checked from '../assets/icons/checked.svg'
    import yesIcon from '../assets/icons/yes.svg'
    import sumBox from "../data/sumBox.json"
    import activeTab from "../data/activeTab.json"

    export default {
        name: "ClientHeader",
        data() {
            return {
                logoImg,
                yesIcon,
                checked,
                otherInput: false,
                sendActive: false,
                sumBox: sumBox,
                activeTab: activeTab,
                sponsor: {
                    full_name: "",
                    phone: "",
                    sum: 0,
                    payment_type: [
                        45
                    ],
                    firm: "",
                    spent: 0,
                    comment: ""
                },
                otherSum: '',
                selectSum: ''
            }
        },
        methods: {
            addSpace(item) {
                if (item == 0) {
                    return 'BOSHQA'
                }
                return item.toLocaleString().replaceAll(',', ' ')
            },
            changeActive(item) {
                this.sumBox.map(el => el.active = false);
                item.active = true;
                if (item.sum === 0) {
                    this.sponsor.sum = this.otherSum
                } else {
                    this.sponsor.sum = item.sum;
                }
            },
            changeTab(item) {
                this.activeTab.map(el => el.active = false)
                item.active = true
            },
            addSponsor() {
                this.sponsor.sum = String(this.sponsor.sum)
                if (this.sponsor.sum == 0) {
                    this.sponsor.sum = String(this.otherSum)
                }
                this.$store.dispatch('createSponsor', this.sponsor)

                this.sponsor = {
                    full_name: "",
                    phone: "",
                    sum: 0,
                    payment_type: [
                        45
                    ],
                    firm: "",
                    spent: 0,
                    comment: ""
                }
                this.sumBox = this.sumBox.map(el => {
                    el.active = false;
                    return el;
                });
                this.sumBox[0].active = true;
                this.sendActive = true
            }
        },
        computed: {
            activeOther() {
                let result = false
                for (let I = 0; I < this.sumBox.length; I++) {
                    const el = this.sumBox[I];
                    if (el.active == true && el.sum == 0) {
                        result = true
                    }
                }
                return result
            },
            legalPerson() {
                return this.activeTab[1].active === true
            },
        }
    }
    </script>

    <template>
        <header class="header bg-white py-5 px-0">
            <div class="container flex items-center justify-between">
                <div class="header__logo">
                    <img :src="logoImg" alt="logo">
                </div>
                <div class="header__menu flex items-center">
                    <ul class="header__nav flex items-center">
                        <li class="header__nav-item">
                            <a href="#">Asosiy</a>
                        </li>
                        <li class="header__nav-item">
                            <a href="#">Grantlar</a>
                        </li>
                        <li class="header__nav-item">
                            <a href="#">Soliq imtiyozlari</a>
                        </li>
                    </ul>
                    <div class="header__menu-box">
                        <div @click="$router.push('/login')"
                            class="header__login flex items-center cursor-pointer py-0 px-3 rounded-md">
                            <img class="h-full" src="../assets/icons/login.svg" alt="log out">
                            <h3>Kirish</h3>
                        </div>
                        <a href="#" class="header__signup">
                            Ro‘yxatdan o’tish
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <section class="content">
            <div class="container flex">
                <div v-if="!sendActive" class="content__box">
                    <h1 class="content__box-title">Homiy sifatida arzia topshirish</h1>
                    <form @submit.prevent="addSponsor" class="form mt-10 content__box-form flex flex-col w-full">
                        <div class="form__tab flex items-center">
                            <div v-for="item in activeTab" :key="item.id" class="form__tab-item cursor-pointer w-1/2 text-center bg-white py-6 px-0" @click="changeTab(item)"
                                :class="!item.active ? item.class : `${item.class} active`">{{ item.title }}</div>
                        </div>
                        <div class="form__box flex flex-col w-full">
                            <label class="form__box-item flex flex-col" for="name">
                                <h3>F.I.Sh. (Familiya Ism Sharifingiz)</h3>
                                <input id="name" v-model="sponsor.full_name" required
                                    placeholder="Abdullayev Abdulla Abdulla o’g’li" type="text">
                            </label>
                            <label class="form__box-item" for="tel">
                                <h3>Telefon raqamingiz</h3>
                                <input id="tel" v-model="sponsor.phone" required placeholder="+998 00 000-00-00" type="text">
                            </label>
                            <div class="form__box-item">
                                <h3>To‘lov summasi</h3>
                                <div class="form__sum grid">
                                    <div v-for="(item, index) in sumBox" :key="index" @click="changeActive(item)"
                                        :class="{ active: item.active }" class="form__sum-item cursor-pointer bg-white rounded-md py-8 px-0 flex justify-center items-center">
                                        <p>
                                            {{ addSpace(item.sum) }}
                                        </p>
                                        <span v-if="!item.sum == 0">Uzs</span>
                                        <img :src="checked" alt="check">
                                    </div>
                                    <input v-if="activeOther" id="sum" type="number" required v-model="otherSum" placeholder="0"
                                        class="form__sum-item other">
                                </div>
                            </div>
                            <label v-if="legalPerson" class="form__box-item" for="firm">
                                <h3>TASHKILOT NOMI</h3>
                                <input id="firm" v-model="sponsor.firm" required placeholder="Orient group" type="text">
                            </label>
                        </div>
                        <button class="form__btn text-center text-white rounded-md">Yuborish</button>
                    </form>
                </div>
                <div class="send bg-white flex items-center justify-center w-full pt-[150px]" v-else>
                    <div class="send-box flex items-center flex-col w-full max-w-[340px] bg-white">
                        <div class="send-item flex items-center justify-center rounded-[50%]">
                            <img :src="yesIcon" alt="yes">
                        </div>
                        <h1 class="send-title mt-8 text-center">
                            Ma’lumotlar tekshirish uchun yuborildi.
                        </h1>
                        <h3 class="send-subtitle text-center mt-4">
                            Tez orada siz bilan operatorimiz bog’lanib, barcha ma’lumotlarni aniqlashtiradi.
                        </h3>
                    </div>
                </div>
                <div v-if="activeTab[0].active && !sendActive" >
                    <img width="600" height="200" class="hi" src="../assets/images/mirziyoyev_text.jpg" alt="">
                </div>
            </div>
        </section>
    </template>

<style lang="scss">
body {
    background: #FFFFFF;
}
</style>

<style lang="scss" scoped>
.header {
    .hi {
        height: 900px;
    }
    z-index: 2;
    box-shadow: 0px 25px 40px rgba(0, 0, 0, 0.03);
    .container {
        column-gap: 50px;
        row-gap: 30px;
        @media (max-width: 1000px) {
            flex-direction: column;
            align-items: center;
        }
    }

    &__menu {
        column-gap: 40px;
        row-gap: 20px;

        @media (max-width: 1000px) {
            width: 100%;
            justify-content: space-between;
        }

        @media (max-width: 670px) {
            flex-direction: column;
        }

        &-box {
            display: flex;
            align-items: center;
            gap: 40px;

            @media (max-width: 670px) {
                max-width: 480px;
                width: 100%;
                justify-content: space-between;
            }

        }
    }

    &__nav {
        gap: 40px;

        @media (max-width: 670px) {
            max-width: 480px;
            width: 100%;
            justify-content: space-between;
        }

        &-item {
            a {
                font-weight: 500;
                font-size: 14px;
                line-height: 150%;
                color: #28293D;
            }
        }
    }

    &__login {
        height: 32px;
        gap: 6px;
        border: 2px solid black;
        height: 44px;

        h3 {
            font-weight: 700;
            font-size: 14px;
            line-height: 150%;
            color: #28293D;
        }
    }

    &__signup {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #3366FF;
        padding: 8px 32px;
        border: 2px solid #3366FF;
        border-radius: 8px;
    }
}

.content {
    .send {

        &-item {
            width: 120px;
            height: 120px;
            border: 6px solid #E8F3DD;
        }

        &-title {
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
            color: #2E384D;
        }

        &-subtitle {
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: #B2B7C1;
        }
    }

    &__box {
        padding: 76px 0px;
        width: 100%;
        max-width: 800px;
        margin: auto;
        &-title {
            font-weight: 700;
            font-size: 40px;
            line-height: 140%;
            letter-spacing: 0.01em;
            color: #1D1D1F;
        }

        .form {
            gap: 28px;

            &__tab {
                &-item {
                    border: 2px solid #E0E7FF;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 12px;
                    letter-spacing: 1.125px;
                    text-transform: uppercase;
                    color: rgba(51, 102, 255, 0.6);

                    &.active {
                        background: #3366FF;
                        border: 2px solid #3366FF;
                        color: #FFFFFF;
                    }

                    &.left {
                        border-radius: 6px 0px 0px 6px;
                    }

                    &.right {
                        border-radius: 0px 6px 6px 0px;
                    }
                }
            }

            &__box {
                gap: 28px;

                &-item {
                    gap: 10px;


                }

                h3 {
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 14px;
                    letter-spacing: 1.125px;
                    text-transform: uppercase;
                    color: #1D1D1F;
                }

                input:not(input[type='radio']) {
                    width: 100%;
                    padding: 12px 16px;
                    background: rgba(224, 231, 255, 0.2);
                    border: 1px solid #E0E7FF;
                    border-radius: 6px;

                    &::placeholder {
                        color: rgba(46, 56, 77, 0.35);
                    }
                }
            }

            &__sum {
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;

                @media (max-width: 500px) {
                    grid-template-columns: repeat(2, 1fr);
                }

                &-item {
                    border: 1px solid #E0E7FF;
                    gap: 4px;
                    position: relative;
                    gap: 6px;

                    &.other {
                        cursor: text;
                        grid-column-start: 1;
                        grid-column-end: 4;
                        background: rgba(224, 231, 255, 0.2);
                        border: 1px solid #E0E7FF;
                        border-radius: 6px;
                        font-weight: 400;
                        font-size: 15px;
                        line-height: 18px;
                        color: #000000;

                        @media (max-width: 500px) {
                            grid-column-end: 3;
                        }
                    }

                    p {
                        font-weight: 500;
                        font-size: 18px;
                        line-height: 21px;
                        text-transform: uppercase;
                        color: #2E384D;
                    }

                    span {
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 18px;
                        text-transform: uppercase;
                        color: #2E5BFF;

                    }

                    img {
                        display: none;
                    }

                    &.active {
                        border: 2px solid #2E5BFF;
                        background: #F9FAFF;

                        img {
                            display: inline-block;
                            position: absolute;
                            right: 0px;
                            top: 0px;
                            transform: translate(50%, -50%);
                        }
                    }
                }
            }

            &__btn {
                width: 100%;
                padding: 14px 0px 15px;
                background: #2E5BFF;
                font-weight: 500;
                font-size: 15px;
            }
        }
    }
}
</style>
