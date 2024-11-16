import os
import pathlib

import google.auth.transport.requests
from flask import (
    Flask,
    abort,
    redirect,
    render_template,
    request,
    session,
)
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow

import config

app = Flask("Google Login App")

# make sure this matches with that's in client_secret.json
app.secret_key = config.toml["secret"]["client_secret"]

# to allow Http traffic for local dev
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

client_secrets_file = os.path.join(
    pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid",
            ],
    redirect_uri="http://localhost:8000/callback"

)


def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function()

    return wrapper


@app.route("/logout")
def logout():
    session.clear()  # This will clear all session data, including the session cookie
    return redirect("/")  # Redirect to the homepage or another route


@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    # Check if state is being generated correctly
    return redirect(authorization_url)


@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)

    credentials = flow.credentials
    token_request = google.auth.transport.requests.Request()

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=config.toml['secret']['client_id']
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")

    return redirect("/protected_area")


@app.route("/")
def index():
    session.clear()
    # Having to clear cookies and browser data just to get auth flow to work.
    # Super not ideal.
    # Need functionality to logout the user from the application here.
    print(session.keys())
    return render_template("index.html")


@app.route("/protected_area")
@login_is_required
def protected_area():
    return render_template("protected.html", **{
        "session_name":
        session['name']
    })


if __name__ == "__main__":
    app.run(port=8000, debug=True)
