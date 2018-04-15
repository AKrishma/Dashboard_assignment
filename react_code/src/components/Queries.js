import gql from 'graphql-tag';

// Fetch Board list  
export const FETCH_ALL_BOARDS = gql `query boardQuery {
    boards { boardName }
}`;
// Delete Board
export const DELETE_BOARD = gql `
    mutation deleteBoard($bname: String!) {
        deleteBoard(boardName: $bname) {
            id,
            boardName
        }
    }`;
// Add Board
export const ADD_BOARD = gql `
    mutation MutationAddBoard($boardName: String) {
    MutationAddBoard(boardName: $boardName) {
        id,
        boardName
    }
}`; 