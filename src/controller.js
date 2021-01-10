'use strict';
const CurrencyModel = require('./model');

module.exports = {

  getAllByMarket(req, res) {
    const market = req.params["market"];
    CurrencyModel.find({market: market}, (err,result) => {
      if(err){
        return res.status(500).json(err);
      }
      return res.json(result);
	})
  },

  getAll(req, res) {
    CurrencyModel.find((err,result) => {
      if(err){
		console.log(err);
        return res.status(500).json(err);
      }
      return res.json(result);
    })
  },

  getOne(req, res) {
    const currencyID = req.params['currencyID'];
    CurrencyModel.find({ id: currencyID }, (err, result) => {
      if (err) {
		console.log(err);
        return res.status(500).json(err);
      }
      return res.json(result);
    });
  },

  create(req, res) {
    let currency = req.body;
    CurrencyModel.create(currency, (err, result) => {
      if (err) {
		console.log(err);
        return res.status(500).json(err);
      }
      return res.json(result);
    });
  },

  update(req,res) {
    const currencyId = req.params["id"]
	CurrencyModel.findByIdAndUpdate(currencyId, req.body, { new: true })
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
  },

  delete(req,res) {
    const currencyId = req.params["id"];
    CurrencyModel.findByIdAndDelete({_id: currencyId})
	  .then(result => {
		if(result === null) {
		  return res.status(404).json({
			"message": "Does not exists"
		  })
		}
		return res.json(result);
      })
      .catch(err => {
		console.log(err);
		return res.status(500).json(err);
      });
  }
};
