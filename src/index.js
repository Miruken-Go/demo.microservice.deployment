const az      = require('./az');
const arm     = require('./arm');
const logging = require('./logging');
const config  = require('./config');

async function main() {
    try {
        console.log("Configuring Environment")
        logging.printConfiguration(config)
        await az.login()
        await az.registerForActiveDirectoryIfNeeded()
        await arm.configure()
        console.log("Configuration Succeded")
    } catch (error) {
        process.exitCode = 1
        console.log(error)
        console.log("Configuration Failed")
    }
}

main()



