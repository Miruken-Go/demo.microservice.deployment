const bash = require('./bash').execute
const az   = require('./az');

async function main() {
    try {
        console.log("Configuring Environment")
        await az.login()


        console.log("Configuration Succeded")
    } catch (error) {
        process.exitCode = 1
        console.log(error)
        console.log("Configuration Failed")
    }
}

main()



