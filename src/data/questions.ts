import { Question } from "../types";

export const questions: Question[] = [
    {
        id: "nativeFeatureUsage",
        text: "Do you need to use the following device-specific features: Access Contacts, NFC, Bluetooth, or SMS?",
        explanation:
            "If your app requires integration with native device features, you may need to choose a native or cross-platform approach (assuming suitable plugins exist for cross-platform). If not, all development methods remain viable.",
        options: [
            {
                text: "Yes, these features are required",
                scores: { native: 8, crossPlatform: 3, webApp: 0 },
            },
            {
                text: "No, these features are not required",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
            {
                text: "I don't know",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
        ],
        sources: [
            { name: "What Web can do today", url: "https://whatwebcando.today/" },
            { name: "Flutter Plugins", url: "https://pub.dev" },
            { name: "React-Native Plugins", url: "https://reactnative.directory/" },
        ],
    },
    {
        id: "prototypeApproach",
        text: "Do you want to build a quick prototype first, or start developing the final application immediately?",
        explanation:
            "Developing a web-based or cross-platform prototype can be faster and more cost-effective for validating your idea, while starting with native development takes more time.",
        options: [
            {
                text: "Build a prototype for rapid validation",
                scores: { native: 1, crossPlatform: 5, webApp: 8 },
            },
            {
                text: "Develop the full application from the start",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
            {
                text: "I don't know",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
        ],
        // Schnelligkeit belegen mit der Bachelorarbeit? Cost-Effectiveness geht auf jedenfall
        sources: [{ name: "What Web Can Do Today", url: "https://whatwebcando.today/" }],
    },
    {
        id: "appType",
        text: "What type of app are you planning to create?",
        explanation:
            "Different app types have unique requirements. Social media or adjacent Apps are often build with cross-platform solutions because of the need of availability on multiple plattforms. Banking and finance apps often need native-level performance and security. For e-commerce or information-based apps, a mobile website might be sufficient.",
        options: [
            {
                text: "Social Media",
                scores: { native: 5, crossPlatform: 8, webApp: 3 },
            },
            {
                text: "Banking or Finance",
                scores: { native: 8, crossPlatform: 6, webApp: 2 },
            },
            {
                text: "E-Commerce",
                scores: { native: 3, crossPlatform: 5, webApp: 8 },
            },
            {
                text: "Newsletter or Information-based",
                scores: { native: 1, crossPlatform: 3, webApp: 8 },
                // native apps have the hurdle of needing to be installed so they are only used for apps that are used very frequently
            },
            {
                text: "I don't know",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
        ],
        sources: [{ name: "Thesis Page 18-19", url: "Bachelor_Arbeit.pdf#page=18" }],
    },
    {
        id: "usageFrequency",
        text: "How frequently do you expect users to use your app?",
        explanation:
            "The expected usage frequency impacts the required performance and responsiveness. Apps used daily may benefit from the efficiency of native solutions, while those used less frequently can opt for more flexible development approaches.",
        options: [
            {
                text: "Daily",
                scores: { native: 8, crossPlatform: 5, webApp: 3 },
            },
            {
                text: "Weekly",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
            {
                text: "Monthly or less",
                scores: { native: 1, crossPlatform: 3, webApp: 8 },
            },
            {
                text: "I don't know",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
        ],
        sources: [{ name: "What Web Can Do Today", url: "https://whatwebcando.today/" }],
    },
    {
        id: "budget",
        text: "What is your budget for app development?",
        explanation:
            "Your budget is a key factor in choosing the development approach. Native apps typically require a higher investment compared to cross-platform or web solutions.",
        options: [
            {
                text: "€5,000 - €50,000",
                scores: { native: 1, crossPlatform: 5, webApp: 8 },
            },
            {
                text: "€50,000 - €100,000",
                scores: { native: 3, crossPlatform: 8, webApp: 5 },
            },
            {
                text: "€100,000 or more",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
            {
                text: "I don't know",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
        ],
        sources: [
            { name: "Cost Comparison and Case Studys", url: "https://feedbax.ai/industry-trends/native-app-vs-cross-plattform-app-vs-pwa#header-19" },
            { name: "Thesis Page 24-25", url: "Bachelor_Arbeit.pdf#page=24" },
        ],
    },
];
