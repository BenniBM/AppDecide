import { Question } from "../types";

export const questions: Question[] = [
    {
        id: "nativeFeatureUsage",
        text: "Do you need to use device-specific features such as contacts, NFC, Bluetooth, or SMS?",
        explanation:
            "If your app requires integration with native device features, you may need to choose a native or cross-platform approach (assuming suitable plugins exist). If not, all development methods remain viable.",
        options: [
            {
                text: "Yes, these features are required",
                scores: { native: 8, crossPlatform: 6, webApp: 1 },
                reasoning:
                    "Native development offers the best support for device-specific features, and many cross-platform solutions provide plugins to bridge the gap.",
            },
            {
                text: "No, these features are not required",
                scores: { native: 2, crossPlatform: 5, webApp: 8 },
                reasoning: "Without the need for specialized hardware access, web apps become a cost-effective and flexible option.",
            },
        ],
    },
    {
        id: "prototypeApproach",
        text: "Do you want to build a quick prototype first, or start developing the final application immediately?",
        explanation:
            "Developing a web-based prototype can be faster and more cost-effective for validating your idea, while starting with native development provides deeper integration with device features but takes more time.",
        options: [
            {
                text: "Build a web prototype for rapid validation",
                scores: { native: 2, crossPlatform: 4, webApp: 8 },
                reasoning: "Web technologies allow for rapid iteration and lower initial costs, making them ideal for early prototyping.",
            },
            {
                text: "Develop the full native application from the start",
                scores: { native: 8, crossPlatform: 5, webApp: 1 },
                reasoning:
                    "A native approach ensures optimal performance and integration with device-specific features, albeit at a higher development cost and longer timeline.",
            },
        ],
    },
    {
        id: "appType",
        text: "What type of app are you planning to create?",
        explanation:
            "Different app types have unique requirements. Social media, banking, and finance apps often need native-level performance and security. For e-commerce or information-based apps, a mobile website might be sufficient.",
        options: [
            {
                text: "Social Media, Banking, Finance, or Magazines",
                scores: { native: 8, crossPlatform: 6, webApp: 2 },
                reasoning: "Apps that demand rich interactions, high security, and performance are usually best developed natively.",
            },
            {
                text: "E-Commerce",
                scores: { native: 4, crossPlatform: 5, webApp: 7 },
                reasoning:
                    "Mobile websites can be an efficient and cost-effective option for e-commerce, offering broad reach with lower development complexity.",
            },
            {
                text: "Information-based apps (e.g., weather, news)",
                scores: { native: 2, crossPlatform: 4, webApp: 8 },
                reasoning:
                    "For apps focused on delivering information, a web app often meets requirements without the overhead of native development.",
            },
        ],
    },
    {
        id: "usageFrequency",
        text: "How frequently do you expect users to use your app?",
        explanation:
            "The expected usage frequency impacts the required performance and responsiveness. Apps used daily may benefit from the efficiency of native solutions, while those used less frequently can opt for more flexible development approaches.",
        options: [
            {
                text: "Daily",
                scores: { native: 8, crossPlatform: 6, webApp: 3 },
                reasoning: "Apps used daily demand high performance and quick responsiveness, favoring native development.",
            },
            {
                text: "Weekly",
                scores: { native: 5, crossPlatform: 5, webApp: 5 },
                reasoning: "For moderate usage, a balanced approach using any of the methods can be considered.",
            },
            {
                text: "Monthly or less",
                scores: { native: 2, crossPlatform: 4, webApp: 8 },
                reasoning: "For infrequent use, the benefits of native development are less critical, making web apps a more economical option.",
            },
        ],
    },
    {
        id: "budget",
        text: "What is your budget for app development?",
        explanation:
            "Your budget is a key factor in choosing the development approach. Native apps typically require a higher investment compared to cross-platform or web solutions.",
        options: [
            {
                text: "€5,000 - €15,000",
                scores: { native: 2, crossPlatform: 5, webApp: 8 },
                reasoning: "A limited budget favors web applications or cross-platform solutions, which can be more cost-effective.",
            },
            {
                text: "€50,000 - €100,000",
                scores: { native: 5, crossPlatform: 6, webApp: 4 },
                reasoning:
                    "A moderate budget allows flexibility, enabling you to choose between native and cross-platform solutions depending on your app's requirements.",
            },
            {
                text: "€200,000 or more",
                scores: { native: 8, crossPlatform: 7, webApp: 3 },
                reasoning: "With a higher budget, investing in a fully native application can deliver the best performance and user experience.",
            },
        ],
    },
];
