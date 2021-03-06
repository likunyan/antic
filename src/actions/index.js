import { createAction } from "@reduxjs/toolkit";

// lab
export const snackMessage = createAction("SNACK_MESSAGE");
export const snackToggleAction = createAction("SNACK_TOGGLE");
export const loginAction = (user) => ({
  type: "LOGIN",
  payload: {
    token: user.access_token,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    expiresIn: user.expires_in,
  },
});
// post
export const postSave = createAction("POST_SAVE");
export const postModify = createAction("POST_MODIFY");
export const changeUser = createAction("CHANGE_USER");
export const tagsDelete = createAction("TAGS_DELETE");
export const tagsAdd = createAction("TAGS_ADD");
export const tags = createAction("TAGS");
export const postCategory = createAction("POST_CATEGORY");
export const postContentSave = createAction("POST_CONTENT_SAVE");
export const postTitle = createAction("POST_TITLE");

// emoji
export const whichPage = createAction("WHICH_PAGE");
export const selectCategory = createAction("SELECT_CATEGORY");
export const selectTag = createAction("SELECT_TAG");
export const expandTag = createAction("EXPAND_TAG");
export const expandCategory = createAction("EXPAND_CATEGORY");
export const logoutAction = createAction("LOGOUT");
export const toggleTheme = createAction("TOGGLE_THEME");
export const toggleDrawer = createAction("TOGGLE_DRAWER");
export const search = createAction("SEARCH");
export const loading = createAction("LOADING");

// chat
export const message = createAction("MESSAGE");
export const chatBoard = createAction("CHAT_BOARD");
export const addPeople = createAction("ADD_PEOPLE");
export const addPeoples = createAction("ADD_PEOPLES");
export const deletePeople = createAction("DELETE_PEOPLE");
