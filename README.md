## **** Before working delete all the readme files under src folders **** ##

# Fortura

Fortura is an AI-powered finance management and budgeting app built using React Native and Expo.

## Installation and Setup

Follow these steps to install and run the project:

### Prerequisites
- Node.js installed (latest LTS recommended)
- React Native CLI installed globally (`npm install -g react-native-cli`)
- Android Studio (for Android Emulator) or Xcode (for iOS Simulator)
- Physical device with USB debugging enabled (for Android) or an iOS device with developer mode enabled

### Steps to Clone and Run the Project

1. **Clone a specific branch of the repository:**
   ```sh
   git clone --single-branch --branch RNCfortura https://github.com/pratyush090506/fortura_ver1.git Newfortura
   cd Newfortura
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```


5. **Start Metro bundler:**
   ```sh
   npx react-native start
   ```
   Keep this terminal running.

6. **Run the app on an emulator or device:**
   - **For Android:**
     ```sh
     npx react-native run-android
     ```
     Ensure that an emulator is running, or a device is connected with USB debugging enabled.
   - **For iOS (Mac only):**
     ```sh
     npx react-native run-ios
     ```
     Ensure Xcode and CocoaPods are installed.

7. **Troubleshooting:**
   - If the app does not start, run:
     ```sh
     npx react-native doctor
     ```
   - If there are dependency issues, try cleaning the cache:
     ```sh
     npm start -- --reset-cache
     ```

Now, you can start using Fortura for finance management and budgeting!

