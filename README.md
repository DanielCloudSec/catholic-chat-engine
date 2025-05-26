A full-stack application that provides accurate answers to questions about Catholic doctrine, theology, and traditions using authoritative sources.

## Overview

This application uses vector embeddings to search through Catholic texts (Bible, Catechism, Church documents) and retrieve relevant passages to answer user questions. The system ensures that all responses are based solely on authoritative Catholic sources, with no AI-generated theology.

## Features

- **Semantic Search**: Find relevant passages based on meaning, not just keywords
- **Source Prioritization**: Prioritize Bible and Catechism references
- **Citation Support**: All answers include proper citations
- **Document Ingestion**: Upload and index new Catholic texts
- **Source Filtering**: Filter results by source type

## Tech Stack

### Backend
- Python 3.10+
- Flask
- Sentence Transformers (for embeddings)
- FAISS (for vector search)

### Frontend
- Next.js
- React
- Tailwind CSS

## Repository Structure
/
├── backend/ # Flask backend
│ ├── app/ # Application code
│ │ ├── app.py # Main Flask application
│ │ ├── embedder.py # Text embedding
│ │ ├── vector_store.py # FAISS vector store
│ │ ├── retriever.py # Retrieval engine
│ │ ├── response_builder.py # Response formatting
│ │ └── ingest.py # Document ingestion
│ ├── data/ # Data storage
│ └── requirements.txt # Python dependencies
├── frontend/ # Next.js frontend
├── docs/ # Documentation
├── scripts/ # Utility scripts
└── deployment/ # Deployment configurations


## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm or pnpm

### Backend Setup
