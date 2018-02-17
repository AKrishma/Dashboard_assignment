var mongoose = require('mongoose');

// Mongoose Schema
var Board = mongoose.model('board', {  
    id: mongoose.Schema.Types.ObjectId,
    boardName: String
  })
 List = mongoose.model('list', {  
    id: mongoose.Schema.Types.ObjectId,
    boardId: mongoose.Schema.Types.ObjectId,
    listName: String
  });
 Task = mongoose.model('task', {  
    id: mongoose.Schema.Types.ObjectId,
    listId: mongoose.Schema.Types.ObjectId,
    taskName: String,
    taskDesc: String,
    taskStatus: String
  }); 

  // Mongoos CRUD methods
    Board.findOneAndUpdate(query, modification, options,
      function(err, updatedDoc) {
        if (err) {
          console.error("Error in submitting review, ERROR::", err);
          done(err)
          return;
        }
        return done(null, updatedDoc);
    }); 
    List.findOneAndUpdate(query, modification, options,
      function(err, updatedDoc) {
        if (err) {
          console.error("Error in submitting review, ERROR::", err);
          done(err)
          return;
        }
        return done(null, updatedDoc);
      });    
    Task.findOneAndUpdate(query, modification, options,
      function(err, updatedDoc) {
        if (err) {
          console.error("Error in submitting review, ERROR::", err);
          done(err)
          return;
        }
        return done(null, updatedDoc);
      });
      
      Board.findByIdAndRemove(id, function(err, doc) {
        if(err) {
          console.log("Error in removing Board, ERROR:: ",err);
          done(err)
          return;
        }
        return done(null,doc);
      });
      List.findByIdAndRemove(id, function(err, doc) {
        if(err) {
          console.log("Error in removing List, ERROR:: ",err);
          done(err)
          return;
        }
        return done(null,doc);
      })
      Task.findByIdAndRemove(id, function(err, doc) {
        if(err) {
          console.log("Error in removing Task, ERROR:: ",err);
          done(err)
          return;
        }
        return done(null,doc);
      });
