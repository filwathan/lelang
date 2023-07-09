filter = (data, countData, res, callback) => {
    data.limit = data.limit || 5;
    data.page = data.page || 1;
    data.search = data.search || ''
    data.sort = data.sort || 'ASC'

    const params = {
        limit: data.limit,
        offset: (data.page - 1) * data.limit,
        search: data.search,
        sort: data.sort,
    }
    
    const pageInfo = {
        page: data.page,
    }
    console.log(params)

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

