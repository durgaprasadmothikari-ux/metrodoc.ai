from pathlib import Path
import fitz
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='MetroDoc AI API', version='0.1.0')
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])

UPLOAD_DIR = Path('uploads')
UPLOAD_DIR.mkdir(exist_ok=True)

@app.get('/health')
def health():
    return {'status': 'ok', 'service': 'MetroDoc AI'}

@app.post('/api/analyze')
async def analyze_pdf(file: UploadFile = File(...)):
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail='Only PDF files are supported in the MVP.')
    data = await file.read()
    if len(data) > 25 * 1024 * 1024:
        raise HTTPException(status_code=413, detail='PDF must be smaller than 25 MB.')
    try:
        document = fitz.open(stream=data, filetype='pdf')
        text = '\n'.join(page.get_text() for page in document)
        pages = len(document)
        document.close()
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f'Could not read PDF: {exc}')

    # Demo analysis. Replace this function with an approved LLM provider
    # once an API key and production prompt/schema are configured.
    word_count = len(text.split())
    return {
        'filename': file.filename,
        'pages': pages,
        'characters_extracted': len(text),
        'word_count': word_count,
        'summary': 'Document text was extracted successfully. Connect the AI analysis service to generate the production summary.',
        'priority': 'Medium',
        'key_findings': [],
        'action_items': [],
    }
