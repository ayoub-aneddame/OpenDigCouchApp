function(doc) {
  if(doc.artifacts && doc.artifacts.length != 0)
    emit(doc._id, doc.artifacts);
}