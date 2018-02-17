import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from "material-ui/TextField";
import RaisedButton from  "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ishidden: false
        }
    }
    createTask = (e) => {
        this.setState({
            ishidden: !this.state.ishidden
        })
    }
    render() {
       
        if(this.props.taskQuery && this.props.taskQuery.loading) {
            return <div>{"loading...!"}</div>
        }
        if(this.props.taskQuery && this.props.taskQuery.error) {
            return <div>{`Error: ${this.props.taskQuery.error}`}</div>
        }
        let tasks = this.props.taskQuery.tasks;
        return (
            <div class="displayTask">
            <h2> Tasks </h2>
            <ul class="tasks">
            {
                (tasks.length > 0) ?
                tasks.map((t) => {
                    return (
                        <li key={t.task} className = "taskItem" listId= {t.listId}>
                            {t.taskName}
                        </li>
                    )
                }): " Loading.. !"
            }
            </ul>
            <p><a href="#" onClick={this.createTask.bind(this)}> Add a task </a></p>
            {this.state.ishidden && <AddTaskForm /> }
            </div>
        );  
    }
}

const FETCH_ALL_TASKS = gql `query taskQuery {
    tasks { listId,
        taskName,
        taskDesc,
        taskStatus }
}`;

export default graphql(FETCH_ALL_TASKS, { name: 'taskQuery'})(Task);

class AddTaskForm extends React.Component {
    
    handleSubmit = (e) => { 
            let listName = document.getElementById('taskName').value,
                boardId = document.getElementById('boardId').value;
            console.log('NewList: '+listName);
            console.log('boardId: '+boardId);
        }
    
    render() {
        return (
            <div className= "addListForm">
                <form method="post" action="" >
                    <input type="hidden" id="listId"  value= "" /> <br />
                    Enter Task name: <br />
                    <TextField type="text" id="taskName"  hintText="Text" /> <br />
                    Enter Task Description: <br />
                    <TextField type="text" id="taskDesc"  hintText="Text" /> <br />
                    Select Task status: <br />
                    <SelectField
                        floatingLabelText="Frequency">
                        <MenuItem value={1} primaryText="Backlog" />
                        <MenuItem value={2} primaryText="Doing" />
                        <MenuItem value={3} primaryText="Done" />
                    </SelectField> <br />
                    <RaisedButton label="Submit"  primary={true} onClick={this.handleSubmit.bind(this)} />
                </form>
            </div>
        )
    }
}