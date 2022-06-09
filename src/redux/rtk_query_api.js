// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
//
// export const api = createApi({
//     reducerPath: 'api',
//     tagTypes: ['Pizzas'],
//     baseQuery: fetchBaseQuery({baseUrl: 'https://626d16545267c14d5677d9c2.mockapi.io/'}),
//     endpoints: (build) => ({
//         getPizzas: build.query(
//             {
//                 query: (limit = '') => `goods?${limit && `_limit=${limit}`}`,
//                 providesTags: (result) => result
//                     ? [
//                         ...result.map(({id}) => ({type: 'Products', id})),
//                         {type: 'Products', id: 'LIST'},
//                     ]
//                     : [{type: 'Products', id: 'LIST'}],
//             }),
//     }),
// })
// export const {useGetPizzasQuery} = api
// no Side Effect
//Парадигма чистых функций Functional Componenta
// 1. API calls /не должна делать запросы на сервер
// 2. modification of parameters / нельзя модифицировать входящие параметры
// 3. change DOM directly / лезть напрямую DOM  в и изменять єл-ты
// 4. change outer scope variables / изменять внешние переменные