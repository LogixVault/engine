# LogixVault Engine

## About

This is the backend engine for the LogixVault project. It is a RESTful express.js API that powers the LogixVault web application.

## Requirements

NodeJS latest LTS

## Usage

Clone the repository recursively.

```shell
git clone --recursive https://github.com/LogixVault/engine
```

Switch to the backend folder.

```shell
cd engine
```

Switch to the network folder.

```shell
cd network/fabric-network
```

Start network.

```shell
./network.sh up createChannel -ca -s couchdb
```

Deploy chaincode.

```shell
./network.sh deployCC -ccn supplychain -ccp ../../chaincode -ccl typescript
```

Switch back to the engine folder, and then switch to the `fabric` folder`.

```shell
cd ../../fabric
```

Install dependencies. 

```shell
npm i
```

Switch back to the engine directory.

```shell
cd ..
```

Start the API server.

```shell
node app
```

## License

[GNU General Public License v3.0](LICENSE)

Copyright &copy; 2024 Sayan "Sn1F3rt" Bhattacharyya, The LogixVault Project
