export const api_call = (data) => {
    return new Promise((resolve, reject) => (resolve({result: true, data})));
};

export const eventData = {preventDefault: jest.fn, target: {name:"1", checked:true, value: "1"}};

export const cats = [{name: "Default", pk: "1"}];

export const words = [{name: "ありがとう",
                       translation: "Thank you",
                       pronunciation: "Arigato",
                       category_set: [{name: "Default", pk: "1"}],
                       pk: "1"}];

export const langs = [{name: "English", slug: "en"}, {name: "Japanese", slug: "ja"}];

export const classProps = {
                            auth: {token: "xxx", isAuthenticated: true, user: {username: "test user",
                                                                               email: "test@mail.com",
                                                                               language_set: langs,
                                                                               first_name: "user",
                                                                               current_language: "Japanese",         }},
                          };

export const play = {answer: {name: "ありがとう",
                       translation: "Thank you",
                       pronunciation: "Arigato",
                       category_set: [{name: "Default", pk: "1"}],
                       pk: "1"},
                    words: [{name: "ありがとう",
                       translation: "Thank you",
                       pronunciation: "Arigato",
                       category_set: [{name: "Default", pk: "1"}],
                       pk: "1"}]
                    };