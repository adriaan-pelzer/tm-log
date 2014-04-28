var _ = require ( 'lodash' );
var path = require ( 'path' );
var log4js = require ( 'log4js' );

exports.inspect = require ( 'eyes' ).inspector ( { maxLength: 0 } );

exports.logger = function ( filename, config ) {
    var fileNameRelativeToThisDir, module, logger;

    fileNameRelativeToThisDir = path.relative ( __dirname, filename.replace ( path.extname ( filename ), '' ) );
    module = _.reject ( fileNameRelativeToThisDir.split ( path.sep ), function ( item ) {
        return item === '..';
    } );

    logger = log4js.getLogger ( module.join ( '.' ) );

    logger.setLevel ( _.reduce ( module, function ( logLevel, mPart ) {
        return _.isString ( logLevel ) ? logLevel : ( _.isUndefined ( logLevel[mPart] ) ? 'ERROR' : logLevel[mPart] );
    }, config.logLevels ) );

    return logger;
};
