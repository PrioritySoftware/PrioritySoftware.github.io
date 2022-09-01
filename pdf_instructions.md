
# PDF Instructions

Run the dev server with the following command:

```
jekyll serve --config .\_pdf_config.yaml --destination ../pdf_site
```

Then generate the PDF using Prince:

```
C:\"Program Files (x86)"\Prince\engine\bin\prince.exe --input-list=../pdf_site/prince-list.txt -o ../pdf_site/output.pdf
```

