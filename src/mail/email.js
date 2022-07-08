const createMail = (item) => {
  return Object.freeze({
    from: item.from,
    to: item.to,
    subject: item.subject,
    text: item.text,
  });
};

module.exports = createMail;
