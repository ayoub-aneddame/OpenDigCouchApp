function(doc) {
	if(doc.field && doc.square && doc.code && doc.start_date && doc.end_date && doc.locus_type && doc.designation && doc.age)
            emit([doc.code, doc.field, doc.square, doc.locus_type], [doc.start_date, doc.end_date, doc.designation, doc.age, doc._id]);
}