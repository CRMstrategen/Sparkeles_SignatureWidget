//@ts-expect-error is wel gedefineerd
export const desk = window.ZOHODESK;
declare const App: any;
import { defineStore } from "pinia";
import eventemitter2 from "eventemitter2";
import { buildSignature } from "../utils/signatures";

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
    user: null as string | null,
    signature: "" as string,
  }),
  actions: {
    getCurrentUser() {
      return new Promise((resolve) => {
        desk.get("user").then(function (response: {
          user: { fullName: string };
        }) {
          resolve(response.user.fullName);
        });
      });
    },
    determineSignature(user: string) {
      return desk.get("ticket").then(function (response: {
        ticket: { departmentId: string; cf: { cf_webshop: any } };
      }) {
        const webshop = response.ticket.cf.cf_webshop;
        const departementId = response.ticket.departmentId;
        let signature =
          webshop || departementId != "139524000160586342"
            ? buildSignature(webshop, user)
            : "";
        return signature;
      });
    },
  },
});

export let store!: ReturnType<typeof useStore>;

desk.extension.onload().then(async (App: any) => {
  store = useStore();
  store.getCurrentUser().then((user) => {
    store.user = user as string;
  });
  // console.log(App);
  App.instance.on("ticket_replyEditor.opened", async function (data: any) {
    // console.log("ticket_replyEditor.opened", data);

    const signature =
      (await store.determineSignature(store.user as string)) || "";
    if (signature === "") return;
    desk.invoke("INSERT", "ticket.replyEditor", {
      value: signature,
      // type: "replace",
    });
  });
  await events.emitAsync("load");
  await events.emitAsync("loaded");
});
