function(doc) {
  if(doc.square)
  emit(doc.square, doc.field);
}