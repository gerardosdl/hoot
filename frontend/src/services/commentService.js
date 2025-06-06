import sendRequest from "./sendRequest";

const BASE_URL = "/api/hoots";

export async function createComment(hootId, commentData) {
  return sendRequest(`${BASE_URL}/${hootId}/comments`, "POST", commentData);
}
export async function updateComment(hootId, commentId, updatedComment) {
  return sendRequest(
    `${BASE_URL}/${hootId}/comments/${commentId}`,
    "PUT",
    updatedComment
  );
}
export async function deleteComment(hootId, commentId) {
  return sendRequest(`${BASE_URL}/${hootId}/comments/${commentId}`, "DELETE");
}
