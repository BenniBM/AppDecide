import { Question } from "../types";

export const questions: Question[] = [
    // CHECK
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
    // CHECK
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
        sources: [
            { name: "Thesis Page 24-25", url: "Bachelor_Arbeit.pdf#page=30" },
            {
                name: "Build Web App Prototype with AI",
                url: "https://bolt.new/",
            },
        ],
    },
    // CHECK
    {
        id: "appType",
        text: "What type of app are you planning to create?",
        explanation:
            "Different app types have unique requirements. Social media or adjacent Apps are often build with cross-platform solutions because of the need of availability on multiple plattforms. Banking and finance apps often need native-level performance and security. For e-commerce or information-based apps, a mobile website might be sufficient, because they are not used as frequently so the hurdle of installing will be significant.",
        options: [
            {
                text: "Social Media",
                scores: { native: 5, crossPlatform: 8, webApp: 3 },
            },
            {
                text: "Banking or Finance",
                scores: { native: 8, crossPlatform: 5, webApp: 2 },
            },
            {
                text: "E-Commerce",
                scores: { native: 3, crossPlatform: 5, webApp: 8 },
            },
            {
                text: "Newsletter or Information-based",
                scores: { native: 2, crossPlatform: 3, webApp: 8 },
            },
            {
                text: "I don't know",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
        ],
        sources: [{ name: "Thesis Page 18-19", url: "Bachelor_Arbeit.pdf#page=25" }],
    },
    // CHECK
    {
        id: "usageFrequency",
        text: "How frequently do you expect users to use your app?",
        explanation:
            "Apps used daily may benefit from the efficiency of native solutions, while those used less frequently should opt for more flexible development approaches, because the hurdle of installation can be significant.",
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
        sources: [{ name: "Thesis Page 19-20", url: "Bachelor_Arbeit.pdf#page=26" }],
    },
    // CHECK
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
            { name: "Thesis Page 24-25", url: "Bachelor_Arbeit.pdf#page=30" },
        ],
    },
    // CHECK
    {
        id: "teamExpertise",
        text: "What is your development team's existing technical expertise?",
        explanation:
            "Web developers can transition faster to React Native (TypeScript/JavaScript), while Flutter requires a new language Dart which is similiar but still requires learning. Native development demands platform-specific Swift/Kotlin knowledge. With no development experience, web and cross-plattform development is the easiest to learn.",
        options: [
            {
                text: "Web (JavaScript/TypeScript) background",
                scores: { native: 2, crossPlatform: 5, webApp: 8 },
            },
            {
                text: "No prior development experience",
                scores: { native: 3, crossPlatform: 8, webApp: 5 },
            },
            {
                text: "Native mobile development",
                scores: { native: 8, crossPlatform: 5, webApp: 5 },
            },
            {
                text: "I don't know",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
        ],
        sources: [
            {
                name: "Thesis Page 15-16",
                url: "Bachelor_Arbeit.pdf#page=22",
            },
        ],
    },
    // CHECK
    {
        id: "monetizationStrategy",
        text: "What is your primary monetization approach?",
        explanation:
            "Native apps benefit from app store visibility and integrated payments (despite 15-30% fees), while web apps avoid fees but require independent marketing. Advertising works better in native apps due to higher retention rates and no ad-blockers.",
        options: [
            {
                text: "App store subscriptions/in-app purchases",
                scores: { native: 8, crossPlatform: 8, webApp: 5 },
            },
            {
                text: "Advertising-based revenue",
                scores: { native: 8, crossPlatform: 8, webApp: 5 },
            },
            {
                text: "Direct payment (Paid Apps)",
                scores: { native: 5, crossPlatform: 5, webApp: 8 },
            },
            {
                text: "I don't know",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
        ],
        sources: [
            {
                name: "Thesis Page 27-29",
                url: "Bachelor_Arbeit.pdf#page=34",
            },
            {
                name: "Google Service Fees 15-30%",
                url: "https://support.google.com/googleplay/android-developer/answer/112622?sjid=4175626678853687051-EU",
            },
            {
                name: "Apple Service Fees 15-30%",
                url: "https://developer.apple.com/app-store/small-business-program/",
            },
        ],
    },
    // CHECK
    {
        id: "offlineRequirement",
        text: "Does your application need to function offline without an internet connection?",
        explanation:
            "Native and hybrid apps inherently support offline access better through local storage and the fact that they are installed, while web apps require Progressive Web App (PWA) technologies like service workers to achieve comparable functionality.",
        options: [
            {
                text: "Yes, offline functionality is critical",
                scores: { native: 8, crossPlatform: 8, webApp: 3 },
            },
            {
                text: "No, internet connectivity is always assumed",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
            {
                text: "I don't know",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
        ],
        sources: [
            {
                name: "Thesis Page 13",
                url: "Bachelor_Arbeit.pdf#page=20",
            },
        ],
    },
    // CHECK
    {
        id: "updateFrequency",
        text: "How frequently do you anticipate needing to deploy updates?",
        explanation:
            "Web apps allow instant updates for all users, while native and cross-plattform apps may require time-consuming app store approvals.",
        options: [
            {
                text: "Frequent updates (weekly or more often)",
                scores: { native: 1, crossPlatform: 1, webApp: 8 },
            },
            {
                text: "Moderate updates (monthly)",
                scores: { native: 5, crossPlatform: 5, webApp: 8 },
            },
            {
                text: "Rare updates (quarterly or less)",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
            {
                text: "I don't know",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
            },
        ],
        sources: [
            {
                name: "Thesis Page 17",
                url: "Bachelor_Arbeit.pdf#page=24",
            },
        ],
    },
];
