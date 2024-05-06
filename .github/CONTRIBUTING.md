# Contributing

We'd love your help making `examples-es` better!

If you'd like to add or update an example, please [open an issue][open-issue]
describing your proposal &mdash; discussing details ahead of time makes
pull request review much smoother. In your issue, pull request, and any other
communications, please remember to treat your fellow contributors with
respect!

Note that you'll need to sign [Buf's Contributor License Agreement][cla]
before we can accept any of your contributions. If necessary, a bot will remind
you to accept the CLA when you open your pull request.

## Setup

[Fork][fork], then clone the repository:

```bash
git clone git@github.com:your_github_username/examples-es.git
cd examples-es
git remote add upstream https://github.com/connectrpc/examples-es.git
git fetch upstream
```

You will need the latest stable LTS version of Node.js installed. To run tests
in all examples in the repository, run `./manage.mjs test`. To learn more about
the script, run `./manage.mjs`.


## Making Changes

Start by creating a new branch for your changes:

```bash
git checkout main
git fetch upstream
git rebase upstream/main
git checkout -b cool_new_feature
```

Make your changes, then ensure that `./manage.mjs test` still passes.
When you're satisfied with your changes, push them to your fork.

```bash
git commit -a
git push origin cool_new_feature
```

Then use the GitHub UI to open a pull request.

At this point, you're waiting on us to review your changes. We *try* to respond
to issues and pull requests within a few business days, and we may suggest some
improvements or alternatives. Once your changes are approved, one of the
project maintainers will merge them.

We're much more likely to approve your changes if you:

- Add tests for new functionality.
- Write a [good commit message][commit-message].
- Maintain backward compatibility.


## Upgrading dependencies

You can upgrade all dependencies in this project with a single command:

```console
./manage.mjs upgrade
```

Dependencies pinned to a version will not be updated. 
Note that this command may print warnings at the end, for example when a major 
upgrade was installed or a dependency was skipped due to being pinned. 
Be sure to keep a look out for these messages in the event something fails during the upgrade.

It is usually necessary to follow the framework's upgrade guide for major releases. For example, frameworks such as
[Angular][angular-guide], [React][react-guide],
[Svelte][svelte-guide], [Remix][remix-guide], and 
[Astro][astro-guide] all have guides for handling upgrades. In addition, React
Native publishes the [React Native Upgrade Helper][react-native-guide]
for managing these upgrades.
 
After updating dependencies, make sure to run all tests and checks with `./manage.mjs ci`.

[angular-guide]: https://update.angular.io/?v=16.0-17.0)
[react-guide]: https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
[svelte-guide]: https://svelte.dev/docs/v4-migration-guide)
[remix-guide]: https://remix.run/docs/en/main/start/v2)
[astro-guide]: https://docs.astro.build/en/guides/upgrade-to/v4/)
[react-native-guide]: https://react-native-community.github.io/upgrade-helper/)
[fork]: https://github.com/connectrpc/examples-es/fork
[open-issue]: https://github.com/connectrpc/examples-es/issues/new
[cla]: https://cla-assistant.io/connectrpc/examples-es
[commit-message]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
