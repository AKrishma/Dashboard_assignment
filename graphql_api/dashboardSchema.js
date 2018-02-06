const   makeExecutableSchema = require('graphql-tools'),
        { graphql, buildSchema } = require('graphql'),
        graphqlHTTP = require('express-graphql'),
        router = express.Router(),
        async = require('asyncawait/async'),
        await = require('asyncawait/await');

const Board = db.collection('board')
const List = db.collection('list')
const Task = db.collection('task')

const prepare = (o) => {
    o._id = o._id.toString()
    return o
  }

const typeDefs = [`
    type Query {
        board(_id: String): Board
        list(_id: String): List
        task(_id: String): Task
    }
    type Board {
        _id: String
        boardName: String
        lists: [List]
    }
    type List {
        _id: String
        listId: String
        listName: String
        board: Board
        tasks: [Task]
    }
    type Task {
        _id: String
        listId: String
        taskName: String
        taskDesc: String
        taskStatus: String
        createdOn: String
        list: List
    }
    type Mutation {
        createBoard(boardName: String): Board
        createList(boardId: String, ListName: String): List
        createTask(listId: String, taskName: String, taskDesc: String, taskStatus: String, createdOn: String): Task
    }
    schema {
        query: Query
        mutation: Mutation
    }
`];

const resolvers = {
    Query: {
        board: async (root, {_id}) => {
            return prepare(await Board.findOne(ObjectId(_id)))
        },
        list: async (root, {_id}) => {
            return prepare(await List.findOne(ObjectId(_id)))
        },
        task: async (root, {_id}) => {
            return prepare(await Task.findOne(ObjectId(_id)))
        }
    },
    List: {
        task: async ({_id}) => {
            return (await Task.find({listId: _id}).toArray()).map(prepare)
        }
    },
    Task: {
        list: async ({listId}) => {
            return prepare(await List.findOne(ObjectId(listId)))
        }
    },
    Board: {
        list: async ({_id}) => {
            return (await List.find({boardId: _id}).toArray()).map(prepare)
        }
    },
    List: {
        board: async ({boardId}) => {
            return prepare(await Board.findOne(ObjectId(boardId)))
        }
    },
    Mutation: {
        createBoard: async (root, args, context, info) => {
            const res = await Board.insert(args)
            return prepare(await Board.findOne({_id: res.insertedIds[1]}))
        },
        createList: async (root, args) => {
            const res = await List.insert(args)
            return prepare(await List.findOne({_id: res.insertedIds[1]}))
        },
        createTask: async (root, args) => {
            const res = await Task.insert(args)
            return prepare(await Task.findOne({_id: res.insertedIds[1]}))
        },
    },
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})