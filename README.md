# MetroDoc AI 🚇

AI-powered document intelligence dashboard for metro operations.

## MVP

- Upload PDF documents
- Extract document metadata
- Generate an executive summary
- Identify key findings and issues
- Classify issue priority
- Extract action items
- Show operational statistics
- Search/filter analyzed documents

## Stack

- Frontend: React + Vite
- Styling: CSS
- Backend: FastAPI + PyMuPDF
- AI: pluggable analysis service with a demo fallback

## Run locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The frontend is configured to use `http://localhost:8000` for the API.

## Demo

The current MVP includes a realistic demo mode so the interface can be demonstrated without a confidential Metro document or an external AI key. Real PDF extraction is handled by the FastAPI backend.

## Hackathon note

Use synthetic/sample operational documents for demonstrations. Do not upload confidential or sensitive railway/metro records unless the deployment environment is approved for them.
