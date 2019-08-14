import cv2
import numpy as np
from flask import Flask, session, redirect, url_for, escape, request

app = Flask(__name__)


@app.route("/")
def home():
    return "Home called"


@app.route("/detect")
def detect():
    if request.method == 'POST':
        image = request.form['image']  # image to run detection on
        obj = request.form['object']  # object to detect
        # call detection with the image parameter
