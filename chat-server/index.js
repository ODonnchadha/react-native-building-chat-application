import { Server } from 'socket.io';
const io = new Server({
    cors: {
        origin: ['http://localhost:8081']
    }
});
const generate = () => Math.random().toString(36).substring(2, 10);
let rooms = [
    {
        roomId: 'GL-01',
        roomName: 'General Chat',
        description: 'The chat room for any and everything',
        messages: [
            {
                id: 1,
                content: 'Welcome to general chat!',
                sent: 'N/A',
                user: 'Admin'
            },
            {
                id: 2,
                content: 'Big sale tomorrow at 3:27 pm.',
                sent: 'N/A',
                user: 'Admin'
            },
            {
                id: 3,
                content: 'Testing.',
                sent: 'N/A',
                user: 'Admin'
            },
        ]
    },
    {
        roomId: 'GL-02',
        roomName: 'Branding Chat',
        description: 'The chat room for Globomatic brands.',
        messages: [
            {
                id: 1,
                content: 'Welcome to the brand chat!',
                sent: 'N/A',
                user: 'Admin'
            },
            {
                id: 2,
                content: 'Automotive brand in introducing a new vehicle.',
                sent: 'N/A',
                user: 'Admin'
            },
        ]
    },
    {
        roomId: 'GL-03',
        roomName: 'Robotics Chat',
        description: 'The chat room for Robotics technology.',
        messages: [
            {
                id: 1,
                content: 'This chat is broken. Do not respond.',
                sent: 'N/A',
                user: 'Admin'
            },
        ]
    },
];
console.log('Globomatic server started...');

io.on('connection', (socket) => {
    console.log(`connect ${socket.id}`, socket.request.headers);

    socket.on('disconnect', () => {
        console.log(`disconnect ${socket.id}`);
    });

    socket.on('getRooms', () => {
        console.log(`returning room list: `, rooms);
        socket.emit('returnRooms', rooms);
    });

    socket.on('connectRoom', (id) => {
        let chosenRoom = rooms.filter((rooms) => rooms.roomId == id);
        socket.join(chosenRoom[0].roomName);
        console.log('Joined room :', chosenRoom[0].roomName);
        socket.emit('joinedRoom', chosenRoom[0].messages);
    });

    socket.on('newPost', (data) => {
        const {userMessage, room_id, sender, messageTime} = data;
        let selectedRoom = rooms.filter((rooms) => rooms.roomId == room_id);
        const addMessage = {
            id: generate(),
            content: userMessage,
            sent: messageTime,
            from: sender,
        };
        console.log('New post: ', addMessage)
        socket.to(selectedRoom[0].roomName).emit('channelMessage', addMessage);
        selectedRoom[0].messages.push(addMessage);
        io.to(selectedRoom[0].roomName).emit('newMessage', selectedRoom[0].messages);
        console.log('Emit new message: ', addMessage);
    });
});

const port = 4002;
io.listen(port);
console.log(`Listening to connections on port ${port}...`);