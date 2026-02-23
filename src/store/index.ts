//@ts-expect-error is wel gedefineerd
export const desk = window.ZOHODESK;
import { defineStore } from "pinia";
import eventemitter2 from "eventemitter2";

export const events = new eventemitter2({
    maxListeners: 100,
    wildcard: true,
    delimiter: ":",
});
import start from "../events";

start(events);

export const useStore = defineStore("main", {
    state: () => ({
        loading: true,
        currentRecord: {} as Partial<Accounts>,
    }),
    actions: {},
});

export let store!: ReturnType<typeof useStore>;

desk.extension.onload().then(async (App: any) => {
    store = useStore();
    console.log(App);
    await events.emitAsync("load");
    await events.emitAsync("loaded");
});
