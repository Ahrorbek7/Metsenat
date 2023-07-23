<template>
  <main>
    <component :is="$route.meta.layout || 'div'">
      <router-view />
    </component>
  </main>
</template>


<style>
.container {
  width: 100%;
  max-width: 1224px;
  padding: 0px 12px;
  margin: auto;
}
</style>