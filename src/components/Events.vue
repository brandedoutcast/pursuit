<template>
    <div class="event-section" v-if="list.length">
        <div class="title">{{ title }}</div>
        <ul class="list">
            <li :class="{ done: event.done, event: true }" v-for="event in list" :key="event.name">
                <span class="name" @click="gotoDetail(event.name)">{{ event.name }}</span>
                <svg
                    class="tick"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    @click="toggleEvent(event.name)"
                >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations } from "vuex"

export default {
    props: ["list", "title"],
    methods: { ...mapMutations(["toggleEvent", "gotoDetail"]) }
}
</script>

<style lang="stylus">
.event-section
    .title
        padding 0.25em 0
        border-bottom 0.1em solid
        font-weight 500

    .list
        margin 0
        padding 0
        list-style-type none

    .event
        display flex
        align-items center
        margin 1em 0
        border-radius 0.25em
        box-shadow 0 0 0.25em lightgrey

        .name, .tick
            padding 1em
            transition padding 0.25s ease-in-out, font-weight 0.25s ease-in-out

        .name
            flex 1

        .tick
            width 2em
            stroke lightgrey

        &.done
            background-color whitesmoke
            box-shadow none

            .name, .tick
                padding 0.5em 1em

            .name
                text-decoration line-through
                font-weight normal

            .tick
                stroke lightseagreen
</style>