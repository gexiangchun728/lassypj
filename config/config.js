
module.exports = {
    development: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'The Lassy Project'
      },
      db: 'mongodb://adrian:lassyitup!@linus.mongohq.com:10096/lassyprojectdb'
    }
  , test: {

    }
  , production: {

    }
}
