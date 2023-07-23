<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const form = ref<{ email: string; password: string }>();
    form.value = {
      email: '',
      password: '',
    };

    const router = useRouter();

    const login = () => {
      if (form.value.email === 'metsenatadmin' && form.value.password === 'uF9aH1vZ3bV2kN2y') {
        localStorage.setItem('token', 'ilgan');
        if (localStorage.getItem('token')) {
          router.push({ name: 'dashboard' });
          form.value = {};
        }
        alert('Xush kelibsiz!');
      } else {
        alert('Email yoki parol xato!');
        form.value = {};
      }
    };

    return {
      form,
      login,
    };
  },
};

</script>

<template>
    <div class="login w-full flex items-center justify-center h-[100vh]">
        <div class="login__wrapper flex flex-wrap gap-12 items-center max-w-[390px] w-full px-1">
            <div @click="$router.push('/')"
                class="login__logo cursor-pointer max-w-[314px]">
                <img class="w-full"
                 src="../assets/images/login__logo.svg"
                alt="logo">
            </div>
            <div class="login__box w-full p-8 bg-white rounded-md">
                <h2 class="login__box-title font-semibold text-3xl leading-7">
                    Kirish
                </h2>
                <form @submit.prevent="login" class="flex flex-col mt-12">
                    <label class="login__box-item"
                        for="login">
                        <h3>LOGIN</h3>
                        <input class="mt-2 w-full py-3 px-4 rounded-md lending-7" placeholder="login"
                            type="text"
                            required
                            name="login"
                            v-model="form.email"
                            id="login">
                    </label>
                    <label class="login__box-item"
                        for="password">
                        <h3>PAROL</h3>
                        <input class="mt-2 w-full py-3 px-4 rounded-md lending-7" placeholder="password"
                            type="password"
                            name="password"
                            required
                            v-model="form.password"
                            id="password">
                    </label>
                    <div class="captcha flex items-center justify-between py-3 px-3.5">
                        <label for="captcha" class="cursor-pointer flex items-center">
                            <input class="mt-2" type="checkbox"
                                name="captcha"
                                id="captcha">
                            <h3>I’m not a robot</h3>
                        </label>
                        <img src="../assets/images/reCAPTCHA.png"
                            alt="captcha">
                    </div>
                    <input class="login__box-btn rounded-md text-white items-center cursor-pointer"
                        type="submit"
                        value="Kirish">
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
    background-color: #F5F5F7;
    &__box {
        border: 1px solid #EBEEFC;
        box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.03);

        @media (max-width: 768px) {
            padding: 32px 16px;
        }

        &-title {
            font-size: 24px;
            color: #28293D;
        }


        &-item {
            h3 {
                font-weight: 500;
                font-size: 12px;
                letter-spacing: 1.125px;
                color: #1D1D1F;
            }

            input {
                background: rgba(224, 231, 255, 0.2);
                border: 1px solid #E0E7FF;
                font-size: 14px;
                &::placeholder {
                    color: rgba(46, 56, 77, 0.35);
                }
            }
        }

        form {
            gap: 22px;
        }

        &-btn {
            padding: 14px 0px 13px;
            background: #2E5BFF;
            font-weight: 500;
            font-size: 15px;
            }

        .captcha {
            background: #FAFAFA;
            border: 1px solid #D6D6D6;

            label {
                gap: 10px;

                h3 {
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 16px;
                    color: #000000;
                }
            }
        }
    }
}
</style>