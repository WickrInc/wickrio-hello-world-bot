# Wickr IO Hello World Bot
This integration responds to users messages with canned responses, each response will be sent out in a well defined sequence associated with the Wickr user sending to the Wickr IO client. The Wickr IO Hello World integration is a sample integration, which can be used as a base to create new custom integrations.

## Configuration:
Wickr IO integrations are configured by running the configure.sh file,
to add any additional tokens you want to prompt for do so by adding them to the array in line 63 in configure.js

Required tokens:

- DATABASE_ENCRYPTION_KEY - Choose a 16-character(minimum) string key to derive the crypto key from in order to encrypt and decrypt the user database of this bot. This must be specified, there is no default. NOTE: be careful not to change if reconfiguring the bot or else the user database won't be accessible.


For full documentation and usage guide go here: https://wickrinc.github.io/wickrio-docs/
