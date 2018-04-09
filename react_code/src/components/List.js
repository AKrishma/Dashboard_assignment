import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from "material-ui/TextField";
import RaisedButton from  "material-ui/RaisedButton";
import Task from './Task';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            ishidden: false
        }
    }
    createList = (e) => {
        this.setState({
            ishidden: !this.state.ishidden
        })
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
            <div className="displayList">
            <h2> Lists</h2>
            <ul className="list">
            {
                (lists.length > 0)?
                lists.map((l) => {
                    return (
                        <li boardId= {l.boardId} className = "listIem">
                          {l.listName}
                            <Task />
                        </li>
                    )
                }): " Loading.. !"
            }
            </ul>
            <p><a href="#" onClick={this.createList.bind(this)}> Add new list </a></p>

            {this.state.ishidden && <AddListForm /> }
            </div>
        );  
    }
}

const FETCH_ALL_LISTS = gql `query listQuery {
    lists { listName, boardId }
}`;

export default graphql(FETCH_ALL_LISTS, { name: 'listQuery'})(List);


class AddListForm extends React.Component {
    
    handleSubmit = (e) => { 
            let listName = document.getElementById('listName').value,
                boardId = document.getElementById('boardId').value;
            console.log('NewList: '+listName);
            console.log('boardId: '+boardId);
        }
    
    render() {
        return (
            <div className= "addListForm">
                <form method="post" action="" >
                    <input type="hidden" id="boardId" value="" /> <br />
                    Enter List name: <br />
                    <TextField type="text" id="listName"  hintText="Text" /> <br />
                    <RaisedButton label="Submit"  primary={true} onClick={this.handleSubmit.bind(this)} />
                </form>
            </div>
        )
    }
}