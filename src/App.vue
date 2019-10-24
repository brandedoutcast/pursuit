<template>
    <div id="app">
        <div id="header">
            <span class="title" @click="gotoList">Pursuit</span>
            <span @click="clear">Clear</span>
        </div>
        <main>
            <component :is="$store.state.activeView" />
        </main>
    </div>
</template>

<script>
import New from "./views/New"
import List from "./views/List"
import Detail from "./views/Detail"
import store from "./store"
import { mapMutations } from "vuex"

export default {
    name: "App",
    store,
    components: { New, List, Detail },
    beforeMount() {
        this.$nextTick(() => this.init())
    },
    methods: { ...mapMutations(["init", "clear", "gotoList"]) }
}
</script>

<style lang="stylus">
html, body
    margin 0
    padding 0
    font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif

#app
    display flex
    flex-direction column
    overflow hidden
    height 100vh

    #header
        display flex
        justify-content space-between
        padding 0.5em
        background-color #242424
        color whitesmoke
        text-align center
        font-weight bold

        span
            padding 0.25em 1em

    main
        flex 1
        overflow-y auto
        padding 1em
</style>