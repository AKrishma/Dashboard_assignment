import React from 'react';
import { graphql, Mutation, Query } from 'react-apollo';
import { createApolloFetch } from 'apollo-fetch';
//import AddBoardForm from './AddBoardForm';
import { DELETE_BOARD, FETCH_ALL_BOARDS } from './Queries';

const updateCache = (cache, {data: { deleteBoard } }) =>  {
    const { boards } = cache.readQuery({ query: FETCH_ALL_BOARDS })
    cache.writeQuery({
        query: FETCH_ALL_BOARDS,
        data: {
            boards: boards.filter(n => n.id !== deleteBoard.id)
        }
    })
}

export default() => {
    <div className = "displayBoard">
            <h2> Boards </h2>
            <ul className = "board">
            <Query query={FETCH_ALL_BOARDS}>
                {({ loading, error, data: { boards } }) => {
                    if (loading) return 'Loading...'
                    if (error) return <div>Error : (</div>
                        return boards.map(({boardName, id}) => {
                            <li key={id}>
                          <a key={id} href="/list">{boardName}</a>
                           <Mutation mutation = {DELETE_BOARD} update={updateCache}>
                          {(deleteBoard, attrs = {})  => (
                              <span className="delete" onClick={()=>deleteBoard({variables: {boardName} })}> 
                              {attrs.loading ? 'Loading': 'x'}
                              </span>
                          )}
                          </Mutation> 
                        </li>
                })}
            }
            </Query>
        </ul>
    </div>
}