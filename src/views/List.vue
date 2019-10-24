<template>
    <div>
        <div id="events" v-if="events.length">
            <Events :list="dayEvents" :title="'Due Today'" />
            <Events :list="weekEvents" :title="'Due This Week'" />
        </div>
        <div id="no-events" v-else>👍 You're All Done!</div>
        <svg
            id="fab"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            @click="gotoNew"
        >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import Events from "../components/Events"

export default {
    components: { Events },
    computed: { ...mapGetters(["events", "dayEvents", "weekEvents"]) },
    methods: { ...mapMutations(["gotoNew"]) }
}
</script>

<style lang="stylus">
#fab
    position fixed
    right 1.5em
    bottom 1.5em
    width 4em
    border-radius 4em
    background-color black
    stroke white

#no-events
    text-align center
    font-size 1.5em

#events
    padding 0 0 6em 0
</style>