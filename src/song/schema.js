const yup = require('yup');

const genreSchema = yup.object().shape({
  name: yup
    .string()
    .max(30)
    .required(),
});

const artistSchema = yup.object().shape({
  name: yup
    .string()
    .max(100, 'Max length is 100')
    .required(),
});

const albumSchema = yup.object().shape({
  name: yup
    .string()
    .max(100)
    .required(),
});

const songSchema = yup.object().shape({
  name: yup
    .string()
    .max(100)
    .required(),
});

module.exports = {
  genreSchema,
  artistSchema,
  albumSchema,
  songSchema,
};
