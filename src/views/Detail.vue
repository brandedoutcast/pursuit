<template>
    <div id="detail">
        <div class="heading">
            <div class="title">{{ activeHabit.name }}</div>
        </div>
        <div class="row">
            <div class="col">Streak</div>
            <div class="col">{{ streaks }}</div>
        </div>
        <div class="row">
            <div class="col">Break</div>
            <div class="col">{{ breaks }}</div>
        </div>
        <div class="row">
            <div class="col">Started On</div>
            <div class="col">{{ activeHabit.start | date }}</div>
        </div>
        <div class="row">
            <div class="col">Ends After</div>
            <div class="col">{{ activeHabit.endAfter }} iterations</div>
        </div>
        <div class="row">
            <input type="button" value="Back" @click="gotoList" />
            <input
                type="button"
                value="Delete"
                @click="
                    deleteHabit(activeHabit.name)
                    gotoList()
                "
            />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex"
import { format, parse } from "date-fns"

export default {
    computed: {
        ...mapState(["activeHabit"]),
        ...mapGetters(["streaks", "breaks"])
    },
    methods: { ...mapMutations(["deleteHabit", "gotoList"]) },
    filters: {
        date(date) {
            return format(parse(date, "yyyy-MM-dd", new Date()), "dd MMM yyyy")
        }
    }
}
</script>

<style lang="stylus">
#detail
    display flex
    flex-direction column
    height 100%

    .heading
        position relative
        display flex
        justify-content center
        align-items center
        font-weight bold

        .title
            text-align center
            font-size 1.5em

    .row
        display flex
        margin 0.5em

        &:last-child
            flex 1
            justify-content space-around
            align-items flex-end

        .col
            flex 1
            padding 0.5em

            &:first-child
                font-weight 500

            &:nth-child(2)
                text-align right

        input[type=button]
            padding 0.5em 1em
            width 45%
            border none
            background none
            background-color black
            color white
            font-size 1em
</style>
