from io import BytesIO
from pdfminer.high_level import extract_text

def pdf_to_text(file_bytes: bytes) -> str:
    """
    Convert a PDF (as bytes) to plain text string.
    """
    with BytesIO(file_bytes) as buf:
        text: str = extract_text(buf)
    # optional cleanup
    return " ".join(text.split())
