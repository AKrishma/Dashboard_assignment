import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import TextField from "material-ui/TextField";
import RaisedButton from  "material-ui/RaisedButton";
import { createApolloFetch } from 'apollo-fetch';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isHidden: false
        }
    }
    createBoard = (e) => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    deleteBoard = (e) => {
        alert('delete board');
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
            <div className = "displayBoard">
            <h2> Boards </h2>
            <ul className = "board">
            {
                (boards.length > 0)?
                boards.map((b) => {
                    return (
                        <li>
                          <a href="/list">{b.boardName}</a>
                          <span className="deleteBoard" onClick={(e) => {this.deleteBoard.bind(this)}}> x </span>
                        </li>
                    )
                }): " Loading.. !"
            }
            <li className="createBoard">
            <a href="#"  onClick={this.createBoard.bind(this)}>Create New Board</a>
            </li>
            </ul>
            {this.state.isHidden && <AddBoardForm />}
            
            </div>   
        );
    }
}

const FETCH_ALL_BOARDS = gql `query boardQuery {
    boards { boardName }
}`;

export default graphql(FETCH_ALL_BOARDS, { name: 'boardQuery'})(Board);

  const addBoardMutation = gql `
  mutation MutationAddBoard($boardName: String!) {
      MutationAddBoard(boardName: $boardName) {
          id,
          boardName
      }
  }`;
  
class AddBoardForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            boardName: '',
            hidden: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleSubmit = (e) => { 
        e.preventDefault();
            alert(this.state.boardName + 'Board has been added');
            /* this.props.mutate({
                mutation: addBoardMutation,
                variables:  { boardName: this.state.boardName}
            })
            .then(data => {
                console.log('Data: '+data);
            }) */
            this.state.hidden = false;
            this.isHidden = true;
        }
    
    render() {
        return (
            <div className= "addBoardForm">
                <form method="post" action="" >
                    Enter Board name: <br />
                    <TextField type="text" id="boardName"  hintText="Text" onChange= {(e) => { this.setState({boardName: e.target.value}) }} /> <br />
                    <RaisedButton label="Submit"  primary={true} onClick={(e) =>{ this.handleSubmit(e) }} />
                </form>
            </div>
        )
    }
}


    