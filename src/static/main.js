function initSocket() {
    const socketOptions = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization:
                        'Bearer eyJraWQiOiIzdm9rOGNIQ2gzSTB2OTZzZnlrOHJERW55aUlZanVDU2NZYmdyRWYzSlJjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzNDMwZTRjNy1lOWQ0LTQwNGMtYTAwZS1lODhhMmNlODU5MjkiLCJjb2duaXRvOmdyb3VwcyI6WyJQYXRpZW50Il0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9VMXZlZlRKQjQiLCJjb2duaXRvOnVzZXJuYW1lIjoiMzQzMGU0YzctZTlkNC00MDRjLWEwMGUtZTg4YTJjZTg1OTI5Iiwib3JpZ2luX2p0aSI6ImE4NjJiZDk1LThhNmEtNDBkNi04MTc2LWRlZmNhMWY4ZWVjYiIsImF1ZCI6IjUya2wxcnJ1bDh0YTA1azlpdW1sdjJudmN0IiwiZXZlbnRfaWQiOiJiYWY1YmQyZS1kZDFlLTQ5MTgtOTUxOC05ZjZkMjhkNmU0NTgiLCJ1cGRhdGVkX2F0IjoxNjY4MDg1MTE2MDc4LCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY2ODE2NjQ0MiwiZXhwIjoxNjY4MTc3MjQyLCJpYXQiOjE2NjgxNjY0NDIsImp0aSI6IjZkNmM5ZDM1LWZhNDAtNGQ2Ni05ODNmLThiMjBmMzgxYWEzYyIsImVtYWlsIjoicy52eXNobm92QGdtYWlsLmNvbSJ9.sE3yjnAlHb2gHrGVY-dGLKbthlanDyFTViaoEVWExXuzz-Hu2AFNkqV7_hjesINjP0I9U9RpHV7cVx08sFvJIdt9mSN6ppF4_8Q6U76gFi8RzAbhBgyQHQ2a6NPaNKPVJhZPjHsTONhbgIcX0gr3epv1e9Um7PRZnwnP_qIYZdbytM8lVlemb_sg7he5Cj7W54CdEQz7Oh0IBFyOs4ryvLGlQ8-rgb69c1jHK6h64KGKR0VXHyGHPvWOWXKDpmwqCk92XFriyHX25QtMcmStekIaQ_bSraxZrWMzMawLY55rwAoSndNTEmQ8sJdOz1rMOYTmzk8m9e5mv4EZ1E4QWQ',
                },
            },
        },
    };

    return io(`${location.protocol}//${location.hostname}:${location.port}/ws/current-vitals`, socketOptions);
}
