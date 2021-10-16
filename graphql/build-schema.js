const { requireModule } = require('@boost/module')

Object.keys(require.cache).filter(key => !key.includes('node_modules')).forEach(key => {
    delete require.cache[key]
});

module.exports = requireModule(require.resolve('./schema.ts')).schema

