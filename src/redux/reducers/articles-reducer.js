import { stateArticles } from '../state';
import handleLikes from '../../helpers/handleLikes';

export const articlesReducer = (state = stateArticles, action) => {
  const { articles, errors, articlesCount, pagination } = state;

  switch (action.type) {
    case 'FETCH_ARTICLES_SUCCESS': {
      return {
        ...state,
        articles: action.articles,
        articlesCount: action.articlesCount,
      };
    }

    case 'FETCH_ARTICLES_ERROR':
      return {
        ...state,
        errors: errors + 1,
      };

    case 'CALC_PAGINATION':
      return {
        ...state,
        pagination: {
          ...pagination,
          page: Number(action.page),
        },
      };

    case 'GET_ARTICLE_SUCCESS':
      return {
        ...state,
        article: action.article,
      };

    case 'GET_ARTICLE_ERROR':
      return {
        ...state,
        article: null,
        errorMessages: action.err,
      };

    case 'EDIT_ARTICLE_SUCCESS':
      return {
        ...state,
        article: action.article,
        errorMessages: null,
      };

    case 'EDIT_ARTICLE_ERROR':
      return {
        ...state,
        errorMessages: action.error,
      };

    case 'HANDLE_LIKE_SUCCESS':
      return {
        ...state,
        articles: handleLikes([...articles], action.article),
      };

    case 'HANDLE_LIKE_ERROR':
      return {
        ...state,
      };

    case 'PAGINATION_ARROW_RIGHT': {
      const { trimStart, trimEnd, page } = pagination;
      const numberOfPages = Math.ceil(articlesCount / 5);
      const calcPageNumber = (num) => (page + num <= numberOfPages ? page + num : calcPageNumber(num - 1));
      return {
        ...state,
        pagination: {
          ...pagination,
          page: calcPageNumber(5),
          trimStart: trimStart + 5,
          trimEnd: trimEnd + 5,
          arrowStart: !(Number(page) === 1),
          arrowEnd: page < numberOfPages,
        },
      };
    }

    case 'PAGINATION_ARROW_LEFT': {
      const { trimStart, trimEnd, page } = pagination;
      return {
        ...state,
        pagination: {
          ...pagination,
          page: page - 5,
          trimStart: trimStart - 5,
          trimEnd: trimEnd - 5,
        },
      };
    }

    default:
      return state;
  }
};