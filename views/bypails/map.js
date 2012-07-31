function(doc) {
  if(doc.pails)
  emit(doc._id, doc.pails);
}