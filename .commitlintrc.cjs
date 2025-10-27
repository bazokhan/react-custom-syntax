// See example of use here :: https://www.conventionalcommits.org/en/v1.0.0/#examples
// To mark a BREAKING CHANGE check :: https://www.conventionalcommits.org/en/v1.0.0/#commit-message-with-both--and-breaking-change-footer
// chore!: drop support for Node 6
// BREAKING CHANGE: use JavaScript features not available in Node 6.

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Add custom rules here (optional)
    'header-max-length': [2, 'always', 150], // Set max length for the commit header
    'type-enum': [
      2, // Severity level: 2 (error), 1 (warning), 0 (disabled)
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (e.g., formatting)
        'refactor', // Code refactoring
        'test', // Adding or updating tests
        'chore', // Maintenance tasks (e.g., dependency updates)
        'ci', // CI/CD changes
        'revert', // Reverting a previous commit
        'perf', // Performance improvements
        'build', // Build system changes
        // Support explicit breaking-change type in header (some projects use this)
        'breaking',
        'BREAKING CHANGE'
      ]
    ],
    // Allow BREAKING CHANGE in footer without requiring a leading blank line
    // and relax type-case so headers like "BREAKING CHANGE: ..." are accepted.
    'footer-leading-blank': [0],
    'type-case': [0]
  }
}
