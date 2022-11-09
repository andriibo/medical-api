const app = new Vue({
    el: '#app',
    data: {
        title: 'Vitals Receiver.',
        vitals: [],
        socket: null,
        selectedPatient: '',
        activePatient: '',
        listPatients: ['A', 'B', 'C'],
        showingStarted: false,
    },
    methods: {
        onChange() {
            this.stopShowingVitals();

            this.activePatient = this.selectedPatient;

            this.vitals = [];
        },
        showVitals() {
            this.socket.emit('joinRoom', this.activePatient);
            this.showingStarted = true;
        },
        stopShowingVitals() {
            if (this.activePatient.length > 0) {
                this.socket.emit('leaveRoom', this.activePatient);
            }
            this.showingStarted = false;
        },
        receivedMessage(message) {
            message.vitals.map((vitals) => this.vitals.push(vitals));
        },
    },
    created() {
        this.socket = io('http://localhost:3001/current-vitals');
        this.socket.on('messageToClient', (message) => {
            this.receivedMessage(message);
        });
    },
});
