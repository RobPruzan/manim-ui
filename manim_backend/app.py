import os
import tempfile
from flask import Flask, jsonify, send_file
from flask_cors import CORS
from manim import *
from pathlib import Path


class CreateCircle(Scene):
    def construct(self):
        circle = Circle()  # create a circle
        circle.set_fill(PINK, opacity=0.5)  # set the color and transparency
        self.play(Create(circle))  # show the circle on screen


app = Flask(__name__)
CORS(app)


@app.route("/")
def hello():
    return jsonify(message="Hello, World!")


@app.route("/manim")
def manim():
    with tempfile.TemporaryDirectory() as tmpdirname:
        config.media_dir = tmpdirname
        config.video_output_dir = os.path.join(tmpdirname, "videos")
        # os.makedirs(config.video_output_dir, exist_ok=True)

        # config.output_file = os.path.join(config.video_output_dir, "circle.mp4")

        scene = CreateCircle()
        scene.render()
        video_path = Path(config.output_file)

        return send_file(
            str(video_path),
            mimetype="video/mp4",
            as_attachment=True,
            attachment_filename="circle.mp4",
        )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
