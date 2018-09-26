# ERE Cusur (Easy Register Event)

## Development Setup

First Clone the app

```
git clone
```

install all the dependencies:

```
yarn install
```

Then create a `.env` file in the root directory with the following:

```
REACT_APP_API_URL=http://localhost:5000/api
```
> This app is ment to work along with the [DAT API](https://github.com/Cusur2k18/diploma-admin-tool)


After that run the server:

```
npm start
```
> __Note:__ is important to use `npm start` and not `yarn start` since create-react-app doesn't read the ENV variables if we use yarn to start the server.
