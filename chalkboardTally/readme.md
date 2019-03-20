# Simple Project Tallying Total Days

1. Start Date is hardcoded in component for each respective user.
2. Change tally speed (in milliseconds) with in last line of componentDidMount in component for desired user.

```javascript
this.interval = setInterval(() => this.tick(), 250);
```

3. To run the app, first start your emulator/simulator.  For example, for iOS you can use xcode's simulator.  
4. Run `npm install`.  Then run `npm start`.  Wait for the message saying `Running Metro Bundler on port 8081` and then a final message saying `Loading dependency graph, done.`
5. In a separate terminal window, but still in the project directory, run `react-native run-ios` or `react-native run-android`.

