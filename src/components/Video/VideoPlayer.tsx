// import { api } from "y/utils/api";

// const VideoPlayer = () => {
//   const videoQuery = api.video.getDefaultVideo.useQuery();

//   if (videoQuery.isLoading) {
//     return <p>Loading...</p>;
//   }
//   console.log(videoQuery.data);
//   const url = videoQuery.data?.blob().then((data) => URL.createObjectURL(data));

//   return (
//     <>
//       {url &&
//         url.then((newUrl) => {
//           <video
//             className="h-full w-full"
//             controls
//             autoPlay
//             muted
//             loop
//             src={newUrl}
//           />;
//         })}
//     </>
//   );
// };
export const DEFAULT_CODE = `class CreateCircle(Scene):
def construct(self):
  circle = Circle()  # create a circle
  circle.set_fill(PINK, opacity=0.5)  # set the color and transparency
  self.play(Create(circle))  # show the circle on screen

scene = CreateCircle()
scene.render()`;
// export default VideoPlayer;
export const fetchVideo = async (
  code: string,
  onSuccess?: (url: string) => void
) => {
  // try {
  console.log("gah");
  const response = await fetch("http://localhost:8000/manim", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });
  console.log("boo", response);
  // if (!response.ok) {
  //   console.log("fdsf");
  //   await fetchVideo(code + "\n\n" + response.statusText, onSuccess);
  // }
  const blob = await response.blob();

  const url = URL.createObjectURL(blob);
  onSuccess && onSuccess(url);
};

export type VideoPlayerProps = {
  videoURL: string | null;
  isLoading: boolean;
};
const VideoPlayer = ({ videoURL, isLoading }: VideoPlayerProps) => {
  // useEffect(() => {
  //   void fetchVideo(DEFAULT_CODE, setVideoURL);
  // }, []);

  return (
    <div
      className={`${
        isLoading ? "animate-pulse" : ""
      } min-h-[16rem] w-10/12 border-4 border-zinc-800 shadow-lg`}
    >
      {videoURL ? (
        <video controls width="640" height="480">
          <source src={videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="text-center text-3xl font-bold text-white">
          {isLoading ? "Rendering Animation" : "No video to display"}
        </p>
      )}

      {/* {isLoading && (
        // <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        //   Loading...
        // </p>
        // video player skelaton
        <div className="flex animate-pulse flex-col items-center justify-center">
          <div className="h-64 w-64 rounded-lg bg-zinc-800"></div>
          <div className="mt-2 h-4 w-64 rounded-lg bg-zinc-800"></div>
        </div>
      )} */}
    </div>
  );
};

export default VideoPlayer;
