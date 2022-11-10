function initSocket() {
    return io(`${location.protocol}//${location.hostname}:${location.port}/ws/current-vitals`);
}
