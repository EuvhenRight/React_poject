import { getArticles, getArticlesFailure, getArticlesRequest, getArticlesSuccess, GET_ARTICLES_SUCCESS } from "../actions";

describe("getArticlessSucces test", () => {
    it("returns object with type and payload", () => {
        const payload = [];
        const expected = {
            type: GET_ARTICLES_SUCCESS,
            payload,
        };
        const received = getArticlesSuccess(payload);
        expect(expected).toEqual(received);
    });
});

describe("getArticles", () => {
    if ("getArticltsReq", () => {
        const mockDispatch = jest.fn();

        getArticles()(mockDispatch);

        expectq(mockDispatch).toHaveBeenCalledWith(getArticlesRequest());
    });

    it("calls fn with getArticlesSucces fetch saccessful", async () => {
        const mockDispatch = jest.fn();
        const result = ["test"];
        fetchMock.mockResponseOnce(JSON.stringify(result));

        await getArticles()(mockDispatch);

        expect(mockDispatch).toHaveBeenLastCalledWith(getArticlesSuccess(result));

    });
    it("calls fn with getArticlesFail fetch usaccessful", async () => {
        const mockDispatch = jest.fn();
        const error = Error("Fetch Error");

        fetchMock.mockRejectOnce(error);

        await getArticles()(mockDispatch);

        expect(mockDispatch).toHaveBeenLastCalledWith(getArticlesFailure(error));
    });
});