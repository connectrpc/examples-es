<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <RouterView />
</template>

<style>
@import '@/assets/base.css';

.App {
    text-align: center;
}

.App-logo {
    height: 6vmin;
    pointer-events: none;
}

/* @media (prefers-reduced-motion: no-preference) { */
/*   .App-logo { */
/*     animation: App-logo-spin infinite 20s linear; */
/*   } */
/* } */

.App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: calc(10px + 2vmin);
    color: white;
}

.App-link {
    color: #61dafb;
}

.app-title {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.prompt-text {
    margin: 0 0 15px 0;
}
.intro-container {
    margin: 15px;
}
.resp-text {
    font-size: 1rem;
    margin: 5px;
}
.text-input {
    width: 200px;
}

h1 {
    margin-bottom: 0;
}
h5 {
    margin: 0 0 30px 0;
}

/* @keyframes App-logo-spin { */
/*   from { */
/*     transform: rotate(0deg); */
/*   } */
/*   to { */
/*     transform: rotate(360deg); */
/*   } */
/* } */
</style>
