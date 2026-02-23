import EventEmitter2 from "eventemitter2";
import { store, desk } from "../store";

export default function (events: EventEmitter2) {
    events.on("load", async () => {
        store.currentRecord = await desk.get("ticket");
        console.log("loaded");
        store.loading = false;
    });
}
