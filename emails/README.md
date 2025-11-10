# Emails

This folder contains the email templates for the project, built with React Email.

## Preview
While working on the templates you can use react email previer at `http://localhost:3200`

## Building for backend

To use the templates in the backend, you need to compile them from TypeScript (because node can not run jsx files) to JavaScript:
```shell
make shell service=emails
$emails: npm run build

```
- This produces the bin/ folder with compiled ES modules (.js) and TypeScript typings (.d.ts).
- The backend can then import the emails as a package.
