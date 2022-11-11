function initSocket(token) {
    const socketOptions = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: 'Bearer ' + token,
                },
            },
        },
    };

    return io(`${location.protocol}//${location.hostname}:${location.port}/ws/current-vitals`, socketOptions);
}
