import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class List extends React.Component {
    constructor(props){
        //props
        super(props);
        // states, styles, event bind, 
    }

    render() {
       
        if(this.props.listQuery && this.props.listQuery.loading) {
            return <div>{"loading...!"}</div>
        }
        if(this.props.listQuery && this.props.listQuery.error) {
            return <div>{`Error: ${this.props.listQuery.error}`}</div>
        }
        let lists = this.props.listQuery.lists;
        return (
            <div class="displayList"><ul class="list">
            {
                (lists.length > 0)?
                lists.map((l) => {
                    return (
                        <li key={l.list} boardId= {l.boardId} className = "listIem">
                            {l.listName}
                        </li>
                    )
                }): " Loading.. !"
            }
            <li>
                <a href="#"> Add a task </a>
            </li>
            </ul>
            </div>
        );  
    }
}

const FETCH_ALL_LISTS = gql `query listQuery {
    lists { listName, boardId }
}`;

export default graphql(FETCH_ALL_LISTS, { name: 'listQuery'})(List);