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