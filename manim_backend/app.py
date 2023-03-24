import os
import tempfile

from flask import Flask, jsonify, send_file, make_response, Response
from flask_cors import CORS
from manim import *
from pathlib import Path

from flask import request


class CreateCircle(Scene):
    def construct(self):
        circle = Circle()  # create a circle
        circle.set_fill(PINK, opacity=0.5)  # set the color and transparency
        self.play(Create(circle))  # show the circle on screen


# class SquareToCircle(Scene):
#   def construct(self):
#     square = Square()
#     circle = Circle()
#     self.play(Create(square))  # show the square on screen
#     self.wait(1)  # wait for a moment

#     self.play(Transform(square, circle))  # transform the square into a circle
#     self.wait(1)  # wait for a moment
# scene = SquareToCircle()
# scene.render()
app = Flask(__name__)
CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [
                "http://localhost:3000",
                "https://northstar.vercel.app",
                "http://127.0.0.1:3000",
            ]
        }
    },
)


@app.route("/")
def hello():
    return jsonify(message="Hello, World!")


@app.route("/manim", methods=["POST"])
def manim():
    print("boop", request)
    # get the code from the request body
    res = request.get_json()
    print("res", res)
    code = res["code"]
    print("code", code)

    with tempfile.TemporaryDirectory() as tmpdirname:
        config.media_dir = tmpdirname
        config.video_output_dir = os.path.join(tmpdirname, "videos")
        os.makedirs(config.video_output_dir, exist_ok=True)

        config.output_file = os.path.join(config.video_output_dir, "circle.mp4")

        # scene = CreateCircle()
        # scene.render()
        video_path = Path(config.output_file)
        file = send_file(
            str(video_path),
            mimetype="video/mp4",
            as_attachment=True,
            attachment_filename="circle.mp4",
        )
        print("THE FILE", file)
        return file


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
