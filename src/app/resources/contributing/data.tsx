import React from 'react';
import {
  GitBranch,
  FilePlus,
  FileCode,
  Check,
  GitPullRequest,
} from 'lucide-react';

export interface ContributionStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  code?: string;
  language?: string;
}

export const contributionSteps: ContributionStep[] = [
  {
    title: 'Fork the repository',
    description: 'Start by forking the repository to your own GitHub account.',
    icon: <GitBranch className="h-6 w-6" />,
  },
  {
    title: 'Clone the repository',
    description: 'Clone your forked repository to your local machine.',
    icon: <FilePlus className="h-6 w-6" />,
    code: 'git clone https://github.com/YOUR_USERNAME/algopit.git\ncd algopit',
    language: 'bash',
  },
  {
    title: 'Create a branch',
    description: 'Create a new branch for your feature or bug fix.',
    icon: <GitBranch className="h-6 w-6" />,
    code: 'git checkout -b feature/your-feature-name\n# or\ngit checkout -b fix/your-bug-fix',
    language: 'bash',
  },
  {
    title: 'Install dependencies',
    description: 'Install the project dependencies.',
    icon: <FileCode className="h-6 w-6" />,
    code: 'npm install\n# or\nyarn install\n# or\npnpm install',
    language: 'bash',
  },
  {
    title: 'Make your changes',
    description:
      'Implement your feature or fix the bug. Make sure to follow the code style and add tests if applicable.',
    icon: <FileCode className="h-6 w-6" />,
  },
  {
    title: 'Test your changes',
    description:
      "Run tests to ensure your changes don't break existing functionality.",
    icon: <Check className="h-6 w-6" />,
    code: 'npm run test\n# or\nyarn test',
    language: 'bash',
  },
  {
    title: 'Commit your changes',
    description: 'Commit your changes with a descriptive commit message.',
    icon: <Check className="h-6 w-6" />,
    code: 'git add .\ngit commit -m "feat: add your feature description"\n# or\ngit commit -m "fix: resolve issue #123"',
    language: 'bash',
  },
  {
    title: 'Push to the branch',
    description: 'Push your branch to your forked repository.',
    icon: <GitPullRequest className="h-6 w-6" />,
    code: 'git push origin feature/your-feature-name',
    language: 'bash',
  },
  {
    title: 'Create a Pull Request',
    description:
      'Go to the original repository and create a pull request from your branch.',
    icon: <GitPullRequest className="h-6 w-6" />,
  },
];
