import Vue from "vue"
import Vuex from "vuex"
import { format, isToday, differenceInMilliseconds, endOfToday } from "date-fns"
import { getHabits, getEvents, getLastActive, clearAll, getWeekday, updateLastActive, updateStorage, createEvents } from "./helpers"

Vue.use(Vuex)

const VIEWS = { list: "List", new: "New", detail: "Detail" }

export default new Vuex.Store({
    state: {
        activeView: VIEWS.list,
        habits: [],
        events: [],
        lastActive: null,
        activeHabit: null
    },
    mutations: {
        init(state) {
            let habits = getHabits(), events = getEvents(), lastActive = getLastActive()

            if (lastActive) {
                if (!isToday(lastActive) || !events) createEvents(state, habits)

                state.habits = habits
                state.events = events
                updateLastActive(state)
                setTimeout(() => createEvents(state), differenceInMilliseconds(endOfToday(), Date.now()))
            }
        },
        newHabit(state, habit) {
            let weekDay = getWeekday()

            state.habits = [...state.habits, { ...habit, finished: [] }]

            if (habit.frequency.some(f => f >= weekDay))
                state.events = [...state.events, { name: habit.name, done: false, isToday: habit.frequency.indexOf(weekDay) >= 0 }]

            updateStorage(state)
        },
        toggleEvent(state, name) {
            let today = format(Date.now(), "yyyy-MM-dd")

            state.habits = state.habits.map(h => {
                if (h.name === name) h.finished = h.finished.indexOf(today) >= 0 ? h.finished.filter(f => f != today) : [...h.finished, today]
                return h
            })

            state.events = state.events.map(e => {
                if (e.name === name) e.done = !e.done
                return e
            })

            updateStorage(state)
        },
        deleteHabit(state, name) {
            state.habits = state.habits.filter(h => h.name !== name)
            state.events = state.events.filter(e => e.name !== name)

            updateStorage(state)
        },
        clear: state => {
            state.habits = state.events = []
            state.activeView = VIEWS.list
            clearAll()
        },
        gotoList: state => state.activeView = VIEWS.list,
        gotoNew: state => state.activeView = VIEWS.new,
        gotoDetail: (state, name) => {
            state.activeHabit = state.habits.find(h => h.name === name)
            state.activeView = VIEWS.detail
        }
    },
    getters: {
        events: state => state.events,
        dayEvents: state => state.events.filter(e => e.isToday),//.sort((a, b) => a.done ? (b.done ? 0 : 1) : (b.done ? -1 : 0)),
        weekEvents: state => state.events.filter(e => !e.isToday),//.sort((a, b) => a.done ? (b.done ? 0 : 1) : (b.done ? -1 : 0))
        streaks: state => 0,
        breaks: state => 0
    }
})
