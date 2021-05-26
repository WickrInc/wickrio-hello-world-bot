# Wickr IO Hello World Bot
This integration responds to users messages with canned responses, each response will be sent out in a well defined sequence associated with the Wickr user sending to the Wickr IO client. The Wickr IO Hello World integration is a sample integration, which can be used as a base to create new custom integrations.
Note: This is a good template to edit and create a custom chatbot for Wickr

To get started, you would need to setup your system, download and install Docker and run the WickrIO Docker container. Full instructions on how to do so are available here: https://wickrinc.github.io/wickrio-docs/#wickr-io-getting-started

## Configuration:
Wickr IO integrations are configured by running the configure.sh file,
to add any additional tokens you want to prompt for do so by adding them to the array in line 63 in configure.js

Required tokens:

- DATABASE_ENCRYPTION_KEY - Choose a 16-character(minimum) string key to derive the crypto key from in order to encrypt and decrypt the user database of this bot. This must be specified, there is no default. NOTE: be careful not to change if reconfiguring the bot or else the user database won't be accessible.


For full documentation and usage guide go here: https://wickrinc.github.io/wickrio-docs/

# License

This software is distributed under the [Apache License, version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)

```
   Copyright 2021 Wickr, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```
