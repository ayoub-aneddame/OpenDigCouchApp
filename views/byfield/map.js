function(doc) {
  if(doc.field){
      
      emit(doc.field, null);
  }
  
}