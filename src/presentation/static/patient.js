const app = new Vue({
    el: '#app',
    data: {
        title: 'Patient Vitals Generator.',
        hr: false,
        temp: false,
        vitals: [],
        socket: null,
        interval: null,
        activePatient: 'A',
        listPatients: ['A', 'B', 'C'],
        vitalRanges: {
            hr: {min: 50, max: 150},
            temp: {min: 35, max: 42},
        },
        sendingStarted: false,
    },
    methods: {
        onChange(event) {
            this.stopSendingVitals();

            const prevPatient = this.activePatient;
            this.activePatient = event.target.value;

            this.socket.emit('joinRoom', {
                toRoom: this.activePatient,
                fromRoom: prevPatient,
            });

            this.vitals = [];
        },
        sendVitals() {
            if (!this.validateInput()) {
                alert('Check at least one vital.');
                return;
            }
            console.log('Start Sending...');
            this.sendingStarted = true;

            this.interval = setInterval(
                function () {
                    const message = {
                        room: this.activePatient,
                        vitals: [],
                    };
                    Object.keys(this.vitalRanges).map((vital) => {
                        if (Boolean(this[vital])) {
                            const {min, max} = this.vitalRanges[vital];
                            message.vitals.push({
                                name: vital,
                                value: this.getRandomInt(min, max),
                            });
                        }
                    });
                    console.log('message', message);
                    if (message.vitals.length > 0) {
                        this.socket.emit('messageToServer', message);
                    }
                }.bind(this),
                2000,
            );
        },
        stopSendingVitals() {
            if (this.interval !== null) {
                clearInterval(this.interval);
                this.interval = null;
                console.log('Sending stopped.');
            }
            this.sendingStarted = false;
        },
        receivedMessage(message) {
            message.vitals.map((vitals) => this.vitals.push(vitals));
        },
        validateInput() {
            return this.hr || this.temp;
        },
        getRandomInt(min, max) {
            return Math.random() * (max - min) + min;
        },
    },
    created() {
        this.socket = io('http://localhost:3001/current-vitals');
        this.socket.on('messageToClient', (message) => {
            this.receivedMessage(message);
        });

        this.socket.on('connect', () => {
            this.socket.emit('joinRoom', {
                toRoom: this.activePatient,
            });
        });
    },
});
