function(doc) {
  if(doc.pails && doc.pails.length != 0)
  emit(doc._id, doc.pails);
}