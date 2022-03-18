import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../store/articles/actions";
import { selectArticles, selectArticlesLoading, selectError } from "../../store/articles/selector";
import { apiUrl } from "../utils/constans";



export const Articles = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const isLoading = useSelector(selectArticlesLoading);
    const articles = useSelector(selectArticles);

    const getData = async () => {
        dispatch(getArticles());
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h3>Articles</h3>
            <button onClick={getData}>Обновлялка</button>
            {error && <h5>ERRROR</h5>}
            {isLoading ? (
                <CircularProgress />
            ) : (
                <ul>
                    {articles.map((art) => (
                        <li key={art.id}>{art.title}</li>
                    ))}
                </ul>
            )}
        </>
    );
};