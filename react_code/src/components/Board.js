import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from "material-ui/TextField";
import RaisedButton from  "material-ui/RaisedButton";
import { createApolloFetch } from 'apollo-fetch';


class Board extends React.Component {
    constructor(props){
        //props
        super(props);
        // states, styles, event bind, 
        this.state = {
            isHidden: false
        }
      
    }
    createBoard = (e) => {
        this.setState({
            isHidden: !this.state.isHidden
        })
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
                          <a href="/list/">{b.boardName}</a>
                        </li>
                    )
                }): " Loading.. !"
            }
            <li>
            <a href="#" className="createBoard" onClick={this.createBoard.bind(this)}>Create New Board</a>
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

const fetch = createApolloFetch({
    uri: 'http://localhost:4000/',
  });
  
  fetch({
    query: '{ board { boardName }}',
  }).then(res => {
    console.log('FETCH: '+res.data);
  });    

class AddBoardForm extends React.Component {
    
    handleSubmit = (e) => { 
            let brdName = document.getElementById('boardName').value
            console.log(brdName);
            /* this.props.mutate({
                mutation: addBoardMutation,
                variables:  { boardName: brdName}
            })
            .then(res => {
                brdName = ""
            }); */
        }
    
    render() {
        return (
            <div className= "addBoardForm">
                <form method="post" action="" >
                    Enter Board name: <br />
                    <TextField type="text" id="boardName"  hintText="Text" /> <br />
                    <RaisedButton label="Submit"  primary={true} onClick={this.handleSubmit.bind(this)} />
                </form>
            </div>
        )
    }
}

const addBoardMutation = gql `
    mutation MutationAddBoard($boardName: String!) {
        MutationAddBoard(boardName: $boardName) {
            id,
            boardName
        }
    }`;
    