import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'performance',
    text: 'How critical is high-performance and native-like behavior for your app?',
    explanation: 'Performance requirements significantly influence the choice between native and other development approaches. Native development provides the best performance but comes with higher development costs.',
    options: [
      {
        text: 'Extremely critical - needs maximum performance',
        scores: { native: 8, crossPlatform: 3, webApp: 1 },
        reasoning: 'Native development provides the best performance and access to hardware optimizations'
      },
      {
        text: 'Moderately important - good performance is needed',
        scores: { native: 5, crossPlatform: 5, webApp: 3 },
        reasoning: 'Both native and cross-platform solutions can provide good performance for most use cases'
      },
      {
        text: 'Not critical - standard performance is fine',
        scores: { native: 2, crossPlatform: 5, webApp: 5 },
        reasoning: 'Web and cross-platform solutions are suitable when standard performance meets requirements'
      }
    ]
  },
  {
    id: 'platform',
    text: 'Which platforms do you need to support?',
    explanation: 'The target platforms affect development costs and maintenance overhead. Cross-platform solutions can reduce development time for multi-platform apps.',
    options: [
      {
        text: 'iOS only',
        scores: { native: 8, crossPlatform: 3, webApp: 3 },
        reasoning: 'Single platform focus makes native development more cost-effective'
      },
      {
        text: 'Android only',
        scores: { native: 8, crossPlatform: 3, webApp: 3 },
        reasoning: 'Single platform focus makes native development more cost-effective'
      },
      {
        text: 'Both iOS and Android',
        scores: { native: 3, crossPlatform: 8, webApp: 5 },
        reasoning: 'Cross-platform solutions reduce development time and cost for multiple platforms'
      }
    ]
  }
];