const mongoose = require('mongoose');
const Factory = require('./models/Factory');
const WebSocket = require('ws');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 8989;
const wss = new WebSocket.Server({ port });
const url = process.env.MONGOLAB_URI;
mongoose.connect(`${url}`);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => { console.log('-> MongoDB connected'); });

const users = [];

const broadcast = (data, ws) => {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN && client !== ws) {
			client.send(JSON.stringify(data));
		}
	});
};

wss.on('connection', (ws) => {
	let index;
	index = users.length;
	users.push({ id: index + 1 });
	ws.on('message', (message) => {
		console.log('====== INCOMING MESSAGE ======', message);
		const data = JSON.parse(message);
		switch (data.type) {
			case 'UPDATE_FACTORY':
				Factory.findByIdAndUpdate({_id: ObjectId(data.data.id)}, data.data, {new: true}).exec( (err, data) => {
					if (err) {return console.log(err.message);}
					ws.send(JSON.stringify({
						type: 'FACTORY_UPDATED',
						data
					}));
					broadcast({
						type: 'FACTORY_UPDATED',
						data
					}, ws);
				});
				break;
			case 'DELETE_FACTORY':
				Factory.findByIdAndRemove({_id: ObjectId(data.data.id)}, (err, data) => {
					if (err) {return console.log(err.message);}
						ws.send(JSON.stringify({
							type: 'FACTORY_REMOVED',
							data
						}));
						broadcast({
							type: 'FACTORY_REMOVED',
							data
						}, ws);
					});
				break;
			case 'CREATE_FACTORY':
				new Factory(data.data).save((err, data) => {
					if (err) {throw new Error(err);}
					ws.send(JSON.stringify({
						type: 'NEW_FACTORY',
						data
					}));
					broadcast({
						type: 'NEW_FACTORY',
						data
					}, ws);
				});
				break;
			case 'FETCH_FACTORIES':
				Factory.find().exec((err, data) => {
					if (err) {throw new Error(err);}
					ws.send(JSON.stringify({
						type: 'FACTORY_LIST',
						data
					}));
				});
				break;
			default:
				break
		}
	});
});