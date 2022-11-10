const app = new Vue({
    el: '#app',
    data: {
        title: 'Vitals Receiver.',
        messages: [],
        socket: null,
        selectedPatient: '',
        activePatient: '',
        readingStarted: false,
    },
    methods: {
        onChangePatient() {
            this.stopReadingMessages();

            this.activePatient = this.selectedPatient;

            this.messages = [];
        },
        startReadingMessages() {
            if (!this.validateInputs()) {
                alert('Input Player Id.');
                return;
            }

            this.socket.emit('joinRoom', this.activePatient);
            this.readingStarted = true;
        },
        stopReadingMessages() {
            if (this.activePatient.length > 0) {
                this.socket.emit('leaveRoom', this.activePatient);
            }
            this.readingStarted = false;
        },
        receivedMessage(message) {
            this.messages.push(message);
        },
        validateInputs() {
            return this.activePatient.length > 0;
        },
    },
    created() {
        this.socket = initSocket();
        this.socket.on('messageToClient', (message) => {
            this.receivedMessage(message);
        });
    },
});
