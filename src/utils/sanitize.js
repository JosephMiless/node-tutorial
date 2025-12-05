

export const sanitize = (data) => {

    const {sourceAccount, recipientEmail, note , ...sanitizedData} = data;

    return sanitizedData;

};