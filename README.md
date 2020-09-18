# scree

DIY `og:image` with a simple command-line script.

## Install

```bash
git clone https://github.com/loup-brun/scree.git
cd scree
npm i # install local deps
npm i -g # `scree` will be available globally from the command line
```

## Usage

scree looks for a `.screenshotrc` file in your current directory.

- **`file`** {string} _(default: `screenshot.png`)_: path to the screenshot you want to save.
- **`styleTagUrl`** {string}: _(default: `(empty)`)_: path to a stylesheet you want to inject to your screenshot.
- **`url`** {string} _(default: `http://localhost`)_: HTTP address of the web page to render. Can also be overridden as the first argument for quick use, e.g. `scree http://localhost:1313/my/custom/url`. 
- **`viewport`** {object} _(default: `{ width: 600, height: 315 }`)_: dimensions of the viewport/image to shoot.

## License

[WTFPL](LICENSE)
