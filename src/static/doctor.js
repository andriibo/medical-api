const app = new Vue({
    el: '#app',
    data: {
        title: 'Vitals Receiver.',
        messages: [],
        socket: null,
        accessToken: '',
        selectedPatient: '',
        activePatient: '',
        readingStarted: false,
        isConnectedToWebsocket: false,
    },
    methods: {
        connectToWebsocket() {
            if (!this.accessToken.length) {
                alert('Input Access Token.');
                return;
            }

            this.socket = initSocket(this.accessToken);
            this.socket.on('messageToClient', (message) => {
                this.receivedMessage(message);
            });
            this.socket.on('exception', (error) => {
                alert(error.message);
                console.error(error);
            });
            this.socket.on('joinedRoom', (message) => {
                console.log('joinedRoom', message);
                this.messages = [];
                this.readingStarted = true;
            });

            this.isConnectedToWebsocket = true;
        },
        disconnectFromWebsocket() {
            this.stopReadingMessages();

            if (this.socket !== null) {
                this.socket.disconnect();
            }

            this.messages = [];
            this.readingStarted = false;
            this.isConnectedToWebsocket = false;
        },
        startReadingMessages() {
            this.stopReadingMessages();

            if (!this.selectedPatient) {
                alert('Input Player Id.');
                return;
            }

            if (this.activePatient.length > 0) {
                this.socket.emit('leaveRoom', this.createRoomMessage(this.activePatient));
            }

            this.activePatient = this.selectedPatient;
            this.socket.emit('joinRoom', this.createRoomMessage(this.activePatient));
        },
        stopReadingMessages() {
            if (this.activePatient.length > 0) {
                this.socket.emit('leaveRoom', this.createRoomMessage(this.activePatient));
            }

            this.messages = [];
            this.readingStarted = false;
        },
        receivedMessage(message) {
            this.messages.push(message);
        },
        createRoomMessage(room) {
            return {patientUserId: room};
        },
    },
});
