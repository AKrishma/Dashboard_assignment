import React from 'react';
import { graphql, Mutation, Query } from 'react-apollo';
import TextField from "material-ui/TextField";
import RaisedButton from  "material-ui/RaisedButton";
import {ADD_BOARD, FETCH_ALL_BOARDS } from './Queries';

const updateCache = (cache, {data: { MutationAddBoard } }) =>  {
   // console.log(data, cache);
    const { boards } = cache.readQuery({ query: FETCH_ALL_BOARDS })
    cache.writeQuery({
        query: FETCH_ALL_BOARDS,
        data: {
            boards: boards.concat(MutationAddBoard)
        }
    })
}

export default () => (
    <Mutation mutation={ADD_BOARD} update = {updateCache}>
        {(MutationAddBoard, {data}) => (
            
            <form method="post" action=""  onSubmit={(e) => {
                e.preventDefault();
                MutationAddBoard({ variables: { type: TextField.value } });
                TextField.value = ""; }}>
                Enter Board name: <br />
                <TextField type="text" id="boardName"  hintText="Text"   /> <br />
                <RaisedButton label="Submit"  primary={true}  />
            </form>
            
        )}
    </Mutation>
)