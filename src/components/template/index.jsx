import { Outlet } from "react-router";
import { Header } from "./header";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";
// import { Footer } from "~/components/template/footer";
// import { Header } from "~/components/template/header";
// import { Sidebar } from "~/components/template/sidebar";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Template() {
  return (
    <Provider store={store}>
      <div
        className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col w-full"
        style={{ direction: "rtl" }}
      >
        <Header />

        <div className="flex flex-row-reverse flex-grow w-full">
          <main className="flex-grow py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
          <Sidebar className="w-64 flex-shrink-0" />
        </div>

        <Footer />
      </div>
    </Provider>
  );
}
