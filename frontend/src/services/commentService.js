import sendRequest from "./sendRequest";

const BASE_URL = "/api/hoots";

export async function create(hootId, commentData) {
  return sendRequest(`${BASE_URL}/${hootId}/comments`, "POST", commentData);
}
export async function updateComment(hootId, commentId, commentData) {
  return sendRequest(
    `${BASE_URL}/${hootId}/comments/${commentId}`,
    "PUT",
    commentData
  );
}
export async function deleteComment(hootId, commentId) {
  return sendRequest(`${BASE_URL}/${hootId}/comments/${commentId}`, "DELETE");
}
