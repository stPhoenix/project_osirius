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

export const classProps = {
                            auth: {token: "xxx", isAuthenticated: true},
                          };