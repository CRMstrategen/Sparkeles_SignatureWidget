import EventEmitter2 from "eventemitter2";
import startLoad from "./load";

export default function start(events: EventEmitter2) {
    startLoad(events);

    let eventLogsEnabled = import.meta.env.MODE == "development";

    //@ts-expect-error
    window.toggleEventLogs = () => {
        eventLogsEnabled = !eventLogsEnabled;
    };

    events.onAny((event, ...values) => {
        if (eventLogsEnabled) console.log(event, values);
    });
}
