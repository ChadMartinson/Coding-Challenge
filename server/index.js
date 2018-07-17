const mongoose = require('mongoose');
const Factory = require('./models/Factory');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8989 });
const url = 'mongodb://localhost:27017/sample';
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
		console.log('====== MESSAGE ======', message);
		const data = JSON.parse(message);
		switch (data.type) {
			case 'UPDATE_FACTORY':
				const { id, ...payload } = data;
				Factory.findByIdAndUpdate(id, payload, (err, data) => {
					if (err) {throw new Error(err);}
					ws.send(JSON.stringify({
						type: 'FACTORY_UPDATED',
						data
					}));
					broadcast(data, ws);
				});
				break;
			case 'DELETE_FACTORY':
				// Factory.findByIdAndRemove()
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