import { apiSlice } from './apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //=======================User API Endpoints ===========================
    login: builder.mutation({
      query: (data) => ({
        url: '/users/register',
        method: 'POST',
        body: data,
      }),
    })
  })
})

export const {
  useLoginMutation
} = userApiSlice 