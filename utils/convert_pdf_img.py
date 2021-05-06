import sys
import os
from PIL import Image, ImageOps
from pdf2image import convert_from_path
from pathlib import Path

def get_project_root() -> Path:
    return Path(__file__).parent.parent

proj_path = get_project_root()


def convert_pdf_to_img(uploaded_pdf_file):

    uploaded_docs_file = Path(f'{proj_path}/static/documents/' + uploaded_pdf_file + '/' + uploaded_pdf_file)
    uploaded_docs_dir = Path(f'{proj_path}/static/documents/' + uploaded_pdf_file)
    
    pages = convert_from_path(uploaded_docs_file, 500)
    i = 1
    for page in pages:
        page.save(uploaded_docs_dir / f'out{i}.png', 'PNG')
        i += 1


convert_pdf_to_img(sys.argv[1])
