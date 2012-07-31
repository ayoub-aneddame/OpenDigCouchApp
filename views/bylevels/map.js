function(doc) {
  if(doc.levels)
  emit(doc._id, doc.levels);
}