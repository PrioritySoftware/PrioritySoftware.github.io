
# PDF Instructions

1. Update the date in resources/layouts/sdk_pdf.html

2. Run the dev server with the following command:

```
jekyll serve --config .\_pdf_config.yaml --destination ../pdf_site
```

3. Then generate the PDF using Prince from the pdf_site folder:

```
C:\"Program Files (x86)"\Prince\engine\bin\prince.exe -s .\resources\assets\css\pdfPrintStyle.css -j --input-list=./prince-list.txt -o ./PrioritySDK.pdf
```

