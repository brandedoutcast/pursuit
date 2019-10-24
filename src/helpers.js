import { getDay, format } from "date-fns";

export const STORAGE = { habitsKey: "pursuit-habits", eventsKey: "pursuit-events", lastActiveKey: "pursuit-last-active" }

export const clearAll = () => localStorage.clear()
export const getData = key => localStorage.getItem(key)
export const setData = (key, value) => localStorage.setItem(key, value)

export const getHabits = () => JSON.parse(getData(STORAGE.habitsKey))
export const getEvents = () => JSON.parse(getData(STORAGE.eventsKey))
export const getLastActive = () => JSON.parse(getData(STORAGE.lastActiveKey))

export const getWeekday = () => getDay(Date.now())

export function createEvents(state, habits) {
    habits = habits || state.habits
    let weekDay = getWeekday(), today = format(Date.now(), "yyyy-MM-dd"),
        events = habits.filter(h => h.frequency.some(f => f >= weekDay))
            .map(h => ({
                name: h.name,
                done: h.finished.indexOf(today) >= 0,
                isToday: h.frequency.indexOf(weekDay) >= 0
            }))
    state.events = events
    setData(STORAGE.eventsKey, JSON.stringify(events))
}

export function updateLastActive(state) {
    state.lastActive = Date.now()
    setData(STORAGE.lastActiveKey, state.lastActive)
}

export function updateStorage(state) {
    setData(STORAGE.habitsKey, JSON.stringify(state.habits))
    setData(STORAGE.eventsKey, JSON.stringify(state.events))
    updateLastActive(state)
}