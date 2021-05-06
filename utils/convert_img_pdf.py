import sys
import os
from PIL import Image, ImageOps
from pdf2image import convert_from_path
from pathlib import Path
import time

def get_project_root() -> Path:
    return Path(__file__).parent.parent

proj_path = get_project_root()


docs_fold = Path(f'{proj_path}/static/documents/{sys.argv[1]}/')
approved_pdf_file = f'approved_{sys.argv[1]}'

def convert_imgs_to_pdf():
    time.sleep(2)
    img_list = []

    for img in sorted(docs_fold.glob("*.png")):
        img_list.append(Image.open(img).convert('RGB'))
    
    rev_img_list = img_list[::-1]

    img_list[0].save(docs_fold / approved_pdf_file,save_all=True, append_images=img_list[1:])
    
    print(approved_pdf_file)


convert_imgs_to_pdf()
