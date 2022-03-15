export const hideMyRed = () => {
    console.warn = () => {};
    console.error = () => {};
};