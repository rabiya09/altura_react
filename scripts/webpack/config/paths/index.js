const project = process.env.PROJECT;

switch (project) {
  case 'Ecommerce': {
  }
  default: {
    module.exports = require('./ecommerce.paths');
  }
}
