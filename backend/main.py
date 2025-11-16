from fastapi import FastAPI
from routers.dashboard import router as dashboard_router
from routers.question import router as question_router
from routers.requirements import router as requirements_router
from routers.faq import router as faq_router

app = FastAPI()

app.include_router(dashboard_router)
app.include_router(question_router)
app.include_router(requirements_router)
app.include_router(faq_router)