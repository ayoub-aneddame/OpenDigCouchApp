function(doc) {
  if(doc.stratigraphies)
    emit(doc._id, doc.stratigraphies);
}