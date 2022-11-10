function initSocket() {
    return io('http://localhost:3001/ws/current-vitals');
}
