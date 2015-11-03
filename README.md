# ![Package Logo](https://docs.google.com/uc?id=0B1BeRPYxbA_SVFdqSXd4N3ZNVXM&export=download) FAQ Listing Editor for Umbraco
The FAQ Listing Editor creates a custom property editor that can be added to the Umbraco back office for a quick FAQ page.

![FAQ Listing Screenshot](https://223c6de8440b7dbb1ad7e481860123a98f21c596.googledrive.com/host/0B1BeRPYxbA_Scjhzc0U2djZiajg/faq-listing-screenshot.png)

## Download for Umbraco

Install the selected release through the Umbraco package installer or download and install locally from Our.

After installing the package, create a new DataType and select "FAQ Listing" from the property editor dropdown, then add it to a DocType of your choice.

Want help with the code for the front of the site? [View the gist here](https://gist.github.com/naepalm/2ce4f7314658879cda16).

## Contribute

Want to contribute to the FAQ Listing Editor? You'll want to use Grunt (our task runner) to help you integrate with a local copy of Umbraco.

### Install Dependencies
*Requires Node.js to be installed and in your system path*

    npm install -g grunt-cli && npm install -g grunt
    npm install

### Build
    grunt

Builds the project to /dist/. These files can be dropped into an Umbraco 7 site, or you can build directly to a site using:

    grunt --target="D:\inetpub\mysite"

You can also watch for changes using:

    grunt watch
    grunt watch --target="D:\inetpub\mysite"
