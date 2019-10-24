<template>
    <form id="new" @submit.prevent="addHabit">
        <div class="row">
            <label>Name</label>
            <input type="text" v-model="name" placeholder="Eat Healthy" minlength="3" autofocus />
        </div>
        <div class="row">
            <label>Starts From</label>
            <input
                type="date"
                :value="start | date"
                @input="start = new Date($event.target.value)"
                :min="start | date"
            />
        </div>
        <div id="frequency" class="row">
            <label>Frequency</label>
            <div class="tabs" @click="changeFreq">
                <span :class="{ active: activeFreq == 'everyday' }">Everyday</span>
                <span :class="{ active: activeFreq == 'weekdays' }">Weekdays</span>
                <span :class="{ active: activeFreq == 'custom' }">Custom</span>
            </div>
            <div class="options" @click="chooseFrequency" v-if="activeFreq == 'custom'">
                <span :class="{ active: frequency.indexOf(0) >= 0 }" data-val="0">S</span>
                <span :class="{ active: frequency.indexOf(1) >= 0 }" data-val="1">M</span>
                <span :class="{ active: frequency.indexOf(2) >= 0 }" data-val="2">T</span>
                <span :class="{ active: frequency.indexOf(3) >= 0 }" data-val="3">W</span>
                <span :class="{ active: frequency.indexOf(4) >= 0 }" data-val="4">T</span>
                <span :class="{ active: frequency.indexOf(5) >= 0 }" data-val="5">F</span>
                <span :class="{ active: frequency.indexOf(6) >= 0 }" data-val="6">S</span>
            </div>
            <div class="info">Week starts on Sunday</div>
        </div>
        <div class="row">
            <label>Ends After</label>
            <div id="endOccurance">
                <input type="number" v-model="endAfter" min="1" />
                <span> occurances</span>
            </div>
        </div>
        <div id="controls" class="row">
            <input type="submit" value="Create" :disabled="!isFormValid" />
            <input type="button" value="Cancel" @click="gotoList" />
        </div>
    </form>
</template>

<script>
import { mapMutations } from "vuex"
import { format, compareAsc, startOfToday } from "date-fns"

const DAYS = [0, 1, 2, 3, 4, 5, 6]

export default {
    data() {
        return {
            name: null,
            frequency: DAYS,
            start: Date.now(),
            endAfter: 21,
            activeFreq: "everyday"
        }
    },
    computed: {
        isFormValid() {
            return (
                !!this.name &&
                /[a-zA-Z0-9]{3,}/.test(this.name) &&
                this.frequency.length > 0 &&
                compareAsc(this.start, startOfToday()) >= 0 &&
                this.endAfter >= 1
            )
        }
    },
    methods: {
        ...mapMutations(["newHabit", "gotoList"]),
        changeFreq(e) {
            if (e.target.tagName === "SPAN") {
                let freq = e.target.textContent.toLowerCase()
                switch (freq) {
                    case "everyday":
                        this.frequency = DAYS
                        break
                    case "weekdays":
                        this.frequency = DAYS.filter(d => d > 0 && d < 6)
                        break
                }
                this.activeFreq = freq
            }
        },
        chooseFrequency(e) {
            if (e.target.tagName === "SPAN") {
                let val = parseInt(e.target.dataset["val"])
                if (this.frequency.indexOf(val) < 0) this.frequency.push(val)
                else this.frequency = this.frequency.filter(d => d != val)
            }
        },
        addHabit() {
            this.newHabit({
                name: this.name,
                frequency: this.frequency,
                start: format(this.start, "yyyy-MM-dd"),
                endAfter: this.endAfter
            })
            this.gotoList()
        }
    },
    filters: {
        date(date) {
            return format(date, "yyyy-MM-dd")
        }
    }
}
</script>

<style lang="stylus">
#new
    display flex
    flex-direction column
    height 100%

    .row
        margin 1em 0

        &:first-child
            margin-top 0

        &:last-child
            margin-bottom 0

    label
        display inline-block
        margin-bottom 0.5em
        font-weight 500

    input[type=text], input[type=date], input[type=number]
        box-sizing border-box
        padding 0.5em 0.25em
        width 100%
        outline none
        border none
        border-bottom 1px solid lightgrey
        border-radius 0.25em
        font-size 16px
        font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif

    .tabs
        display flex
        justify-content space-between

        span
            color lightgrey
            font-weight bold
            cursor pointer

            &.active
                color black

    .options
        display flex
        justify-content space-between
        margin 0.5em 0

        span
            display flex
            justify-content center
            align-items center
            box-sizing border-box
            padding 0.5em 1em
            width 2.5em
            height 2.5em
            border 0.1em solid lightgrey
            border-radius 2em
            color lightgrey
            font-weight bold
            cursor pointer

            &.active
                border-color black
                color black

    .info
        margin-top 0.5em
        text-align right
        font-style italic
        font-size 0.75em

    #endOccurance
        display flex
        align-items center

        input
            margin-right 0.5em

    #controls
        display flex
        flex 1
        justify-content space-around
        align-items flex-end

        input
            flex 1
            box-sizing border-box
            padding 0.5em 1em
            max-width 45%
            border none
            background none
            color white
            font-weight bold
            font-size 1em

            &[type=submit]
                background-color black

            &[disabled=disabled]
                background-color lightgrey

            &[type=button]
                background-color black
</style>