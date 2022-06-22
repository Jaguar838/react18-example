import "./scss/app.scss";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import NotFound from "./pages/NotFound";
// import FullPizza from "./pages/FullPizza";
import MainLayout from "./layout/MainLayout";
import {lazy, Suspense} from "react";

const Cart = lazy(() => import('./pages/Cart' /* webpackChunkName: "Cart" */))
const FullPizza = lazy(() => import('./pages/FullPizza' /* webpackChunkName: "FullPizza" */))
const NotFound = lazy(() => import('./pages/NotFound' /* webpackChunkName: "NotFound" */))

function App() {

    return (

        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="" element={<Home/>}/>
                <Route path="cart" element={
                    <Suspense fallback={<div><p>Loading... Cart</p></div>}>
                        <Cart/>
                    </Suspense>
                }/>

                <Route path="pizza/:id"
                       element={
                           <Suspense fallback={<div><p>Loading... Pizza</p></div>}>
                               <FullPizza/>
                           </Suspense>
                       }/>

                < Route path="*" element={
                    <Suspense>
                        <NotFound/>
                    </Suspense>}
                />
            </Route>
        </Routes>

    )
        ;
}

export default App;
