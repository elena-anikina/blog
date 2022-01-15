import React, {useEffect} from "react";
import classes from '../form/form.module.scss';
import ArticleForm from "../article/article-form";
import {useLocation, useParams} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from '../../redux/actions';
import RealworldApi from "../../services/realworld-api";
const realWorldApi = new RealworldApi();

const ArticleEdit = ({getArticleForEditing, article, editArticle, tagsNew, addTag}) => {
    const {slug} = useParams();
    console.log(slug);

    // useEffect(() => {
    //     getArticleForEditing(slug).then(response => {
    //         console.log('внутри функции getArticle');
    //         console.log(response);
    //     })
    // }, [])





    return <ArticleForm
                        title="Edit article"
                        type={article ? 'edit' : 'new'}
                    //    articleData={article}
                        func={(data) => {
                        console.log(data);
                        editArticle(slug, data);
                        }
                        } />
};

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps, actions)(ArticleEdit);