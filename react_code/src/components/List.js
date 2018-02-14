import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class List extends React.Component {
     render() {
       
        if(this.props.listQuery && this.props.listQuery.loading) {
            return <div>{"loading...!"}</div>
        }
        if(this.props.listQuery && this.props.listQuery.error) {
            return <div>{`Error: ${this.props.listQuery.error}`}</div>
        }
        let lists = this.props.listQuery.lists;
        return (
            <div class="displayList">
            <h2> Lists</h2>
            <p> Click on list name to view tasks it contains </p>
            <ul class="list">
            {
                (lists.length > 0)?
                lists.map((l) => {
                    return (
                        <li boardId= {l.boardId} className = "listIem">
                            <a href="/task">{l.listName}</a>
                        </li>
                    )
                }): " Loading.. !"
            }
            </ul>
            <p><a href="#"> Add new list </a></p>
            </div>
        );  
    }
}

const FETCH_ALL_LISTS = gql `query listQuery {
    lists { listName, boardId }
}`;

export default graphql(FETCH_ALL_LISTS, { name: 'listQuery'})(List);