function(doc) {
  if(doc.code && doc.locus_type)
  emit([doc.code,doc.locus_type], [doc.square,doc.field]);
}