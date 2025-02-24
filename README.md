# EmployeeTracker

## 🚀 Overview

EmployeeTracker is a React Native application designed to track tasks, shifts, and pending requests efficiently. It provides a user-friendly interface with visual representations using charts and real-time updates. This HRMS-style mobile application is built to manage employee profiles, assigned shifts, and attendance summaries.

## 📱 App Workflow Demonstration

Check out our application workflow video:

[**Watch App Demonstration Video**](https://github.com/user-attachments/assets/94620c35-0891-496f-b9aa-b4de34d026a5)

## 🌟 Features

- 📊 **Pie Chart Visualization**: Displays data insights for quick understanding.
- 🔔 **Pending Requests**: Easily view and manage pending tasks.
- 📅 **Shift Management**: Track and organize shifts efficiently.
- 🔐 **Context API**: Manages global state across components.
- 🌐 **Cross-Platform**: Works seamlessly on both Android and iOS.
- ⏳ **Custom Loader**: A smooth, customized loader for enhanced user experience while loading data.

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/EmployeeTracker.git
cd EmployeeTracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npx expo start  
```

### 4. Run on specific platforms

To run the app on Android, iOS, or the web:

```bash
# ios
npm run ios
#android
npm run android
#web
npm run web

```

## 📁 Project Structure

```
EmployeeTracker/
│
├── .expo/                  # Expo project configuration
├── assets/                 # App icons, images, and splash screens
├── node_modules/           # Installed dependencies
├── Src/                    # Main source code
│   ├── Components/         # Reusable components
│   │   ├── Header.jsx      # App header
│   │   ├── main.jsx        # Main dashboard
│   │   ├── PendingRequests.jsx # Pending tasks
│   │   ├── Piechart.jsx    # Data visualization
│   │   ├── Shifts.jsx      # Shift management
│   │   └── Loader.jsx      # Custom Loader Component
│   ├── Data/               # Static or mock data (if any)
│   ├── Screens/            # App screens/pages
│   └── Context.jsx         # Global state management
│
├── App.js                  # Entry point of the app
├── app.json                # Expo configuration
├── eas.json                # Expo Application Services config
├── index.js                # App initialization
├── package.json            # Project dependencies
├── package-lock.json       # Dependency lock file
└── README.md               # Project documentation
```

## 📱 Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/fa094353-f850-4a80-ab52-9a57f89a7d0b" width="200" alt="Login Screen"/>
  <img src="https://github.com/user-attachments/assets/48ed83f1-87a7-4df7-9db0-729f65ad377b" width="200" alt="Dashboard"/>
  <img src="https://github.com/user-attachments/assets/656877b4-d751-4f17-961c-acef0d847074" width="200" alt="Pie Chart"/>
  <img src="https://github.com/user-attachments/assets/e970a485-9de9-4045-a63c-72e2ff873e85" width="200" alt="Pending Requests"/>
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/a594e993-fc0a-45d7-acb6-e4c4fbcc9753" width="200" alt="Shifts View"/>
  <img src="https://github.com/user-attachments/assets/a6f05cdc-761b-4e0a-9c4b-cb844d025568" width="200" alt="Calendar View"/>
  <img src="https://github.com/user-attachments/assets/ba60b8fd-76af-4cfb-a125-9a83798a6c09" width="200" alt="Profile Screen"/>
  <img src="https://github.com/user-attachments/assets/916cc3a5-5bc1-4b94-b1db-096792b45360" width="200" alt="Settings"/>
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/43ef794f-acca-4280-9dce-ab093f440312" width="200" alt="Notification Screen"/>
  <img src="https://github.com/user-attachments/assets/0eca7afd-c937-4206-b4ab-ea67929b21a5" width="200" alt="Reports Screen"/>
  <img src="https://github.com/user-attachments/assets/4b1a7e43-4e22-4ee5-8401-649623418f66" width="200" alt="Android Screenshot"/>
</div>

## 🛠️ Technical Stack

- **Framework**: React Native with Expo
- **State Management**: React Context API
- **Data Visualization**: React Native Chart Kit
- **Navigation**: React Navigation
- **UI Components**: Custom components and React Native Paper

## 🔄 Usage
 
1. **Dashboard**: View a summary of your shifts, pending requests, and tasks
2. **Shifts**: Check your upcoming shifts and work schedule
3. **Pending Requests**: Manage and respond to pending tasks and approvals
4. **Profile**: View and update your employee profile information

