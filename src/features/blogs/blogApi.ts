import { BlogType } from "@/types/blog";
import { BaseResponse } from "@/types/common";
import { apiSlice } from "../api/apiSlice";

export interface MultipleBlogResponse extends BaseResponse {
  payload: BlogType[];
}

interface SingleBlogResponse extends BaseResponse {
  payload: BlogType;
}

interface DeleteBlogResponse extends BaseResponse {
  payload?: null;
}

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<MultipleBlogResponse, void>({
      query: () => `/blogs`,
    }),

    // get blog by id
    getBlog: builder.query<SingleBlogResponse, string>({
      query: (id) => `/blogs/${id}`,
    }),

    addBlog: builder.mutation<SingleBlogResponse, FormData>({
      query: (data) => ({
        url: `/blogs`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              blogApi.util.updateQueryData("getBlogs", undefined, (draft) => {
                draft?.payload?.push(result.data.payload);
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    updateBlog: builder.mutation<
      SingleBlogResponse,
      {
        id: string;
        data: FormData;
      }
    >({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              blogApi.util.updateQueryData("getBlogs", undefined, (draft) => {
                const blogIndex = draft?.payload?.findIndex(
                  (blog) => blog.id === id
                );

                if (blogIndex !== undefined && blogIndex !== -1) {
                  draft?.payload?.splice(blogIndex, 1, result.data.payload);
                }
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    deleteBlog: builder.mutation<DeleteBlogResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              blogApi.util.updateQueryData("getBlogs", undefined, (draft) => {
                const blogIndex = draft?.payload?.findIndex(
                  (blog) => blog.id === id
                );

                if (blogIndex !== undefined && blogIndex !== -1) {
                  draft?.payload?.splice(blogIndex, 1);
                }
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
