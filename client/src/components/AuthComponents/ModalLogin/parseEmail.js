export const parseEmail = (emailValue) => {
    try {
        const email = {
            prefix: emailValue.split("@")[0],
            suffix: emailValue.split("@")[1].split(".")[0],
            domain: emailValue.split("@")[1].split(".")[1],
        };

        const prefix = email.prefix.slice(0, 2).padEnd(email.prefix.length, '*');
        const suffix = email.suffix.slice(0, 1).padEnd(email.suffix.length, '*');
        const domain = email.domain.slice(0,1).padEnd(email.domain.length, '*');

        return `${prefix}@${suffix}.${domain}`
    } catch (e) {
        return '';
    }
}
