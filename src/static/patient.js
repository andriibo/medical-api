const app = new Vue({
    el: '#app',
    data: {
        title: 'Vitals Supplier.',
        messages: [],
        socket: null,
        interval: null,
        accessToken: '',
        selectedPatient: '',
        activePatient: '',
        vitals: {
            hr: {
                isActive: false,
                range: {min: 50, max: 150},
            },
            temp: {
                isActive: false,
                range: {min: 35, max: 42},
            },
        },
        sendingStarted: false,
        isConnectedToWebsocket: false,
        isJointedToRoom: false,
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
                this.isJointedToRoom = true;
            });

            this.isConnectedToWebsocket = true;
        },
        disconnectFromWebsocket() {
            this.stopSendingMessages();

            if (this.socket !== null) {
                this.socket.disconnect();
            }

            this.messages = [];
            this.isJointedToRoom = false;
            this.isConnectedToWebsocket = false;
        },
        joinRoom() {
            this.stopSendingMessages();

            if (!this.selectedPatient) {
                alert('Input Player Id.');
                return;
            }

            if (this.activePatient.length > 0) {
                this.socket.emit('leaveRoom', this.activePatient);
            }

            this.activePatient = this.selectedPatient;
            this.socket.emit('joinRoom', this.activePatient);
        },
        leaveRoom() {
            this.stopSendingMessages();

            if (this.activePatient.length > 0) {
                this.socket.emit('leaveRoom', this.activePatient);
            }

            this.messages = [];
            this.isJointedToRoom = false;
        },
        startSendingMessages() {
            if (!this.validateInputs()) {
                alert('Check at least one vital.');
                return;
            }
            console.log('Start Sending...');
            this.sendingStarted = true;

            this.interval = setInterval(
                function () {
                    const message = {
                        room: this.activePatient,
                        data: {},
                    };
                    Object.keys(this.vitals).map((vital) => {
                        if (Boolean(this.vitals[vital].isActive)) {
                            const {min, max} = this.vitals[vital].range;
                            message.data[vital] = this.getRandomFloat(min, max);
                        }
                    });

                    this.socket.emit('messageToServer', message);
                }.bind(this),
                2000,
            );
        },
        stopSendingMessages() {
            if (this.interval !== null) {
                clearInterval(this.interval);
                this.interval = null;
                console.log('Sending stopped.');
            }

            this.messages = [];
            this.sendingStarted = false;
        },
        receivedMessage(message) {
            this.messages.push(message);
        },
        validateInputs() {
            return this.vitals.hr.isActive || this.vitals.temp.isActive;
        },
        getRandomFloat(min, max) {
            const value = Math.random() * (max - min) + min;
            return parseFloat(value).toFixed(1) * 1;
        },
    },
});
