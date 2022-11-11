const app = new Vue({
    el: '#app',
    data: {
        title: 'Vitals Supplier.',
        messages: [],
        socket: null,
        interval: null,
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
    },
    methods: {
        onChangePatient() {
            this.stopSendingMessages();

            this.socket.emit('leaveRoom', this.activePatient);
            this.activePatient = this.selectedPatient;
            this.socket.emit('joinRoom', this.activePatient);

            this.messages = [];
        },
        startSendingMessages() {
            if (!this.validateInputs()) {
                alert('Input Player Id and check at least one vital.');
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
            this.sendingStarted = false;
        },
        receivedMessage(message) {
            this.messages.push(message);
        },
        validateInputs() {
            return this.activePatient.length > 0 && (this.vitals.hr.isActive || this.vitals.temp.isActive);
        },
        getRandomFloat(min, max) {
            const value = Math.random() * (max - min) + min;
            return parseFloat(value).toFixed(1) * 1;
        },
    },
    created() {
        this.socket = initSocket();
        this.socket.on('messageToClient', (message) => {
            this.receivedMessage(message);
        });
    },
});
