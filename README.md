# Hello world javascript action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `msg-to-Teams`

**Required** Message to Teams. Default `"Hi From GitHub"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

- name: Checkout
  uses: actions/checkout@v2
  - name: Hello world action step
    uses: ./ # Uses an action in the root directory
    id: hello
    with:
    who-to-greet: 'Hi from Github'
    env:
        TEAMS_WEBHOOK: ${{ secrets.TEAMS_WEBHOOK }} # required

#edemo
