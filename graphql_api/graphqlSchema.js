
var graphql = require ('graphql');  


  // Graphql Schema
var BoardType = new graphql.GraphQLObjectType({  
    name: 'board',
    fields: function () {
      return {
        id: {
          type: graphql.GraphQLID
        },
        boardName: {
          type: graphql.GraphQLString
        }
      }
    }
  });
var ListType = new graphql.GraphQLObjectType({  
    name: 'list',
    fields: function () {
      return {
        id: {
          type: graphql.GraphQLID
        },
        boardId: {
            type: graphql.GraphQLID
        },
        listName: {
          type: graphql.GraphQLString
        }
      }
    }
});
  var TaskType = new graphql.GraphQLObjectType({  
    name: 'task',
    fields: function () {
      return {
        id: {
          type: graphql.GraphQLID
        },
        listId: {
            type: graphql.GraphQLID
        },
        taskName: {
          type: graphql.GraphQLString
        },
        taskDesc: {
            type: graphql.GraphQLString
        },
        taskStatus: {
            type: graphql.GraphQLString
        }
      }
    }
  });
   
// Query type  
  var QueryType = new graphql.GraphQLObjectType({  
    name: 'Query',
    fields: () => ({
      boards: {
        type: new graphql.GraphQLList(BoardType),
        resolve: () => {
          return new Promise((resolve, reject) => {
            Board.find((err, boards) => {
              if (err) reject(err)
              else resolve(boards)
            })
          })
        }
      },
      lists: {
        type: new graphql.GraphQLList(ListType),
        resolve: () => {
          return new Promise((resolve, reject) => {
            List.find((err, lists) => {
              if (err) reject(err)
              else resolve(lists)
            })
          })
        }
      },
      tasks: {
        type: new graphql.GraphQLList(TaskType),
        resolve: () => {
          return new Promise((resolve, reject) => {
            Task.find((err, tasks) => {
              if (err) reject(err)
              else resolve(tasks)
            })
          })
        }
      },
    })
  });

  // Mutations
  var MutationAddBoard = {  
    type: BoardType,
    description: 'Add a Board',
    args: {
      boardName: {
        type:  graphql.GraphQLString
      }
    },
    resolve: (root, args) => {
      var newBoard = new Board({
        boardName: args.boardName
      })
      newBoard.id = newBoard._id
      return new Promise((resolve, reject) => {
        newBoard.save(function (err) {
          if (err) reject(err)
          else resolve(newBoard)
        })
      })
    }
  },
  MutationAddList = {  
    type: ListType,
    description: 'Add a List',
    args: {
        boardId: {
          type: graphql.GraphQLString
        },
        listName: {
          type:  graphql.GraphQLString
      }
    },
    resolve: (root, args) => {
      var newList = new List({
        boardId: args.boardId,
        listName: args.listName,
      })
      newList.id = newList._id
      return new Promise((resolve, reject) => {
        newList.save(function (err) {
          if (err) reject(err)
          else resolve(newList)
        })
      })
    }
  },
  MutationAddTask = {  
    type: TaskType,
    description: 'Add a Task',
    args: {
      listId: {
        type:  graphql.GraphQLString  
      },
      taskName: {
        type:  graphql.GraphQLString
      },
      taskDesc: {
        type:  graphql.GraphQLString
      },
      taskStatus: {
        type:  graphql.GraphQLString
      }
    },
    resolve: (root, args) => {
      var newTask = new Task({
        listId: args.listId,
        taskName: args.taskName,
        taskDesc: args.taskDesc,
        taskStatus: args.taskStatus
      })
      newTask.id = newTask._id
      return new Promise((resolve, reject) => {
        newTask.save(function (err) {
          if (err) reject(err)
          else resolve(newTask)
        })
      })
    }
  }

  var MutationType = new graphql.GraphQLObjectType({  
    name: 'Mutation',
    fields: {
      addBoard: MutationAddBoard,
      addList: MutationAddList,
      addTask: MutationAddTask
     // editTask: MutationEditTask
    }
  });

  module.exports = new graphql.GraphQLSchema({  
    query: QueryType,
    mutation: MutationType
  });
 
  