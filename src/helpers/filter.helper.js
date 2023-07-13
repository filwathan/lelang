filter = (data, countData, res, callback) => {
    data.search = data.search !== '*' ? data.search : '';
    data.orderBy = data.orderBy !== '*' ? data.orderBy : 'title';
    data.sort = data.sort || 'ASC'
    data.page = data.page || 1;
    data.limit = data.limit || 10;

    const params = {
        search: data.search,
        orderBy: data.orderBy,
        sort: data.sort,
        page: data.page,
        limit: data.limit,
        // offset: (data.page - 1) * data.limit,
    }
    
    const pageInfo = {
        page: data.page,
    }
    // console.log(params)

    countData(params, (err, results) =>{
        if (err){
          return res.status(500).json({
            succes: false,
            message: 'Error Filter'
          })
        }
        else{
          pageInfo.totalData = parseInt(results.rows[0].totalData)
          pageInfo.totalPage = Math.ceil(pageInfo.totalData / data.limit)
          pageInfo.nextPage = data.page < pageInfo.totalPage ? data.page + 1 : null
          pageInfo.prevPage = data.page > 1 ? data.page - 1 : null
          callback(params, pageInfo)
        }
    })
}

module.exports = filter

