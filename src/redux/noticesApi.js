import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_SITE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const noticesApi = createApi({
  reducerPath: "noticesApi",
  baseQuery,
  tagTypes: ["Notices"],

  endpoints: builder => ({
    getNotices: builder.query({
      query: ({ page, perPage, category, filter }) => {
        const categoryQuery = !!category ? `category=${category}` : "";
        const pageQuery = page === 1 ? "" : `&&page=${page}`;
        const perPageQuery = !!perPage !== 15 ? "" : `&&per_page=${perPage}`;
        const filterQuery = filter === "" ? "" : `&&filter=${filter}`;

        if (category === "favorite") {
          return `/user/favorite?${pageQuery + perPageQuery + filterQuery}`;
        }

        if (category === "my_adds") {
          return `/user/notice?${pageQuery + perPageQuery + filterQuery}`;
        }
        return `/notices?${categoryQuery + pageQuery + perPageQuery + filterQuery}`;
      },
      providesTags: ["Notices"],
    }),

    getNoticesById: builder.query({
      query: noticeId => ({
        url: `/notices/${noticeId}`,
        method: "GET",
      }),
      providesTags: ["Notices"],
    }),

    deleteNotice: builder.mutation({
      query: noticeId => ({
        url: `/notices/${noticeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notices"],
    }),

    noticesByCategory: builder.query({
      query: category => ({
        url: `/notices?category=${category}`,
        method: "GET",
      }),
      providesTags: ["Notices"],
    }),

    addNotice: builder.mutation({
      query: ({ formdata, noticeCategory }) => {
        const newFormdata = new FormData();
        Object.keys(formdata).forEach(key => newFormdata.append(key, formdata[key]));
        if (formdata.avatar) {
          newFormdata.set("avatar", formdata.avatar[0]);
        }
        return { url: `/notices?category=${noticeCategory}`, method: "POST", body: newFormdata };
      },
      invalidatesTags: ["Notices"],
    }),
  }),
});

export const { useGetNoticesByIdQuery, useAddNoticeMutation, useGetNoticesQuery, useDeleteNoticeMutation } = noticesApi;
