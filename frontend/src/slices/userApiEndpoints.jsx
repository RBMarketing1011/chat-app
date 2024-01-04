import { apiSlice } from './apiSlice'

export const userApiEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/users/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: data,
      }),
    }),
    getProfileFromJWT: builder.mutation({
      query: () => ({
        url: '/users/profile',
        method: 'POST'
      })
    })
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileFromJWTMutation
} = userApiEndpoints