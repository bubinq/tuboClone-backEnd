import { createContext, useReducer } from "react";

export const CommentContext = createContext();

const commentsManager = (state, action) => {
  switch (action.type) {
    case "READ":
      return [...action.payload];
    case "ADD_COMMENT":
      return [...state, {...action.payload}];

    default:
      return;
  }
};

export const CommentProvider = ({ children }) => {
  const [comments, dispatch] = useReducer(commentsManager, []);

  return (
    <CommentContext.Provider
      value={{
        comments,
        dispatch,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
