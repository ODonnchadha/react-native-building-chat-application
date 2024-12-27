## Building a Chat Application with React Native" by Reggie Dawson

- OVERVIEW:
    - Basics of WebSocket. Building a server. Adding authentication. Creating a chat client.
    - JavaScript and React Native.

- SETTING UP THE DEVELOPMENT ENVIRONMENT:
    - Text editor. JavaScript for client and server. IDE? Text Editor?
        - Sublime Text? Brackets? Phoenix Code? Visual Studio Code.
        ```javascript
            node -v
        ```
        - NOTE: v23.5.0 (20.13.1) Chocolately?
    - WebSocket API. HTTP is unidirectional.
        - WebSocket maintains connection. Clients cannot communicate with each other directly.
            - Communicate with server. Message is then broadcasted.
        - WebSocket Object: Attemps to open a connection with the server.
        - Send Method: Used to transmit data.
    - Install Android Studio. Optional. Access to emulator. Can use Expo mobile app. And can test the app via browser.
        - Install Andriod Studio and Andriod virtual device.
    - React Native. Same React syntax. Apps for Andriod and iOS.
        - Expo? Expo mobile app? Compile the app as a Web page. And preview with the browser.

- SETTING UP THE WEBSOCKETS SERVER:
    - WebSocket protocol. Most browsers support this. We respond to events.
        - WS or WSS. We can also use HTTP and HTTPS. Server port is optional. Fallback to 80 or 443.
            - Cannot contain a fragment. e.g.: #
        - Initial handshake over HTTP. Upgrade to WS protocoal after handshake.
    - Connection is full duplex. Both client and server can respond to events.
        - The open event is fired once the WebSocket connection is established.
            - And respond to the event to confirm that a client has connected.
    - The message event is fired anytime data is received through the WebSocket.
        - The data can be extracted from the response that is returned to the listener.
            ```javascript
                const socket = new WebSocket('ws://localhost:3000');
                socket.addEventListener('message', (event) => {
                    console.log('Message from server: ', event.data);
                });
            ```
    - The close event responds to the connection closing. By responding to this event, we can perform any actions that are needed.
        ```javascript
            socket.onclose = (event) => {
                console.log('Connection closed with code: ', event.code);
                console.log('Closed clean: ', event.wasClean);
            };
            socket.addEventListener('close', (event) => {
                console.log('Reason connection was closed: ', event.reason);
            });
        ```
    - Error event is generic. Limited information. Listening to the close event is a better option.
    - WebSocket instance methods: send(data): String. BLOB. ArrayBuffer.
        - close(); close(code); close(code, reason);
    - WebSocket instance properties:
        - URL: The URL of the WebSocket.
        - protocol will return the sub protocol that was supplied to the WebSocket constructor.
            - readyState: CONNECTING. OPEN. CLOSING. CLOSED.
            - bufferedAmount: Amount of data that has been queued using the send method.
            - extensions: Returns any extensions profided by the server.
            - binaryType: blob. (blob is default.) arrayBuffer.
    - Creating the Socket.io Server.
        ```javascript
            md chat-server
            cd chat-server
            npm init -y
            npm install socket.io
            npm start
        ```

- CREATING THE CLIENT APPLICATION:
    ```javascript
        npx create-expo --template blank
        npx expo install react-native-web react-dom @expo/metro-runtime
    ```