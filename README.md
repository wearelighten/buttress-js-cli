
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