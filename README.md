# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## **Mobile & App Guides 📱** --- `niche for blog`

## 🔹 **General Mobile Tips**

1. How to check storage on Android and iPhone
2. How to speed up a slow Android phone
3. How to save battery life on Android
4. How to record your screen on iPhone and Android
5. How to transfer contacts from old phone to new phone
6. How to reset an Android phone without losing data
7. How to backup your mobile photos to Google Drive
8. How to block unknown numbers on Android and iPhone
9. How to recover deleted photos from your phone
10. How to connect your phone to your TV

---

## 🔹 **WhatsApp Guides**

11. How to use WhatsApp Web on PC
12. How to hide last seen on WhatsApp
13. How to send disappearing messages on WhatsApp
14. How to backup and restore WhatsApp chats
15. How to use two WhatsApp accounts on one phone
16. How to hide WhatsApp chats without deleting
17. How to transfer WhatsApp from Android to iPhone
18. How to create a WhatsApp broadcast list
19. How to send high-quality photos on WhatsApp
20. How to lock WhatsApp with fingerprint or Face ID

---

## 🔹 **Social Media App Guides**

21. How to download Instagram Reels without apps
22. How to recover a hacked Facebook account
23. How to hide your active status on Messenger
24. How to schedule posts on Instagram for free
25. How to save TikTok videos without watermark
26. How to download YouTube videos on mobile
27. How to delete your Snapchat account permanently
28. How to create polls on Instagram stories
29. How to secure your Twitter/X account from hackers
30. How to go live on TikTok (step by step)

---

## 🔹 **Google & Android App Guides**

31. How to use Google Lens to identify objects
32. How to enable dark mode in Google Chrome mobile
33. How to recover deleted Gmail emails
34. How to use Google Maps offline
35. How to track a lost Android phone with Google Find My Device
36. How to scan QR codes with your phone camera
37. How to use Google Photos to free up space
38. How to sync contacts with Google account
39. How to create multiple Google accounts on one phone
40. How to manage app permissions on Android

---

## 🔹 **iPhone App & iOS Tips**

41. How to take a screenshot on iPhone
42. How to enable screen recording on iPhone
43. How to use AirDrop on iPhone
44. How to free up space on iPhone without deleting apps
45. How to recover deleted text messages on iPhone
46. How to set custom ringtones on iPhone
47. How to use iCloud to backup your iPhone
48. How to enable parental controls on iPhone
49. How to check battery health on iPhone
50. How to transfer files from iPhone to PC without iTunes

---
