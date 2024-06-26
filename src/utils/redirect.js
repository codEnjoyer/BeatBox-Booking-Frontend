export const redirect = (win, from, to) => {
    if (typeof win !== 'undefined')
        window.location.replace(window.location.href.replace(from, to))
}