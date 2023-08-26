# Setup Oura

This action sets up an Oura environment for use in a GitHub Actions workflow.

## Inputs

### `version`

**Required** The version of Oura to install.

## Outputs

### `version`

The version of Oura that was installed.

## Example usage

```yaml
uses: WesleyBatista/setup-oura@v1.0.0
with:
  version: v1.8.3
run: oura --version
```
