
function getQuery(criteria, query) {
    criteria.forEach(o => {
        if (o.field === 'status') { //ignore status field
            return
        }
        query = query.where(o.field, o.op, o.value)
    })
    return query;
}

exports.getQuery = getQuery;