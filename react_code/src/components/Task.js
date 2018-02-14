import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Task extends React.Component {
    
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
            <p><a href="#"> Add a task </a></p>
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