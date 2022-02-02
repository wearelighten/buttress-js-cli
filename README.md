
# @buttress/cli

A CLI interface for interacting with a [Buttress JS](https://github.com/wearelighten/buttress-js) instance


## Installation

Install my-project with npm

```bash
  npm install -g @buttress/cli
```
    
## Usage/Examples

```bash
# Connect to an instance
bjs connect https://example.buttressjs.com thisisasrandomtoken bjs

# Add an app
bjs app create --name "Example App" --path example-app

# View saved connection details
bjs list

# Reuse stored connection details
bjs connect 0

# Remove stored connection details
bjs delete 0
```

## Can't connect to Buttress when using self-signed certs?
If your using this locally the chances are that you'll be using self signed certs, you can bypass any cert issues by setting or passsing the env flag property `ALLOW_UNAUTHORIZED` in front of the program.

```bash
ALLOW_UNAUTHORIZED=true bjs list
```