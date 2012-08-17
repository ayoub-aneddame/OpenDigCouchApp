function(doc) {
  if(doc.photos && doc.photos.length != 0)
    emit(doc._id, doc.photos);
}