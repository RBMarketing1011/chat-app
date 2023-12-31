import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5173/api',
  credentials: 'include'
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [ 'Users', 'Messages', 'Groups' ],
  endpoints: (builder) => ({}),
})