import { getURL } from "./UserSideAuth";

const backendURL = getURL();

// you have 6 typs of requsts with 6 featurs => so we have 6 fun. for every feature
//  its better to have a token from backend side to add authentication but i will add my own one
// which is so weak but to only handle this by some way
export async function getAllQuotes() {
  const response = await fetch(`${backendURL}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function getSingleQuote(quoteId) {
  const response = await fetch(`${backendURL}/quotes/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }

  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
}

export async function addQuote(quoteData) {
  const response = await fetch(`${backendURL}/quotes.json`, {
    method: "POST",
    body: JSON.stringify({ ...quoteData, likes: "0", dislikes: "0" }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create quote.");
  }

  return null;
}

export async function getAllComments(quoteId) {
  const response = await fetch(`${backendURL}/${quoteId}/comments.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}

export async function addComment(commentData) {
  const response = await fetch(
    `${backendURL}/${commentData.quoteId}/comments.json`,
    {
      method: "POST",
      body: JSON.stringify({ commentData }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }

  return null;
}

export const deletecomment = async (CommentId, quoteId) => {
  //-NTj9iIElbOnskZgFhSA/comments/-NTjMfVH6G3vCg9FuP4c
  fetch(`${backendURL}/${quoteId}/comments/${CommentId}.json`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        console.log("notOk");
      } else {
        console.log("ok");
        getAllComments(quoteId);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
//backendURL + `comments` + commentId + `.json`
