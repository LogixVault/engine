'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const network = require('./fabric/network');

app.use(express.json());
app.use(cors());

function generateTxnID(length) {
  const chars = '0123456789abcdef';
  let hex = '';
  for (let i = 0; i < length; i++) {
    hex += chars[Math.floor(Math.random() * chars.length)];
  }
  return hex;
}

app.use((req, res, next) => {
  res.status(200).send('Success.');
  console.log(req.method, req.url, req.body, generateTxnID(64));
});

app.get('/', (req, res) => {
    res.send('LogixVault.');
});

app.get('/getProduct', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productId = req.query.id.toString();

        const result = await contract.evaluateTransaction('getProduct', productId);
        const response = JSON.parse(result.toString());
        console.log(response);
        res.json({ result: response });
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.post('/createProduct', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productJson = JSON.stringify(req.body);

        console.log(productJson);

        const result = await contract.submitTransaction('createProduct', productJson);
        console.log(result.toString());
        res.json( {result: result} );
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.get('/productExists', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productId = req.query.id.toString();
        console.log(productId);

        const result = await contract.evaluateTransaction('productExists', productId);
        console.log(result.toString());
        res.json({ exists: result.toString() });
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.post('/shipProduct', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const shipDetails = req.body;

        const result = await contract.submitTransaction('shipProductTo',
            shipDetails.productId,
            shipDetails.newLocation,
            shipDetails.arrivalDate);

        console.log(result.toString());
        res.json({ status: 'Transaction submitted.', txId: result.toString()});
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.get('/getOrder', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productId = req.query.id.toString();

        const result = await contract.evaluateTransaction('getOrder', productId);
        const response = JSON.parse(result.toString());
        console.log(response);
        res.json({ result: response });
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.post('/createOrder', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productJson = JSON.stringify(req.body);

        console.log(productJson);

        const result = await contract.submitTransaction('createOrder', productJson);
        console.log(result.toString());
        res.json( {result: result} );
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.get('/orderExists', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productId = req.query.id.toString();
        console.log(productId);

        const result = await contract.evaluateTransaction('orderExists', productId);
        console.log(result.toString());
        res.json({ exists: result.toString() });
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.post('/cancelOrder', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productJson = JSON.stringify(req.body);

        console.log(productJson);

        const result = await contract.submitTransaction('cancelOrder', productJson);
        console.log(result.toString());
        res.json( {result: result} );
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.get('/getProcurement', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productId = req.query.id.toString();

        const result = await contract.evaluateTransaction('getProcurement', productId);
        const response = JSON.parse(result.toString());
        console.log(response);
        res.json({ result: response });
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.post('/createProcurement', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productJson = JSON.stringify(req.body);

        console.log(productJson);

        const result = await contract.submitTransaction('createProcurement', productJson);
        console.log(result.toString());
        res.json( {result: result} );
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.get('/getInventory', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productId = req.query.id.toString();

        const result = await contract.evaluateTransaction('getInventory', productId);
        const response = JSON.parse(result.toString());
        console.log(response);
        res.json({ result: response });
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.listen(3003, () => {
    console.log('Listening on port 3003');
});
