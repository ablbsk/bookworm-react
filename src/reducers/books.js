import { createSelector } from "reselect";
import {
  FETCH_TOP_REQUEST,
  FETCH_TOP_SUCCESS,
  FETCH_TOP_FAILURE,

  FETCH_BOOK_DATA_REQUEST,
  FETCH_BOOK_DATA_SUCCESS,
  FETCH_BOOK_DATA_FAILURE,

  FETCH_USER_BOOKS_REQUEST,
  FETCH_USER_BOOKS_SUCCESS,
  FETCH_USER_BOOKS_FAILURE,

  SEARCH_BOOKS_BY_PAGE_REQUEST,
  SEARCH_BOOKS_BY_PAGE_SUCCESS,
  SEARCH_BOOKS_BY_PAGE_FAILURE,

  BOOK_CREATED,
  BOOK_DELETE,
  ADD_LIKE,
  UPDATE_PROGRESS,
  BOOK_DELETE_IN_LIST,
  DELETE_LIKE,
  ADD_LIKE_IN_LIST,
  DELETE_LIKE_IN_LIST,
  UPDATE_PROGRESS_IN_LIST
} from "../types";

const initialState = {
  loading: false,
  error: null,
  data: {}
};

export default function books(state = initialState, action = {}) {
  switch (action.type) {
    case BOOK_CREATED:
      return { ...state, data: { ...action.data } };

    case ADD_LIKE:
    case DELETE_LIKE:
      return {
        ...state,
        data: action.data,
        loading: true,
        error: null
      };
    case BOOK_DELETE:
      return { ...state, data: { ...action.data } };
    case UPDATE_PROGRESS:
      return {
        ...state,
        data: { ...state.data, readPages: action.data.readPages }
      };

    case ADD_LIKE_IN_LIST:
    case DELETE_LIKE_IN_LIST:
      return {
        ...state,
        data: state.data.map(item =>
          item.goodreadsId === action.data.goodreadsId
            ? { ...item, likeStatus: action.data.likeStatus }
            : item
        ),
        loading: true,
        error: null
      };
    case BOOK_DELETE_IN_LIST:
      const i = state.data.findIndex(item => item.goodreadsId === action.id);
      return {
        ...state,
        data: { ...state.data.slice(0, i), ...state.data.slice(i + 1) },
        loading: true,
        error: null
      };
    case UPDATE_PROGRESS_IN_LIST:
      return {
        ...state,
        data: state.data.map(item =>
          item.goodreadsId === action.data.goodreadsId
            ? { ...item, readPages: action.data.readPages }
            : item
        )
      };

    /* ----------- REQUEST ---------- */
    case FETCH_TOP_REQUEST:
    case FETCH_BOOK_DATA_REQUEST:
    case FETCH_USER_BOOKS_REQUEST:
    case SEARCH_BOOKS_BY_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    /* ----------- SUCCESS ---------- */
    case FETCH_TOP_SUCCESS:
    case FETCH_BOOK_DATA_SUCCESS:
    case FETCH_USER_BOOKS_SUCCESS:
    case SEARCH_BOOKS_BY_PAGE_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: null
      };

    /* ----------- FAILURE ---------- */
    case FETCH_TOP_FAILURE:
    case FETCH_BOOK_DATA_FAILURE:
    case FETCH_USER_BOOKS_FAILURE:
    case SEARCH_BOOKS_BY_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error.response.data.error
      };

    default:
      return state;
  }
}

// SELECTORS

export const booksSelector = state => state.books.data;


export const allBooksSelector = createSelector(
  booksSelector,
  booksHash => Object.values(booksHash)
);
