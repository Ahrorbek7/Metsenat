<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'TheHeader',
  setup() {
    const router = useRouter();

    const logout = () => {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      router.push('/login');
    };

    return {
      logout,
    };
  },
};
</script>
<template>
  <header class="header py-3 px-16">
    <div class="container flex items-center justify-between flex-wrap">
      <div class="header__logo">
        <img src="../assets/icons/logo.svg"
          alt="logo"> 
      </div>
      <div class="header__menu flex items-center">
        <div class="header__user cursor-pointer flex items-center rounded-md">
          <h3 class="header__user-name font-bold">
            User
          </h3>
          <div class="header__user-img flex justify-center rounded-md">
            <img src="../assets/icons/user.svg"
              alt="user">
          </div>
        </div>
        <div @click="logout"
          class="header__logout cursor-pointer">
          <img src="../assets/icons/logout.svg"
            alt="log out">
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  z-index: 2;
  box-shadow: 0px 25px 40px rgba(0, 0, 0, 0.03);

  .container {
    gap: 24px;
  }

  &__menu {
    gap: 40px;

    @media (max-width: 576px) {
      width: 100%;
      justify-content: space-between;
    }
  }

  &__user {
    padding: 4px 4px 4px 20px;
    background: #F1F1F3;
    gap: 24px;

    &-name {
      font-size: 14px;
      line-height: 150%;
      letter-spacing: -0.35px;
      color: #28293D;
    }

    &-img {
      width: 32px;
      height: 32px;
      background: #00AE69;
      align-items: flex-end;
    }
  }

  &__logout {
    border-radius: 7px;
    width: 32px;
    height: 32px;
  }
}
</style>
