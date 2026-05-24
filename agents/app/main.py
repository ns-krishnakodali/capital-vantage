from fastapi import FastAPI

app = FastAPI(title="Capital Vantage Agents")


@app.get("/health")
def health_check():
    return {"status": "ok"}
