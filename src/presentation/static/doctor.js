const app = new Vue({
    el: '#app',
    data: {
        title: 'Patient Vitals Generator.',
        name: '',
        text: '',
        selected: 'patientA',
        messages: [],
        socket: null,
        activeRoom: '',
        rooms: {
            patientA: false,
            patientB: false,
            patientC: false,
        },
        listRooms: ['patientA', 'patientB', 'patientC'],
    },
    methods: {
        onChange(event) {
            this.socket.emit('leaveRoom', this.activeRoom);
            this.activeRoom = event.target.value;
            this.socket.emit('joinRoom', this.activeRoom);
        },
        sendMessage() {
            if (this.validateInput()) {
                const message = {
                    name: this.name,
                    text: this.text,
                    room: this.activeRoom,
                };
                this.socket.emit('msgToServer', message);
                this.text = '';
            }
        },
        receivedMessage(message) {
            this.messages.push(message);
        },
        validateInput() {
            return this.name.length > 0 && this.text.length > 0;
        },
        check() {
            if (this.isMemberOfActiveRoom) {
                this.socket.emit('leaveRoom', this.activeRoom);
            } else {
                this.socket.emit('joinRoom', this.activeRoom);
            }
        },
    },
    computed: {
        isMemberOfActiveRoom() {
            return this.rooms[this.activeRoom];
        },
    },
    created() {
        this.activeRoom = this.selected;
        this.socket = io('http://localhost:3001/current-vitals');
        this.socket.on('msgToClient', (message) => {
            this.receivedMessage(message);
        });

        this.socket.on('connect', () => {
            this.check();
        });

        this.socket.on('joinedRoom', (room) => {
            this.rooms[room] = true;
        });

        this.socket.on('leftRoom', (room) => {
            this.rooms[room] = false;
        });
    },
});
