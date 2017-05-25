module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('a user connected')

    socket.on('disconnect', function() {
      console.log('a user disconnected')
    })

    socket.on('ping', function() {
      console.log('pong')
    })

    socket.on('type', function(data) {
      socket.emit('keycode', data)
    })
  })
}
