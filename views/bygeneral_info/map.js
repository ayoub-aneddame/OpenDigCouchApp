function(doc) {
  
  emit(doc._id, [doc.start_date, doc.end_date, doc.field, doc.square, doc.code, doc.locus_type, doc.supervisor, doc.designation, doc.reason, doc.top_separation, doc.bottom_separation, doc.stratigraphy_remarks, doc.age, doc.top_plan, doc.draw_balks]);
}