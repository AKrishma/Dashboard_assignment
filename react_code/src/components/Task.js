import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Task extends React.Component {
    constructor(props){
        //props
        super(props);
        // states, styles, event bind, 
        this.addTask = this.addTask.bind(this);
    }

    addTask = (e) => {
        
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
            <div class="displayTask"><ul class="tasks">
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
            <li>
                <a href="#" onclick={this.addTask}> Add a task </a>
            </li>
            </ul>
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