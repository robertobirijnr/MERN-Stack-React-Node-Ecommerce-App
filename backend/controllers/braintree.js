const User = require("../models/user");
const braintree = require("braintree");
require("dotenv").config();

const getway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINREE_MERCHANT_ID,
  publicKey: process.env.BRAINREE_PUBLIC_KEY,
  privateKey: process.env.BRAINREE_PRIVATE_KEY
});

exports.generateToken = (req, res) => {
  getway.clientToken.generate({}, function(err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};
