import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Board extends React.Component {
    constructor(props){
        //props
        super(props);
        // states, styles, event bind, 
        this.createBoard = this.createBoard.bind(this);
    }
    createBoard = (e) => {
        <CreateBoard />
    }

    render() {
       
        if(this.props.boardQuery && this.props.boardQuery.loading) {
            return <div>{"loading...!"}</div>
        }
        if(this.props.boardQuery && this.props.boardQuery.error) {
            return <div>{`Error: ${this.props.boardQuery.error}`}</div>
        }
        let boards = this.props.boardQuery.boards;
        return (
            <div class="displayBoard">
            <h2> Boards </h2>
            <ul class = "board">
            {
                (boards.length > 0)?
                boards.map((b) => {
                    return (
                        <li key={b.id}>
                          <a href="/list">{b.boardName}</a>
                        </li>
                    )
                }): " Loading.. !"
            }
            <li>
            <a href="#" class="createBoard" onclick={this.createBoard}>Create New Board</a>
            </li>
            </ul>
            </div>
        );
    }
}

const FETCH_ALL_BOARDS = gql `query boardQuery {
    boards { boardName }
}`;

export default graphql(FETCH_ALL_BOARDS, { name: 'boardQuery'})(Board);