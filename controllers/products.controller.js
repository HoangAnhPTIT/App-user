
const db = require('../db')

module.exports.index = function(req, res)  {
	var page = parseInt(req.query.page)
	var perPage = 6
	var start = (page - 1) * perPage
	var end = page * perPage
	res.render('product/product',{
		
		products: db.get('products').value().slice(start, end)

	})

}