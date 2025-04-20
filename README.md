# 🚀 Fortura 💸

Fortura is your smart, AI-powered companion for mastering personal finance. Track expenses effortlessly, visualize your spending habits with insightful charts, and receive personalized recommendations powered by Gemini AI to help you achieve your financial goals. Built with the speed and flexibility of **React Native**, Fortura offers a seamless mobile experience secured by Firebase Authentication.

---

## ⬇️ Download APK

You can download the latest Android APK directly from the following link:

-   [bit.ly/fortura-apk](bit.ly/fortura-apk)

---

## ✨ Features

-   🔐 **Secure Authentication:** Sign in easily and securely with Firebase Phone OTP.
-   📊 **Smart Budgeting:** Set and track monthly budgets across different categories.
-   📉 **Visual Insights:** Understand where your money goes with clear bar charts and category breakdowns.
-   🧠 **AI-Powered Recommendations:** Get personalized financial tips and insights based on your spending data, powered by Google's Gemini API.
-   💾 **Persistent Data:** Your financial information is securely stored locally using AsyncStorage.
-   📱 **Intuitive Mobile UI:** A clean and user-friendly interface designed specifically for mobile devices.

---

## 💻 Tech Stack

-   **Frontend**: React Native CLI, JavaScript
-   **Authentication**: Firebase (Phone OTP)
-   **Storage**: AsyncStorage
-   **AI API**: Gemini by Google
-   **Version Control**: Git + GitHub

---

## ⚙️ Installation and Setup

Follow these steps to get Fortura up and running on your local machine for development.

### Prerequisites

-   [Node.js](https://nodejs.org/) installed (latest LTS recommended)
-   React Native CLI installed globally (`npm install -g react-native-cli`)
-   [Android Studio](https://developer.android.com/studio) (for Android Emulator/Device setup) or [Xcode](https://developer.apple.com/xcode/) (for iOS Simulator/Device setup on macOS)
-   A Firebase project with Phone Authentication enabled and configured for your app (add your `google-services.json` for Android or `GoogleService-Info.plist` for iOS).
-   A Google Cloud Project with access to the Gemini API (configure your API key in the app).

### Steps to Clone and Run the Project

1.  **Clone a specific branch of the repository:**

    ```sh
    git clone --single-branch --branch RNCfortura [https://github.com/pratyush090506/fortura_ver1.git](https://github.com/pratyush090506/fortura_ver1.git) Newfortura
    cd Newfortura
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Set up Firebase:**
    * Add your `google-services.json` file to the `android/app` directory.
    * Add your `GoogleService-Info.plist` file to the `ios/<YourAppName>` directory and ensure it's added to your Xcode project.

4.  **Configure Gemini API:**
    * Add your Gemini API key to the appropriate place in the code (e.g., a `.env` file or a config constant, make sure not to commit keys directly).

5.  **Start Metro bundler:**

    ```sh
    npx react-native start
    ```
    Keep this terminal running.

6.  **Run the app on an emulator or device:**

    * **For Android:**
        ```sh
        npx react-native run-android
        ```
        Ensure that an emulator is running, or a device is connected with USB debugging enabled.
    * **For iOS (Mac only):**
        ```sh
        npx react-native run-ios
        ```
        Ensure Xcode is installed and configured, and you have installed CocoaPods if needed (`cd ios && pod install`).

### Troubleshooting

-   If the app does not start or you encounter environment issues, run the React Native doctor:
    ```sh
    npx react-native doctor
    ```
-   If there are dependency issues or caching problems, try cleaning the cache and rebuilding:
    ```sh
    npm start -- --reset-cache
    # Then re-run the platform-specific command (npx react-native run-android or npx react-native run-ios)
    ```
-   Ensure your Firebase project is correctly set up for the specific platform (SHA-1 fingerprints for Android, Bundle Identifier for iOS).

---

## 📸 App Screenshots

- Take a visual tour of the Fortura app:

| **Login** | **Overview** | **Profile** |
| --- | --- | --- |
| <img src="https://github.com/user-attachments/assets/4651f6a0-e5db-4fe7-a864-06d21aa3fde0" width="200" style="margin-right: 10px; margin-bottom: 10px;" /> | <img src="https://github.com/user-attachments/assets/f00014c3-03bf-4969-a792-237166b44268" width="200" style="margin-right: 10px; margin-bottom: 10px;" /> | <img src="https://github.com/user-attachments/assets/7b7aa580-de0a-4563-b902-7fc13715801d" width="200" style="margin-right: 10px; margin-bottom: 10px;" /> |

| **AI Assistant** | **Investment Opportunity** | **Budget** |
| --- | --- | --- |
| <img src="https://github.com/user-attachments/assets/e29bfd25-40cd-4fc2-a86f-ff1177ccbcaf" width="200" style="margin-right: 10px; margin-bottom: 10px;" /> | <img src="https://github.com/user-attachments/assets/9cdd23de-198b-49e6-bad3-9523fb72ebc8" width="200" style="margin-right: 10px; margin-bottom: 10px;" /> | <img src="https://github.com/user-attachments/assets/afb6f74b-e7cc-4f18-a065-aa21c38f87ea" width="200" style="margin-right: 10px; margin-bottom: 10px;" /> |

| **Insights** |
| --- |
| <img src="https://github.com/user-attachments/assets/890782fd-a4be-4edc-a977-eba270504fa6" width="200" style="margin-bottom: 10px;" /> |

---

## 🙌 Contributors

A big thanks to the contributors who helped build Fortura:

-   Kartikey - [@Kartikey060105](https://github.com/Kartikey060105)
-   Pratyush Mohanty – [@pratyush090506](https://github.com/pratyush090506)
-   Asmit Banik - [@asmitbanik](https://github.com/asmitbanik)
-   Jasleen Chhabra- [@codejasleen](https://github.com/codejasleen)

---
