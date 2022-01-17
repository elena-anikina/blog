import React, { useEffect, useState } from 'react';
import classes from './list.module.scss';
import Article from '../article/article';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Pagination from '../pagination/pagination';

const List = ({
  fetchArticles,
  articles: data,
  calcPagination,
  user,
  checkingAuthentication,
  pagination: { trimStart, trimEnd, ...details },
}) => {
  useEffect(() => {}, [user]);

  const articles = data.map((article) => <Article key={article.slug} {...article} preview />);
  const articles5 = articles.slice(trimStart, trimEnd);
  const pagination = data.length > 5 ? <Pagination data={data} func={calcPagination} details={details} /> : null;

  return (
    <section className={classes.articlesAll}>
      {articles5}
      {pagination}
    </section>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, actions)(List);
