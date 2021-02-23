// Mensajes de Sockets

const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Coldplay'));
bands.addBand(new Band('Soda Stereo'));
bands.addBand(new Band('Caifanes'));

console.log(bands);


io.on('connection', client => {
    console.log('Cliente Conectado');

    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload);

        io.emit('mensaje', {admin: 'Nuevo Mensaje'})        
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {

        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands()) ;
    });

    client.on('delete-band', (payload) => {

        // const deleteBand = new deleteBand(payload.id);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands()) ;
    });

    // client.on('emitir-mensaje', (payload) => {
    //     // console.log('Mensaje!!!', payload);
    //     client.broadcast.emit('nuevo-mensaje', payload)        
    // });

  });