  export const generateUniqueNumber = async (length, db) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  let accountNumber;
  let exists = true;

  while (exists) {
    accountNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const num = accountNumber.toString()
    const result = await db.findOne({ where: { accountNumber: num } });
    exists = !!result; // true if number exists
  }

  return accountNumber;
};