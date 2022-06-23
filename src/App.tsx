import "./scss/app.scss";
import {Route, Routes} from "react-router-dom";
import Loadable from "react-loadable";
import Home from "./pages/Home";

import MainLayout from "./layout/MainLayout";
import {lazy, Suspense} from "react";
import LoaderUI from "./components/LoaderUI";

const Cart = Loadable({
    loader: () => import("./pages/Cart" /* webpackChunkName: "Cart" */),
    loading: () => <LoaderUI/>,
});
const FullPizza = lazy(
    () => import("./pages/FullPizza" /* webpackChunkName: "FullPizza" */)
);
const NotFound = lazy(
    () => import("./pages/NotFound" /* webpackChunkName: "NotFound" */)
);

function App() {
    return (
        <Suspense fallback={<LoaderUI/>}>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="" element={<Home/>}/>
                    <Route
                        path="cart"
                        element={<Cart/>}
                    />
                    <Route
                        path="pizza/:id"
                        element={<FullPizza/>}
                    />
                    <Route
                        path="*"
                        element={<NotFound/>}
                    />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
