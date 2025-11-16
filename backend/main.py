from fastapi import FastAPI
from routers.dashboard import router as dashboard_router
from routers.question import router as question_router
from routers.requirements import router as requirements_router
from routers.faq import router as faq_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(dashboard_router)
app.include_router(question_router)
app.include_router(requirements_router)
app.include_router(faq_router)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)