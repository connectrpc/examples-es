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


## Updating dependencies

You can update all dependencies in this project with a single command:

```console
./manage.mjs update
```

Note that this will only update dependencies within their version constraints.
To upgrade all `@connectrpc` and other well-known dependencies to the latest 
available version, use `./manage.mjs forceupdateknown`. 
 
After updating dependencies, make sure to run tests with `./manage.mjs test`.


[fork]: https://github.com/connectrpc/examples-es/fork
[open-issue]: https://github.com/connectrpc/examples-es/issues/new
[cla]: https://cla-assistant.io/connectrpc/examples-es
[commit-message]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
