import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from "material-ui/TextField";
import RaisedButton from  "material-ui/RaisedButton";

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
    deleteTask = (e) => {
        alert('delete Task');
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
            <div className="displayTask">
            <ul className="tasks">
            {
                (tasks.length > 0) ?
                tasks.map((t) => {
                    return (
                        <li key={t.task} className = "taskItem" listId= {t.listId}>
                            {t.taskName}
                        <span className="deleteTask" data-id={t.id} onClick={this.deleteTask.bind(this)}>X</span>
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
    constructor(props) {
        super(props);
        this.state =  {
            taskName: '',
            taskDesc: '',
            listId: ''
        }
    }
    handleSubmit = (e) => { 
        let listName = this.state.taskName,
            taskDesc = this.state.taskDesc,
            listId = this.state.listId;
    }
   
    render() {
        return (
            <div className= "addListForm">
                <form method="post" action="" >
                    <input type="hidden" id="listId"  value= "" /> <br />
                    Enter Task name: <br />
                    <TextField type="text" id="taskName"  hintText="Text" onChange= {(e) => { this.setState({taskName: e.target.value}) }}/> <br />
                    Enter Task Description: <br />
                    <TextField type="text" id="taskDesc"  hintText="Text" onChange= {(e) => { this.setState({taskDesc: e.target.value}) }} /> <br />
                    Select Task status: <br />
                    <select>
                        <option value="1">Backlog</option>
                        <option value="2">Doing</option>
                        <option value="3">Done </option>
                    </select> <br /><br />
                    <RaisedButton label="Submit"  primary={true} onClick={this.handleSubmit.bind(this)} />
                </form>
            </div>
        )
    }
}