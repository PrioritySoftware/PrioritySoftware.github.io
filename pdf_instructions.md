
# PDF Instructions

PDF generation uses Prince PDF.

1. Update the date in resources/layouts/sdk_pdf.html

2. Run the dev server with the following command:

```
jekyll serve --config .\_pdf_config.yaml --destination ../pdf_site
```

3. Then generate the PDF using Prince from the pdf_site folder:

```
C:\"Program Files"\Prince\engine\bin\prince.exe -s .\resources\assets\css\pdfPrintStyle.css -j --input-list=./prince-list.txt -o ./PrioritySDK.pdf
```

4. Review the file, particularly recent edits. If the file is ok, replace the existing file in \\ceshbel\Docs network directory.

# REST Instructions

Follow steps 1-2 above.

Use the following prince command to generate the PDF:
```
 C:\"Program Files"\Prince\engine\bin\prince.exe -s .\resources\assets\css\pdfPrintStyle.css -j --input-list=./restPrince.txt -o ./PriorityRESTAPI.pdf
 ```